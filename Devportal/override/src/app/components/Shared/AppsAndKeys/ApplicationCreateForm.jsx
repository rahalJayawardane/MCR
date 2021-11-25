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

import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';
import Application from 'AppData/Application';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Settings from 'Settings';
import axios from 'axios';


/**
 * @inheritdoc
 * @param {*} theme theme object
 */
const styles = (theme) => ({
    FormControl: {
        padding: theme.spacing(2),
        width: '100%',
    },
    FormControlOdd: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
    quotaHelp: {
        position: 'relative',
    },
    mandatoryStarSelect: {
        '& label>span:nth-child(2)': {
            color: 'red',
        },
    },
    mandatoryStarText: {
        '& label>span:nth-child(1)': {
            color: 'red',
        },
    },
    applicationForm: {
        '& span, & div, & p, & input': {
            color: theme.palette.getContrastText(theme.palette.background.paper),
        }
    }
});

const isMCREnabled = Settings.openbanking.enableMCR;
const mcrInputProps = {
    readOnly: true,
};
if (isMCREnabled) mcrInputProps.disabled = true;


// export default function App() {
//     const [post, setPost] = React.useState(null);

//     React.useEffect(() => {
//       axios.get(baseURL).then((response) => {
//         setPost(response.data);
//       });
//     }, []);

//     if (!post) return null;

//     return (
//       <div>
//         <h1>{post.title}</h1>
//         <p>{post.body}</p>
//       </div>
//     );
// }

