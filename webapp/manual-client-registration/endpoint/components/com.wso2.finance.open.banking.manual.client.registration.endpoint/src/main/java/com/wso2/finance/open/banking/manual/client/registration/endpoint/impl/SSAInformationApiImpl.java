package com.wso2.finance.open.banking.manual.client.registration.endpoint.impl;

import com.wso2.finance.open.banking.common.util.client.registration.Utils;
import com.wso2.finance.open.banking.common.util.client.registration.data.SoftwareStatement;
import com.wso2.finance.open.banking.manual.client.registration.endpoint.MCRApiService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;
import org.wso2.carbon.apimgt.api.APIConsumer;
import org.wso2.carbon.apimgt.api.APIManagementException;
import org.wso2.carbon.apimgt.api.model.API;
import org.wso2.carbon.apimgt.api.model.APIIdentifier;
import org.wso2.carbon.apimgt.api.model.ApiTypeWrapper;
import org.wso2.carbon.apimgt.api.model.Application;
import org.wso2.carbon.apimgt.api.model.Scope;
import org.wso2.carbon.apimgt.impl.APIManagerFactory;
import org.wso2.carbon.apimgt.impl.dao.ApiMgtDAO;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;
import javax.ws.rs.core.Response;

/**
 * Get SSA details for MCR request
 */
public class SSAInformationApiImpl extends MCRApiService {

    private static final Log log = LogFactory.getLog(MCRApiService.class);
    public static final APIManagerFactory API_MANAGER_FACTORY = APIManagerFactory.getInstance();
    private static final String UNLIMITED_TIER = "Unlimited";
    //todo: check API resources
    public static final List<String> API_LIST = Collections.unmodifiableList(Arrays.asList(
            "^/aisp/(.*)/$", "^/pisp/(.*)/$", "^/ciib/(.*)/$"));

    @Override
    public Response getSSAInformation(String ssa) {

        HashMap<String, Object> response = new HashMap<>();

        try {
            SoftwareStatement ssaInfo = Utils.validateStatement(ssa);
            response.put("details", ssaInfo);
            return Response.ok().entity(response).build();

        } catch (Exception e) {
            log.error("Provided SSA is invalid");
            HashMap<String, Object> body = new HashMap<>();
            body.put("softwareEnvironment", "none");
            response.put("details", body);
            return Response.serverError().entity(response).build();
        }

    }

    @Override
    public Response generateKeys(String body) throws Exception {
        Map<String, Object> response;
        JSONObject request = new JSONObject(body);
        response = generateAppKeys(request.getInt("appId"), request.getString("env"),
                request.getString("owner"), request.getString("redirectUri"),
                request.getString("scopes"));
        return Response.ok().entity(response).build();
    }

    /**
     * Generates keys for the API Store application with given appId.
     *
     * @param appId - application Id
     * @return - storeAppDetails
     * @throws Exception - DynamicClientRegistrationException
     */
    public static Map<String, Object> generateAppKeys(int appId, String environment, String owner, String callbackUrl,
                                                      String scopes)
            throws Exception {
        Map<String, Object> storeAppDetails = new HashMap<>();
        String additionalParam = String.format("{\"username\":\"%s\"}", owner);
        try {
            APIConsumer apiConsumer = API_MANAGER_FACTORY.getAPIConsumer(owner);
            Application application = apiConsumer.getApplicationById(appId);
            storeAppDetails = apiConsumer.requestApprovalForApplicationRegistration(
                    owner, application.getName(), environment, callbackUrl,
                    null, null, null, null, additionalParam);
            // add client_id_issued_at and client_secret_expires_at parameters
            long now = Instant.now().getEpochSecond();
            storeAppDetails.put("clientIdIssuedAt", now);
            storeAppDetails.put("clientSecretExpiresAt", 0);
            subscribeAPIs(appId, scopes, owner);
        } catch (Exception e) {
            log.error(String.format("Error while generating keys for the application with id %s. %s", appId, e));
            e.printStackTrace();
        }
        return storeAppDetails;
    }

