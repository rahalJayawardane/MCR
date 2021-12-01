/*
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses. For specific
 * language governing the permissions and limitations under this license,
 * please see the license as well as any agreement you’ve entered into with
 * WSO2 governing the purchase of this software and any associated services.
 */

package com.wso2.finance.open.banking.manual.client.registration.endpoint;

import com.wso2.finance.open.banking.common.util.client.registration.data.SoftwareStatement;
import com.wso2.finance.open.banking.manual.client.registration.endpoint.impl.SSAInformationApiImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 * RegisterApi Class.
 */
@Path("/")
@Consumes({"application/json"})
@Produces({"application/json"})
@Api(value = "/", description = "MCR related APIs")
public class SSAInformationApi {

    @POST
    @Path("/mcr/ssa/validity")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    @io.swagger.annotations.ApiOperation(value = "get details of Software Statement Assertion", response = void.class)
    @io.swagger.annotations.ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 404, message = "Service Provider Data Not Found"),
            @ApiResponse(code = 500, message = "Invalid SSA")
    })

    public Response getSSAInformation(@RequestBody String data) throws Exception {
        JSONObject request = new JSONObject(data);
        SSAInformationApiImpl ssaInformationApi = new SSAInformationApiImpl();
        return  ssaInformationApi.getSSAInformation(request.getString("ssa"));
    }
}

