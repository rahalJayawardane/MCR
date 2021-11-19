/*
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses.
 * For specific language governing the permissions and limitations under this
 * license, please see the license as well as any agreement you’ve entered into
 * with WSO2 governing the purchase of this software and any associated services.
 *
 */

import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { FormattedMessage, injectIntl } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Settings from 'Settings';


const styles = (theme) => ({
    FormControl: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: 0,
        width: '100%',
    },
    FormControlOdd: {
        padding: theme.spacing(2),
        width: '100%',
    },
    button: {
        marginLeft: theme.spacing(1),
    },
    quotaHelp: {
        position: 'relative',
    },
    checkboxWrapper: {
        display: 'flex',
    },
    checkboxWrapperColumn: {
        display: 'flex',
        flexDirection: 'row',
    },
    group: {
        flexDirection: 'row',
    },
    removeHelperPadding: {
        '& p': {
            margin: '8px 0px',
        },
    },
});

const isInvalidOrgId = (orgId) => {
    const defaultOrgIdRegexString = '^PSD[A-Z]{2}-[A-Z]{2,8}-[[a-zA-Z0-9]*$';
    const customOrgIdRegexString = Settings.openbanking.orgIdRegex;
    const defaultOrgIdRegex = new RegExp(defaultOrgIdRegexString);
    const customOrgIdRegex = new RegExp(Settings.openbanking.orgIdRegex);

    let maxInputLength;

    if (Settings.openbanking.maxAllowedInputLength !== undefined) {
        maxInputLength = Settings.openbanking.maxAllowedInputLength;
    } else {
        maxInputLength = 20;
    }

    /* If a custom regex is configured, validate using the configured regex, otherwise, validate with default regex.
       If a max input length is not defined, the default max input length is 20. */
    if (customOrgIdRegexString !== undefined && (maxInputLength >= orgId.length)) {
        return (orgId == null || !(customOrgIdRegex.test(orgId)));
    } else {
        return (orgId == null || !(defaultOrgIdRegex.test(orgId)));
    }
};
/**
 *
 *
 * @class OBConfiguration
 * @extends {React.Component}
 */
const OBConfiguration = (props) => {
    const [isOrgIdError, setOrgIdError] = useState(false);
    const [isSPCertError, setSPCertError] = useState(false);

    /**
     * This method is used to handle the updating of key generation
     * request object.
     * @param {*} field field that should be updated in key request
     * @param {*} event event fired
     */
    const handleChange = (field, event) => {
        const { keyRequest, updateKeyRequest, setGenerateEnabled } = props;
        const newRequest = { ...keyRequest };
        const { target: currentTarget } = event;

        switch (field) {
            case 'organizationId':
                if (isInvalidOrgId(currentTarget.value)) {
                    setOrgIdError(true);
                    setGenerateEnabled(false);
                } else {
                    setOrgIdError(false);
                    setGenerateEnabled(true);
                }
                newRequest.organizationId = currentTarget.value;
                break;
            case 'certificate':
                // eslint-disable-next-line no-use-before-define
                if (isInvalidCert(currentTarget.value)) {
                    setSPCertError(true);
                    setGenerateEnabled(false);
                } else {
                    setSPCertError(false);
                    setGenerateEnabled(true);
                }
                newRequest.spCertificate = currentTarget.value;
                break;
            default:
                break;
        }
        updateKeyRequest(newRequest);
    };

    const {
        classes, isOrgIdEnabled, isRegulatoryApp, keys, hasKeysGenerated,
    } = props;
    const isInvalidCert = (spCert) => {
        if (spCert == null) {
            return true;
        }
        try {
            // Try to convert to utf-8
            decodeURIComponent(escape(spCert));
            // If the conversion succeeds, text is not utf-8
            return false;
        } catch (e) {
            return true;
        }
    };


    return (

        <div>
            <Grid item xs={10} md={5}>
                {isRegulatoryApp ? (
                    <TextField
                        classes={{
                            root: classes.removeHelperPadding,
                        }}
                        fullWidth
                        id='certificate'
                        label={(
                            <FormattedMessage
                                defaultMessage='Application Certificate'
                                id='Shared.AppsAndKeys.OBConfiguration.certification.content.label'
                            />
                        )}
                        multiline
                        rows='10'
                        defaultValue={keys ? atob(JSON.parse(keys).spCert.trim()) : ''}
                        name='certificate'
                        onChange={(e) => handleChange('certificate', e)}
                        helperText={
                            isSPCertError
                                ? (
                                    <Typography variant='caption'>
                                        <FormattedMessage
                                            defaultMessage='Make sure to remove the &quot;
                                            -----BEGIN CERTIFICATE-----&quot;
                                            and &quot;-----END CERTIFICATE-----&quot; from the certificate content'
                                            id='Shared.AppsAndKeys.OBConfiguration.
                                            certification.content.helper.error'
                                        />
                                    </Typography>
                                )
                                : (
                                    <Typography variant='caption'>
                                        <FormattedMessage
                                            defaultMessage='The application certificate in PEM format<br>NOTE:
                                            Make sure to remove the \"-----BEGIN CERTIFICATE-----\" and
                                            \"-----END CERTIFICATE-----\" from the certificate content'
                                            id='Shared.AppsAndKeys.OBConfiguration.certification.content.helper'
                                        />
                                    </Typography>
                                )
                        }
                        margin='normal'
                        variant='outlined'
                        error={isSPCertError}
                        inputProps={{
                            disabled: hasKeysGenerated,
                        }}
                    />
                ) : null}
            </Grid>
            <Grid item xs={10} md={5}>
                {(isRegulatoryApp && isOrgIdEnabled) ? (
                    <TextField
                        classes={{
                            root: classes.removeHelperPadding,
                        }}
                        fullWidth
                        id='orgId'
                        label={(
                            <FormattedMessage
                                defaultMessage='Organization ID'
                                id='Shared.AppsAndKeys.OBConfiguration.organization.id.label'
                            />
                        )}
                        defaultValue={keys ? JSON.parse(keys).orgId.trim() : ''}
                        name='orgId'
                        onChange={(e) => handleChange('organizationId', e)}
                        helperText={
                            isOrgIdError
                                ? (
                                    <Typography variant='caption'>
                                        <FormattedMessage
                                            defaultMessage='Organization identifier cannot be empty or invalid'
                                            id='Shared.AppsAndKeys.OBConfiguration.org.id.content.helper.error'
                                        />
                                    </Typography>
                                )
                                : (
                                    <Typography variant='caption'>
                                        <FormattedMessage
                                            defaultMessage='Organization Identifier as provided in the
                                            eIDAS certificate. E.g. PSDUK-NCA-OrganizationID'
                                            id='Shared.AppsAndKeys.OBConfiguration.org.id.content.helper'
                                        />
                                    </Typography>
                                )
                        }
                        margin='normal'
                        variant='outlined'
                        error={isOrgIdError}
                        inputProps={{
                            disabled: hasKeysGenerated,
                        }}
                    />
                ) : null}
            </Grid>
        </div>
    );
};


export default injectIntl(withStyles(styles)(OBConfiguration));
