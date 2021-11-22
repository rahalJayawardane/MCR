package com.wso2.finance.open.banking.mcr.endpoint.api.impl;

import com.google.gson.Gson;
import com.wso2.finance.open.banking.common.exception.ClientRegistrationFailureException;
import com.wso2.finance.open.banking.common.util.client.registration.Utils;
import com.wso2.finance.open.banking.common.util.client.registration.data.SoftwareStatement;
import com.wso2.finance.open.banking.mcr.endpoint.api.SSAInformationApi;
import org.json.JSONObject;

import javax.ws.rs.core.Response;

/**
 * Get SSA details
 */
public class SSAInformationApiServiceImpl implements SSAInformationApi {

    @Override
    public Response getSSAInformation(JSONObject object) throws ClientRegistrationFailureException {

        String ssa = object.get("ssa").toString();
        SoftwareStatement ssaInfo = Utils.validateStatement(ssa);
        JSONObject response = new JSONObject(new Gson().toJson(ssaInfo));
        return Response.ok()
                .entity(response)
                .build();
    }
}
