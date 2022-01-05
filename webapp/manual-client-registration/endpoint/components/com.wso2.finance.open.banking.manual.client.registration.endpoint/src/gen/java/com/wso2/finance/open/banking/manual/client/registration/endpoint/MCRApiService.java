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

import org.json.JSONObject;

import javax.ws.rs.core.Response;

/**
 * MCR requests APIs
 */
public abstract class MCRApiService {

    /**
     * Get SSA Details.
     *
     * //@param jsonObject - SSA
     * @return - http response
     */
    public abstract Response getSSAInformation(String ssa) throws Exception;

    /**
     * Generate Keys
     *
     * //@param jsonObject - SSA
     * @return - http response
     */
    public abstract Response generateKeys(String body) throws Exception;

    /**
     * Generate Keys
     * <p>
     * //@param jsonObject - SSA
     *
     * @return - http response
     */
    public abstract Boolean isApplicationExists(String body) throws Exception;

    /**
     * Update the authCode Scopes
     * <p>
     * //@param jsonObject - SSA
     *
     * @return - http response
     */
    public abstract Boolean assignRoles(JSONObject body) throws Exception;
}
