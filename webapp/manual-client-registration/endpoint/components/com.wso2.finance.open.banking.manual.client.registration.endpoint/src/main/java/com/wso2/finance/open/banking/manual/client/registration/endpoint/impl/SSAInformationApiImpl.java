package com.wso2.finance.open.banking.manual.client.registration.endpoint.impl;

import com.wso2.finance.open.banking.common.util.client.registration.Utils;
import com.wso2.finance.open.banking.common.util.client.registration.data.SoftwareStatement;
import com.wso2.finance.open.banking.manual.client.registration.endpoint.MCRApiService;

import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.core.Response;

public class SSAInformationApiImpl extends MCRApiService {

    @Override
    public Response getSSAInformation(String ssa) throws Exception {

        SoftwareStatement ssaInfo = Utils.validateStatement(ssa);
        HashMap<String, Object> response = new HashMap<>();
        response.put("details", ssaInfo);
        return Response.ok()
                .entity(response)
                .build();
    }
}
