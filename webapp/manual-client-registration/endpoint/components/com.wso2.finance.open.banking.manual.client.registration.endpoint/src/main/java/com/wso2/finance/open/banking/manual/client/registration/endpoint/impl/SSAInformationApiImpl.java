package com.wso2.finance.open.banking.manual.client.registration.endpoint.impl;

import com.wso2.finance.open.banking.common.util.client.registration.Utils;
import com.wso2.finance.open.banking.common.util.client.registration.data.SoftwareStatement;
import com.wso2.finance.open.banking.manual.client.registration.endpoint.MCRApiService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;
import org.wso2.carbon.apimgt.api.APIConsumer;
import org.wso2.carbon.apimgt.api.model.Application;
import org.wso2.carbon.apimgt.impl.APIManagerFactory;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.core.Response;

/**
 * Get SSA details for MCR request
 */
public class SSAInformationApiImpl extends MCRApiService {

    private static final Log log = LogFactory.getLog(MCRApiService.class);
    public static final APIManagerFactory API_MANAGER_FACTORY = APIManagerFactory.getInstance();

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
                request.getString("owner"), request.getString("redirectUri"));
        return Response.ok().entity(response).build();
    }

    /**
     * Generates keys for the API Store application with given appId.
     *
     * @param appId - application Id
     * @return - storeAppDetails
     * @throws Exception - DynamicClientRegistrationException
     */
    public static Map<String, Object> generateAppKeys(int appId, String environment, String owner, String callbackUrl)
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
        } catch (Exception e) {
            log.error(String.format("Error while generating keys for the application with id %s. %s", appId, e));
            e.printStackTrace();
        }
        return storeAppDetails;
    }
}
