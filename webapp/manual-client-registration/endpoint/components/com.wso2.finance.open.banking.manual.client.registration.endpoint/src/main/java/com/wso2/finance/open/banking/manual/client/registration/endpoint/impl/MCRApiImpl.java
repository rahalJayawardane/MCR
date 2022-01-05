/*
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses. For specific
 * language governing the permissions and limitations under this license,
 * please see the license as well as any agreement you’ve entered into with
 * WSO2 governing the purchase of this software and any associated services.
 */

package com.wso2.finance.open.banking.manual.client.registration.endpoint.impl;

import com.wso2.finance.open.banking.common.util.RegexRedirectURIBuilder;
import com.wso2.finance.open.banking.common.util.client.registration.Utils;
import com.wso2.finance.open.banking.common.util.client.registration.data.SoftwareStatement;
import com.wso2.finance.open.banking.manual.client.registration.endpoint.MCRApiService;
import com.wso2.finance.open.banking.manual.client.registration.endpoint.data.ManualClientRegistrationDAOImpl;
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
import org.wso2.carbon.apimgt.impl.APIConstants;
import org.wso2.carbon.apimgt.impl.APIManagerConfiguration;
import org.wso2.carbon.apimgt.impl.APIManagerFactory;
import org.wso2.carbon.apimgt.impl.dao.ApiMgtDAO;
import org.wso2.carbon.apimgt.impl.internal.ServiceReferenceHolder;
import org.wso2.carbon.user.api.UserRealm;
import org.wso2.carbon.user.core.service.RealmService;

import java.sql.SQLException;
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
 * Methods related to MCR
 */
public class MCRApiImpl extends MCRApiService {

