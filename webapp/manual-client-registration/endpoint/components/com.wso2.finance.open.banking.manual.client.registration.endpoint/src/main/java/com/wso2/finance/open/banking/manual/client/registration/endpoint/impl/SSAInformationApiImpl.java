package com.wso2.finance.open.banking.manual.client.registration.endpoint.impl;

import com.wso2.finance.open.banking.common.util.client.registration.Utils;
import com.wso2.finance.open.banking.common.util.client.registration.data.SoftwareStatement;
import com.wso2.finance.open.banking.manual.client.registration.endpoint.MCRApiService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.HashMap;
import javax.ws.rs.core.Response;

/**
 * Get SSA details for MCR request
 */
public class SSAInformationApiImpl extends MCRApiService {

    private static final Log log = LogFactory.getLog(MCRApiService.class);

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
}