    /**
     * Subscribe to the published APIs if the requested scopes are matching with the API scope.
     *
     * @param applicationId - applicationId
     * @param scopes        - String containing scopes requested
     * @throws Exception    - Exception
     */
    public static void subscribeAPIs(int applicationId, String scopes, String owner) throws Exception {

        log.debug("About to subscribe to the published APIs with the new client");
        APIConsumer apiConsumer;
        List<String> requestedScopes = new ArrayList<>(Arrays.asList(scopes.split(" ")));
        try {
            apiConsumer = API_MANAGER_FACTORY.getAPIConsumer(owner);
            ApiTypeWrapper apiTypeWrapper;
            APIIdentifier apiIdentifier;
            Set<API> apis = getPublishedApis(owner);
            for (API api : apis) {
                if (isSubscriptionRestricted(api)) {
                    continue; //Skip subscribing to API if restricted
                }
                apiTypeWrapper = new ApiTypeWrapper(api);
                apiTypeWrapper.setTier(UNLIMITED_TIER);
                apiIdentifier = getAPIIdentifier(applicationId, api);
                Set<String> scopeSet = getApiScopeKeySet(apiIdentifier);
                if (!scopeSet.isEmpty()) {
                    //Subscribe to API if the scope is matching and not already subscribed
                    for (String apiScope : scopeSet) {
                        if (requestedScopes.contains(apiScope) &&
                                !apiConsumer.isSubscribedToApp(apiIdentifier, owner, applicationId)) {
                            try {
                                apiConsumer.addSubscription(apiTypeWrapper, owner, applicationId);
                            } catch (NullPointerException e) { //Catching NPE due to a known error in APIM. Try to
                                // subscribe again. git issue: https://github.com/wso2/product-apim/issues/6850
                                log.debug("Recursive call due to APIM NPE");
                                subscribeAPIs(applicationId, scopes, owner);
                            }
                            if (log.isDebugEnabled()) {
                                log.debug(String.format("Successfully subscribed to %s", apiIdentifier.getApiName()));
                            }
                            break;
                        }
                    }
                } else if (!apiConsumer.isSubscribedToApp(apiIdentifier, owner, applicationId)) {
                    //Subscribe if API has no scopes and not already subscribed
                    try {
                        apiConsumer.addSubscription(apiTypeWrapper, owner, applicationId);
                    } catch (NullPointerException e) {
                        log.debug("Recursive call due to APIM NPE");
                        subscribeAPIs(applicationId, scopes, owner);
                    }
                    if (log.isDebugEnabled()) {
                        log.debug(String.format("Successfully subscribed to %s", apiIdentifier.getApiName()));
                    }
                }
            }
        } catch (APIManagementException e) {
            log.error(String.format("Error occurred while subscribing to the APIs. %s", e));
            throw new Exception("Error occurred while subscribing to the APIs", e);
        }
    }

    /**
     * Returns the set of published APIs.
     *
     * @return - Set<API>
     */
    public static Set<API> getPublishedApis(String owner) throws Exception {
        Optional<Set<API>> apis;
        try {
            APIConsumer apiConsumer = API_MANAGER_FACTORY.getAPIConsumer(owner);
            apis = Optional.ofNullable(apiConsumer.getAllPublishedAPIs("carbon.super"));
        } catch (APIManagementException e) {
            log.error(String.format("Could not retrieve published api details. %s", e));
            throw new Exception("Error while retrieving published APIs", e);
        }
        return apis.orElse(new HashSet<>());
    }

    /**
     * Check if subscribing to api is restricted.
     * Regex match is used to support all versions of the api.
     *
     * @param api - API
     * @return - boolean
     */
    private static boolean isSubscriptionRestricted(API api) {

        String apiContext = api.getContext();
        for (String contextRegex : API_LIST) {
            Pattern p = Pattern.compile(contextRegex);
            if (p.matcher(apiContext).matches()) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get APIIdentifier when the api and applicationId is given.
     *
     * @param applicationId - application id (store)
     * @param api           - API object
     * @return - APIIdentifier
     */
    private static APIIdentifier getAPIIdentifier(int applicationId, API api) {

        APIIdentifier apiIdentifier;
        apiIdentifier = api.getId();
        apiIdentifier.setTier(UNLIMITED_TIER);
        apiIdentifier.setApplicationId(Integer.toString(applicationId));

        return apiIdentifier;
    }

    /**
     * Get a distinct set of scope keys for the given API.
     * eg: accounts, payments
     *
     * @param apiIdentifier - APIIdentifier
     * @return - Set of scope keys
     * @throws APIManagementException - APIManagementException
     */
    private static Set<String> getApiScopeKeySet(APIIdentifier apiIdentifier) throws APIManagementException {

        Set<Scope> scopeSet = ApiMgtDAO.getInstance().getAPIScopes(apiIdentifier);
        Set<String> scopeKeySet = new HashSet<>();
        scopeSet.iterator().forEachRemaining((scope) -> scopeKeySet.add(scope.getKey()));
        return scopeKeySet;
    }
}
