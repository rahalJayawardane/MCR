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

package com.wso2.finance.open.banking.manual.client.registration.endpoint.data;

import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONObject;
import org.wso2.carbon.apimgt.impl.utils.APIMgtDBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Data access implementation to handle DCR requests.
 */
public class ManualClientRegistrationDAOImpl {

    private static Log log = LogFactory.getLog(ManualClientRegistrationDAOImpl.class);

    /**
     *
     * @param softwareId
     * @return
     * @throws Exception
     */
    public boolean isSoftwareIdExists(String softwareId) throws Exception {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        boolean softwareIdExists = false;
        if (StringUtils.isEmpty(softwareId)) {
            log.error("Software ID not found");
            throw new Exception("software Id should be submitted in order to proceed.");
        }
        final String sql = "SELECT * FROM AM_APPLICATION_ATTRIBUTES " +
                "WHERE NAME in ('software_id_sandbox', 'software_id_production') AND VALUE = ?";
        try {


            connection = APIMgtDBUtil.getConnection();
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, softwareId);
            try {
                resultSet = preparedStatement.executeQuery();
                if (resultSet.next()) {
                    softwareIdExists = true;
                }
            } catch (SQLException e) {
                log.error(String.format("Error occurred in data retrieval. %s", e));
                throw new Exception(
                        "Error occurred while processing the result set in dynamic client registration details " +
                                "retrieval.", e);
            }
        } catch (SQLException e) {
            log.error(String.format("Error occurred in data retrieval. %s", e));
            throw new Exception(String.format(
                    "SQL error occurred while checking the existence " +
                            "of the application with software id - '%s' ", softwareId), e);
        } finally {
            DbUtils.closeQuietly(resultSet);
            DbUtils.closeQuietly(preparedStatement);
            DbUtils.closeQuietly(connection);
            log.debug("Closed the database connection");
        }
        return softwareIdExists;
    }

    /**
     *
     * @param tokenId
     * @return
     * @throws Exception
     */
    public boolean updateScopes(String tokenId) throws Exception {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        boolean updated = false;
        final String sql = "INSERT INTO IDN_OAUTH2_ACCESS_TOKEN_SCOPE (TOKEN_ID, TOKEN_SCOPE, TENANT_ID) VALUES " +
                "(?,?,?)";
        List<String> scopes = new ArrayList<String>();
        scopes.add("apim:api_key");
        scopes.add("apim:app_manage");
        scopes.add("apim:store_settings");
        scopes.add("apim:sub_alert_manage");
        scopes.add("apim:sub_manage");
        scopes.add("apim:subscribe");

        try {
            connection = APIMgtDBUtil.getConnection();
            preparedStatement = connection.prepareStatement(sql);
            for (String scope : scopes) {
                preparedStatement.setString(1, tokenId);
                preparedStatement.setString(2, scope);
                preparedStatement.setInt(3, -1234);
                preparedStatement.addBatch();
            }
            preparedStatement.executeBatch();
            connection.commit();
            updated = true;
        } catch (SQLException e) {
            log.error(String.format(
                    "SQL error occurred while updating the scopes: token code - '%s' ", tokenId), e);
        } finally {
            DbUtils.closeQuietly(preparedStatement);
            DbUtils.closeQuietly(connection);
            log.debug("Closed the database connection");
        }
        return updated;
    }

    public JSONObject getTokenIdFromAccToken(String accessToken) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        JSONObject reponse = new JSONObject();
        final String sql = "SELECT count(*) as SCOPECOUNT, ts.TOKEN_ID " +
                "FROM IDN_OAUTH2_ACCESS_TOKEN_SCOPE as ts " +
                "INNER JOIN IDN_OAUTH2_ACCESS_TOKEN as t on ts.TOKEN_ID = t.TOKEN_ID " +
                "WHERE ACCESS_TOKEN = ? group by ts.TOKEN_ID;";
        try {
            connection = APIMgtDBUtil.getConnection();
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, accessToken);
            try {
                resultSet = preparedStatement.executeQuery();
                if (resultSet.next()) {
                    reponse.put("tokenId", resultSet.getString("TOKEN_ID"));
                    reponse.put("scopeCount", resultSet.getString("SCOPECOUNT"));
                }
            } catch (SQLException e) {
                log.error(String.format("Error occurred in token Id retrieval. %s", e));
            }
        } catch (SQLException e) {
            log.error(String.format("Error occurred in toke Id retrieval. %s", e));
        } finally {
            DbUtils.closeQuietly(resultSet);
            DbUtils.closeQuietly(preparedStatement);
            DbUtils.closeQuietly(connection);
            log.debug("Closed the database connection");
        }
        return reponse;
    }
}
