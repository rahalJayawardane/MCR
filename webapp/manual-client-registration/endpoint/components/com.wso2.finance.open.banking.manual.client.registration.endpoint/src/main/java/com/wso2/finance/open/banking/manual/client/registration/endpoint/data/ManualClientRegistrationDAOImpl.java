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

package com.wso2.finance.open.banking.manual.client.registration.endpoint.data;

import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.wso2.carbon.apimgt.impl.utils.APIMgtDBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Savepoint;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

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
}
