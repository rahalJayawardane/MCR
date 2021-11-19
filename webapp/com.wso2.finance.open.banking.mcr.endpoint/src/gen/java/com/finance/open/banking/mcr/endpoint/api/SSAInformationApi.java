/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses.
 * For specific language governing the permissions and limitations under this
 * license, please see the license as well as any agreement you’ve entered into
 * with WSO2 governing the purchase of this software and any associated services.
 */

package com.finance.open.banking.mcr.endpoint.api;

import com.finance.open.banking.mcr.endpoint.model.SSAInfoErrorDTO;
import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

import com.wso2.finance.open.banking.common.exception.ClientRegistrationFailureException;
import com.wso2.finance.open.banking.common.util.client.registration.data.SoftwareStatement;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * ApplicationInfoAPI
 *
 * <p>This specifies a RESTful API for retriving OAuth Application Information
 *
 */
@Path("/")
@Api(value = "/", description = "MCR related APIs")
public interface SSAInformationApi {

    /**
     * Check Retrieve SSA information
     */
    @POST
    @Path("/mcr/ssa/validity")
    @Consumes({"application/json"})
    @Produces({"application/json"})
    @ApiOperation(value = "Retrieve SSA Details", tags = {"SSA Information",})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = SoftwareStatement.class),
            @ApiResponse(code = 404, message = "Service Provider Data Not Found"),
            @ApiResponse(code = 400, message = "Bad Request", response = SSAInfoErrorDTO.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = SSAInfoErrorDTO.class)})
    public Response getSSAInformation(@RequestBody JSONObject object) throws ClientRegistrationFailureException;
}