const ApplicationCreate = (props) => {
    /**
     * This method is used to handle the updating of create application
     * request object.
     * @param {*} field field that should be updated in appliction request
     * @param {*} event event fired
     */
    const handleChange = ({ target: { name: field, value } }) => {
        const { applicationRequest, updateApplicationRequest } = props;
        const newRequest = { ...applicationRequest };
        // const { target: currentTarget } = event;
        switch (field) {
            case 'name':
                newRequest.name = value;
                break;
            case 'description':
                newRequest.description = value;
                break;
            case 'throttlingPolicy':
                newRequest.throttlingPolicy = value;
                break;
            case 'tokenType':
                newRequest.tokenType = value;
                break;
            case 'attributes':
                newRequest.attributes = value;
                break;
            default:
                break;
        }
        updateApplicationRequest(newRequest);
    };

    const [ssa, setSSA] = React.useState(null);

    /**
     * AJAX call for MCR details
     * @param {*} event - get ssa from input
     */
    function createPost(event) {
        const data123 = { ssa: event.target.value };
        axios.post(
            'https://localhost:9443/api/openbanking/manual-client-registration/mcr/ssa/validity',
            data123,
            {
                headers: {
                    'content-type': 'application/json',
                },
            },
        )
            .then((response) => {
                setSSA(response.data);
                // eslint-disable-next-line no-console
                alert(ssa.details.softwareEnvironment);
                if (ssa.details.softwareEnvironment === 'sandbox') {
                    alert('taking values');
                    // eslint-disable-next-line react/no-this-in-sfc
                    this.setState({
                        software_id_sandbox: ssa.details.softwareID,
                        software_roles_sandbox: ssa.details.softwareRoles,
                        software_jwks_endpoint_sandbox: ssa.details.softwareJwksEndpointt,
                        org_id_sandbox: ssa.details.orgID,
                        scope_sandbox: ssa.details.softwareID,
                    });
                }
            })
            .catch((response) => {
                // handle error
                // eslint-disable-next-line no-console
                console.log('error' + response);
            });
    }
    /**
     *
     *
     * @returns {Component}
     * @memberof ApplicationCreate
     */
    const {
        classes,
        throttlingPolicyList,
        applicationRequest,
        isNameValid,
        allAppAttributes,
        handleAttributesChange,
        isRequiredAttribute,
        getAttributeValue,
        intl,
        validateName,
        isApplicationSharingEnabled,
        handleAddChip,
        handleDeleteChip,
    } = props;
    return (
        // eslint-disable-next-line react/jsx-filename-extension
        <form noValidate autoComplete='off' className={classes.applicationForm}>
            <TextField
                classes={{
                    root: classes.mandatoryStarText,
                }}
                margin='normal'
                variant='outlined'
                autoFocus
                fullWidth
                required
                value={applicationRequest.name}
                label={intl.formatMessage({
                    defaultMessage: 'Application Name',
                    id: 'Shared.AppsAndKeys.ApplicationCreateForm.application.name',
                })}
                helperText={intl.formatMessage({
                    defaultMessage:
                        `Enter a name to identify the Application.
                                    You will be able to pick this application when subscribing to APIs`,
                    id: 'Shared.AppsAndKeys.ApplicationCreateForm.enter.a.name',
                })}
                name='name'
                onChange={handleChange}
                placeholder={intl.formatMessage({
                    defaultMessage: 'My Application',
                    id: 'Shared.AppsAndKeys.ApplicationCreateForm.my.mobile.application',
                })}
                onBlur={(e) => validateName(e.target.value)}
                error={!isNameValid}
                inputProps={{ maxLength: 70 }}
            />
            <TextField
                classes={{
                    root: classes.mandatoryStarSelect,
                }}
                required
                fullWidth
                id='outlined-select-currency'
                select
                label={(
                    <FormattedMessage
                        defaultMessage='Per Token Quota.'
                        id='Shared.AppsAndKeys.ApplicationCreateForm.per.token.quota'
                    />
                )}
                value={applicationRequest.throttlingPolicy}
                name='throttlingPolicy'
                onChange={handleChange}
                helperText={(
                    <FormattedMessage
                        defaultMessage={`Assign API request quota per access token.
                            Allocated quota will be shared among all
                            the subscribed APIs of the application.`}
                        id='Shared.AppsAndKeys.ApplicationCreateForm.assign.api.request'
                    />
                )}
                margin='normal'
                variant='outlined'
            >
                {throttlingPolicyList.map((policy) => (
                    <MenuItem key={policy} value={policy}>
                        {policy}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                classes={{
                    root: classes.mandatoryStarSelect,
                }}
                required
                fullWidth
                id='outlined-select-currency'
                select
                label={(
                    <FormattedMessage
                        defaultMessage='Token Type'
                        id='Shared.AppsAndKeys.ApplicationCreateForm.token.type'
                    />
                )}
                value={applicationRequest.tokenType}
                name='tokenType'
                onChange={handleChange}
                helperText={(
                    <FormattedMessage
                        defaultMessage='Select token type'
                        id='Shared.AppsAndKeys.ApplicationCreateForm.select.token.type'
                    />
                )}
                margin='normal'
                variant='outlined'
            >
                {Object.entries(Application.TOKEN_TYPES).map(([key, value]) => (
                    <MenuItem key={value.displayName} value={key}>
                        {value.displayName}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                margin='normal'
                variant='outlined'
                fullWidth
                value={applicationRequest.description}
                label={intl.formatMessage({
                    defaultMessage: 'Application Description',
                    id: 'Shared.AppsAndKeys.ApplicationCreateForm.application.description.label',
                })}
                helperText={intl.formatMessage({
                    defaultMessage:
                        'Describe the application',
                    id: 'Shared.AppsAndKeys.ApplicationCreateForm.describe.the.application.help',
                })}
                name='description'
                onInput={handleChange}
                placeholder={intl.formatMessage({
                    defaultMessage: 'My Mobile Application',
                    id: 'Shared.AppsAndKeys.ApplicationCreateForm.my.mobile.application.placeholder',
                })}
            />

            <FormControlLabel
                control={(
                    <Checkbox
                        defaultChecked
                        color='primary'
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        id='regulatory'
                        name='regulatory'
                        onChange={handleAttributesChange('regulatory')}
                    />
                )}
                label={intl.formatMessage({
                    defaultMessage: 'Will this application handle regulatory compliance APIs?',
                    id: 'Shared.AppsAndKeys.ApplicationCreateForm.application.regulatory.compliance.label',
                })}
            />

            {isMCREnabled ? (
                <TextField
                    classes={{
                        root: classes.mandatoryStarText,
                    }}
                    id='SSA'
                    margin='normal'
                    variant='outlined'
                    fullWidth
                    multiline
                    required
                    rows={10}
                    rowsMax={Infinity}
                    value={applicationRequest.ssa}
                    label={(
                        <FormattedMessage
                            defaultMessage='Software Statement Assertion'
                            id='Shared.AppsAndKeys.ApplicationCreateForm.application.ssa.label'
                        />
                    )}
                    helperText={intl.formatMessage({
                        defaultMessage:
                                'The SSA given by OBIE',
                        id: 'Shared.AppsAndKeys.ApplicationCreateForm.ssa.help',
                    })}
                    name='ssa'
                    onChange={createPost}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'SSA value',
                        id: 'Shared.AppsAndKeys.ApplicationCreateForm.application.ssa.placeholder',
                    })}
                />
            ) : (
                ''
            )}

            {allAppAttributes && (
                Object.entries(allAppAttributes).map((item) => (
                    item[1].hidden !== 'true' ? (
                        <TextField
                            classes={{
                                root: classes.mandatoryStarText,
                            }}
                            margin='normal'
                            variant='outlined'
                            required={isRequiredAttribute(item[1].attribute)}
                            label={item[1].attribute}
                            value={this.state.getAttributeValue(item[1].attribute)}
                            helperText={item[1].description}
                            fullWidth
                            name={item[1].attribute}
                            onChange={handleAttributesChange(item[1].attribute)}
                            placeholder={'Enter ' + item[1].attribute}
                            className={classes.inputText}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...mcrInputProps}
                        />
                    ) : (null)))
            )}
            {isApplicationSharingEnabled && (
                <ChipInput
                    label={(
                        <FormattedMessage
                            defaultMessage='Application Groups'
                            id='Shared.AppsAndKeys.ApplicationCreateForm.add.groups.label'
                        />
                    )}
                    helperText={intl.formatMessage({
                        defaultMessage: 'Type a group and enter',
                        id: 'Shared.AppsAndKeys.ApplicationCreateForm.type.a.group.and.enter',
                    })}
                    margin='normal'
                    variant='outlined'
                    fullWidth
                    {...applicationRequest}
                    value={applicationRequest.groups || []}
                    onAdd={(chip) => handleAddChip(chip, applicationRequest.groups)}
                    onDelete={(chip, index) => handleDeleteChip(
                        chip,
                        index, applicationRequest.groups,
                    )}
                />
            )}
        </form>
    );
};
ApplicationCreate.defaultProps = {
    ApplicationCreate: null,
};
ApplicationCreate.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    applicationRequest: PropTypes.shape({}).isRequired,
    intl: PropTypes.shape({}).isRequired,
    isNameValid: PropTypes.bool.isRequired,
    allAppAttributes: PropTypes.arrayOf(PropTypes.array),
    handleAttributesChange: PropTypes.func.isRequired,
    getAttributeValue: PropTypes.func.isRequired,
    validateName: PropTypes.func.isRequired,
    updateApplicationRequest: PropTypes.func.isRequired,
    isRequiredAttribute: PropTypes.func.isRequired,
    isApplicationSharingEnabled: PropTypes.bool.isRequired,
    handleAddChip: PropTypes.func.isRequired,
    handleDeleteChip: PropTypes.func.isRequired,
    throttlingPolicyList: PropTypes.arrayOf(PropTypes.string).isRequired,
    allowedTokenTypes: PropTypes.shape({}).isRequired,
    checkTokenType: PropTypes.func.isRequired,
};

export default injectIntl(withStyles(styles)(ApplicationCreate));
