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

package com.wso2.finance.open.banking.manual.client.registration.endpoint;

import com.wso2.finance.open.banking.manual.client.registration.endpoint.impl.MCRApiImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 * RegisterApi Class.
 */
@Path("/")
@Consumes({"application/json"})
@Produces({"application/json"})
@Api(value = "/", description = "MCR related APIs")
public class MCRApi {

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
        MCRApiImpl mcrApiImpl = new MCRApiImpl();
        return  mcrApiImpl.getSSAInformation(request.getString("ssa"));
    }

    @POST
    @Path("/mcr/ssa/key/generate")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    @io.swagger.annotations.ApiOperation(value = "generate application key and subscribe apis", response = void.class)
    @io.swagger.annotations.ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 404, message = "Data Not Found"),
            @ApiResponse(code = 500, message = "Invalid Data")
    })

    public Response generateKeys(@RequestBody String data) throws Exception {
        MCRApiImpl mcrApiImpl = new MCRApiImpl();
        return  mcrApiImpl.generateKeys(data);
    }

    @POST
    @Path("/mcr/app/exists")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    @io.swagger.annotations.ApiOperation(value = "check the software ID is already exists", response = void.class)
    @io.swagger.annotations.ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 404, message = "Data Not Found"),
            @ApiResponse(code = 500, message = "Invalid Data")
    })

    public Response isAppExists(@RequestBody String data) throws Exception {
        MCRApiImpl mcrApiImpl = new MCRApiImpl();
        JSONObject request = new JSONObject(data);
        boolean isExists = mcrApiImpl.isApplicationExists(request.getString("softwareId"));
        Map<String, Object> response = new HashMap<>();
        response.put("isExists",isExists);
        return Response.ok().entity(response).build();
    }

    @POST
    @Path("/mcr/role/update")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    @io.swagger.annotations.ApiOperation(value = "Update the oauth2 scopes", response = void.class)
    @io.swagger.annotations.ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 404, message = "Data Not Found"),
            @ApiResponse(code = 500, message = "Invalid Data")
    })

    public Response updateAuthCodeScopes(@RequestBody String data) throws Exception {
        MCRApiImpl mcrApiImpl = new MCRApiImpl();
        JSONObject request = new JSONObject(data);
        boolean updateStatus = mcrApiImpl.assignRoles(request);
        Map<String, Object> response = new HashMap<>();
        response.put("scopeUpdated",updateStatus);
        return Response.ok().entity(response).build();
    }
}