    private static final Log log = LogFactory.getLog(MCRApiService.class);
    public static final APIManagerFactory API_MANAGER_FACTORY = APIManagerFactory.getInstance();
    private static final String UNLIMITED_TIER = "Unlimited";
    static APIManagerConfiguration apimConfig = ServiceReferenceHolder.getInstance().
            getAPIManagerConfigurationService().getAPIManagerConfiguration();
    private static final String ADMIN_USER = apimConfig.getFirstProperty(APIConstants.API_KEY_VALIDATOR_USERNAME);
    public static final List<String> API_LIST = Collections.unmodifiableList(Arrays.asList(
            "^(.*)/aisp$", "^(.*)/pisp$", "^(.*)/cbpii$", "^(.*)/event$"));

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
        JSONObject request = new JSONObject(body);
        Map<String, Object>  response = generateAppKeys(request.getString("appId"), request.getString("env"),
                request.getString("owner"), request.getString("redirectUri"),
                request.getString("roles"));
        return Response.ok().entity(response).build();
    }

    /**
     * Check if an application with the given software id exists in the database.
     *
     * @param softwareId - Software statement body
     * @return - Boolean
     * @throws Exception - Exception
     */
    @Override
    public Boolean isApplicationExists(String softwareId) throws Exception {
        ManualClientRegistrationDAOImpl mcrRegistrationDAO = new ManualClientRegistrationDAOImpl();
        //check if the application already exists in database
        if (mcrRegistrationDAO.isSoftwareIdExists(softwareId)) {
            log.error(String.format("An active application with the software id %s already exists", softwareId));
            return true;
        } else {
            if (log.isDebugEnabled()) {
                log.debug(String.format("An active application with the software id %s doesn't exist", softwareId));
            }
            return false;
        }
    }

    @Override
    public Boolean assignRoles(JSONObject body) throws Exception {

        RealmService realmService = ServiceReferenceHolder.getInstance().getRealmService();
        UserRealm realm = realmService.getTenantUserRealm(-1234);

        realm.getUserStoreManager().updateRoleListOfUser(body.getString("userName"), null,
                new String[]{"Internal/subscriber"});
        return updateScopes(body.getString("accessToken"));
    }

    public Boolean updateScopes(String accessToken) throws Exception {
        ManualClientRegistrationDAOImpl mcrRegistrationDAO = new ManualClientRegistrationDAOImpl();
        JSONObject response = mcrRegistrationDAO.getTokenIdFromAccToken(accessToken);
        try {
            if (response.getString("tokenId") != null && response.getInt("scopeCount") < 2) {
                mcrRegistrationDAO.updateScopes(response.getString("tokenId"));
            }
            return true;
        } catch (SQLException e) {
            return false;
        }
    }

    /**
     * Generates keys for the API Store application with given appId.
     *
     * @param appUUID - application Id
     * @return - storeAppDetails
     * @throws Exception - DynamicClientRegistrationException
     */
    public static Map<String, Object> generateAppKeys(String appUUID, String environment, String owner,
                                                      String callbackUrl, String roles)
            throws Exception {
        Map<String, Object> storeAppDetails = new HashMap<>();
        String additionalParam = String.format("{\"username\":\"%s\"}", owner);
        int appId = getAppIdFromUuid(appUUID);
        String callbackUrls = getCallbackUriString(Arrays.asList(callbackUrl.split(",")));
        try {
            APIConsumer apiConsumer = API_MANAGER_FACTORY.getAPIConsumer(owner);
            Application application = apiConsumer.getApplicationById(appId);
            storeAppDetails = apiConsumer.requestApprovalForApplicationRegistration(
                    owner, application.getName(), environment, callbackUrls,
                    null, null, null, null, additionalParam);
            // add client_id_issued_at and client_secret_expires_at parameters
            long now = Instant.now().getEpochSecond();
            storeAppDetails.put("clientIdIssuedAt", now);
            storeAppDetails.put("clientSecretExpiresAt", 0);
            subscribeAPIs(appId, roles, owner);
        } catch (Exception e) {
            log.error(String.format("Error while generating keys for the application with id %s. %s", appId, e));
        }
        return storeAppDetails;
    }

    /**
     * Get APPId from UUID
     *
     * @param appUUID
     * @return
     * @throws Exception
     */
    private static int getAppIdFromUuid(String appUUID) throws Exception {
        Application existingApp;
        existingApp = ApiMgtDAO.getInstance().getApplicationByUUID(appUUID);
        return existingApp.getId();
    }

    /**
     * Subscribe to the published APIs if the requested scopes are matching with the API scope.
     *
     * @param applicationId - applicationId
     * @param roles         - String containing roles in SSA
     * @throws Exception    - Exception
     */
    public static void subscribeAPIs(int applicationId, String roles, String owner) throws Exception {

        log.debug("About to subscribe to the published APIs with the new client");
        APIConsumer apiConsumer;
        List<String> requestedScopes = convertRolesToScopes(roles);
        try {
            apiConsumer = API_MANAGER_FACTORY.getAPIConsumer(owner);
            ApiTypeWrapper apiTypeWrapper;
            APIIdentifier apiIdentifier;
            Set<API> apis = getPublishedApis(ADMIN_USER);
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
                                subscribeAPIs(applicationId, roles, owner);
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
                        subscribeAPIs(applicationId, roles, owner);
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
     * SSA roles to API scopes
     *
     * @param roles
     * @return
     */
    private static List<String> convertRolesToScopes(String roles) {
        List<String> ssaRoles = new ArrayList<>(Arrays.asList(roles.split(",")));
        List<String> requestedScopes = new ArrayList<>();
        for (String scope: ssaRoles) {
            switch (scope) {
                case "AISP":
                    requestedScopes.add("accounts");
                    break;
                case "PISP":
                    requestedScopes.add("payments");
                    break;
                case "CBPII":
                    requestedScopes.add("fundsconfirmations");
                    break;
                default:
                    break;
            }
        }
        return requestedScopes;
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

    /**
     * Join multiple callback uris if available and return as a single string.
     * ex: regex=(uri1|uri2|uri3)
     *
     * @param callbackUris - list of callback uris
     * @return callbackUriString
     */
    public static String getCallbackUriString(List<String> callbackUris) {

        return new RegexRedirectURIBuilder()
                .addURIList(callbackUris)
                .build();
    }
}
