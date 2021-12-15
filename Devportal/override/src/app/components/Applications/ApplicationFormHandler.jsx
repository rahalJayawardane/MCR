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
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage, injectIntl } from 'react-intl';
import API from 'AppData/api';
import ApplicationCreateForm from 'AppComponents/Shared/AppsAndKeys/ApplicationCreateForm';
import Alert from 'AppComponents/Shared/Alert';
import Settings from 'AppComponents/Shared/SettingsContext';
import OBSettings from 'Settings';
import Application from 'AppData/Application';
import { Link } from 'react-router-dom';
import AuthManager from 'AppData/AuthManager';
import Progress from 'AppComponents/Shared/Progress';
import ApplicationCreateBase from './Create/ApplicationCreateBase';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

/**
 * Main style object
 *
 * @param {*} theme
 */
const styles = theme => ({
    button: {
        '& span': {
            color: theme.palette.getContrastText(theme.palette.primary.main),
        }
    },
});

/**
 * Check the application is exists
 * @param {*} appResponse
 * @param {*} applicationRequest - applicationRequest - get saved attributes from form
 */
async function isApplicationExists(applicationRequest) {
    let appId = null;
    let isExist = false;
    if (applicationRequest.attributes.software_id_production != null) {
        appId = applicationRequest.attributes.software_id_production;
    } else {
        appId = applicationRequest.attributes.software_id_sandbox;
    }
    const apimServerURL = OBSettings.openbanking.apim_url;
    const request = {
        softwareId: appId,
    };

    await axios.post(
        apimServerURL + '/api/openbanking/manual-client-registration/mcr/app/exists',
        request,
        {
            headers: {
                'content-type': 'application/json',
            },
        },
    )
        .then((response) => {
            if (response.data.isExists) {
                console.log('Application is already exists!');
                isExist = true;
            }
        })
        .catch(() => {
            console.log('Key generation and/or subscrption failed.');
            isExist = true;
        });
    return isExist;
}


/**
 *
 * @param {*} attributes
 * @returns
 */
function validateMCR(attributes) {
    let validForm = true;
    if (!OBSettings.openbanking.enableMCR) {
        return true;
    } else if (!attributes.software_id_production) {
        if (!attributes.software_id_sandbox || !attributes.org_id_sandbox || !attributes.software_roles_sandbox || !attributes.software_jwks_endpoint_sandbox) {
            validForm = false;
        }
    } else if (!attributes.software_id_production || !attributes.org_id_production || !attributes.software_roles_production || !attributes.software_jwks_endpoint_production) {
        validForm = false;
    }

    if (!validForm) {
        return false;
    } else {
        return true;
    }
};

/**
 * Component used to handle application creation
 * @class ApplicationFormHandler
 * @extends {React.Component}
 * @param {any} value @inheritDoc
 */
class ApplicationFormHandler extends React.Component {
    static contextType = Settings;

    /**
     * @param {*} props properties
     */
    constructor(props) {
        super(props);
        this.state = {
            applicationRequest: {
                name: '',
                throttlingPolicy: '',
                description: '',
                tokenType: 'JWT',
                groups: null,
                attributes: {},
            },
            isNameValid: true,
            throttlingPolicyList: [],
            allAppAttributes: null,
            isApplicationSharingEnabled: true,
            applicationOwner: '',
            allowedTokenTypes: {},
            oldAppTokenType: '',
        };
        this.handleAddChip = this.handleAddChip.bind(this);
        this.handleDeleteChip = this.handleDeleteChip.bind(this);
    }

    /**
     * Get all the throttling Policies from backend and
     * update the state
     * @memberof ApplicationFormHandler
     */
    componentDidMount() {
        const { match: { params } } = this.props;
        if (params.application_id) {
            this.initiApplicationEditState(params.application_id);
        } else {
            this.initApplicationCreateState();
        }
        this.isApplicationGroupSharingEnabled();
    }

    /**
     * @param {object} name application attribute name
     * @returns {Object} attribute value
     * @memberof ApplicationFormHandler
     */
    getAttributeValue = (name) => {
        const { applicationRequest } = this.state;
        return applicationRequest.attributes[name];
    };

    /**
     * Generate app keys and subscribe APIs
     * @param {*} appResponse
     * @param {*} applicationRequest - applicationRequest - get saved attributes from form
     */
     generateKeysAndSubscription = async (appResponse, applicationRequest) => {
         let appEnv = null;
         let appRoles = null;
         if (applicationRequest.attributes.software_id_production != null) {
             appEnv = 'PRODUCTION';
             appRoles = applicationRequest.attributes.software_roles_production;
         } else {
             appEnv = 'SANDBOX';
             appRoles = applicationRequest.attributes.software_roles_sandbox;
         }
         const apimServerURL = OBSettings.openbanking.apim_url;
         const request = {
             appId: appResponse.applicationId,
             env: appEnv,
             owner: appResponse.owner,
             redirectUri: applicationRequest.attributes.software_redirect_uris,
             roles: appRoles,
         };

         await axios.post(
             apimServerURL + '/api/openbanking/manual-client-registration/mcr/ssa/key/generate',
             request,
             {
                 headers: {
                     'content-type': 'application/json',
                 },
             },
         )
             .then(() => {
                 console.log('Key generation and subscrption added successfully.');
                 return true;
             })
             .catch(() => {
                 console.log('Key generation and/or subscrption failed.');
                 return false;
             });
     }

    /**
     * Initilaize the component if it is in applicatioin edit state
     * @param {String} applicationId application id
     * @memberof ApplicationFormHandler
     */
    initiApplicationEditState = (applicationId) => {
        const { applicationRequest } = this.state;
        const promisedApplication = Application.get(applicationId);
        // Get all the tires to populate the drop down.
        const api = new API();
        const promiseTiers = api.getAllTiers('application');
        const promisedAttributes = api.getAllApplicationAttributes();
        Promise.all([promisedApplication, promiseTiers, promisedAttributes])
            .then((response) => {
                const [application, tierResponse, allAttributes] = response;
                const throttlingPolicyList = tierResponse.body.list.map((item) => item.name);
                const allAppAttributes = allAttributes.body.list;
                const newRequest = { ...applicationRequest };
                const allowedTokenTypes = this.getAllowedTokenTypes(application.tokenType);
                newRequest.applicationId = application.applicationId;
                newRequest.name = application.name;
                newRequest.throttlingPolicy = application.throttlingPolicy;
                newRequest.description = application.description;
                newRequest.groups = application.groups;
                newRequest.tokenType = application.tokenType;
                newRequest.attributes = application.attributes;
                this.setState({
                    isEdit: true,
                    applicationRequest: newRequest,
                    throttlingPolicyList,
                    allAppAttributes,
                    applicationOwner: response[0].owner,
                    allowedTokenTypes: allowedTokenTypes,
                    oldAppTokenType: application.tokenType,
                });
            })
            .catch((error) => {
                console.log(error);
                const { status } = error;
                if (status === 404) {
                    // eslint-disable-next-line react/no-unused-state
                    this.setState({ notFound: true });
                }
            });
        this.isApplicationGroupSharingEnabled();
    }

    /**
     * Used to initialize the component state
     * @memberof ApplicationFormHandler
     */
    initApplicationCreateState = () => {
        const allowedTokenTypes = this.getAllowedTokenTypes();
        // Get all the tiers to populate the drop down.
        const api = new API();
        const promiseTiers = api.getAllTiers('application');
        const promisedAttributes = api.getAllApplicationAttributes();
        Promise.all([promiseTiers, promisedAttributes])
            .then((response) => {
                const [tierResponse, allAttributes] = response;
                const { applicationRequest } = this.state;
                const throttlingPolicyList = tierResponse.body.list.map((item) => item.name);
                const newRequest = { ...applicationRequest };
                if (throttlingPolicyList.length > 0) {
                    [newRequest.throttlingPolicy] = throttlingPolicyList;
                }
                if (allowedTokenTypes.JWT) {
                    // set the default selected token type to JWT if it is in the allowed token type map.
                    newRequest.tokenType = 'JWT';
                } else {
                    newRequest.tokenType = Object.keys(allowedTokenTypes)[0];
                }
                const allAppAttributes = [];
                allAttributes.body.list.map((item) => allAppAttributes.push(item));

                var regulatory = allAppAttributes[allAppAttributes.findIndex(x => x.attribute == 'regulatory')];
                regulatory.hidden = 'true';
                allAppAttributes[allAppAttributes.findIndex(x => x.attribute == 'regulatory')] = regulatory;
                if (allAttributes.length > 0) {
                    newRequest.attributes = allAppAttributes.filter((item) => !item.hidden);
                }
                this.setState({
                    applicationRequest: newRequest,
                    throttlingPolicyList,
                    allAppAttributes,
                    allowedTokenTypes: allowedTokenTypes,
                });
            })
            .catch((error) => {
                console.log(error);
                const { status } = error;
                if (status === 404) {
                    // eslint-disable-next-line react/no-unused-state
                    this.setState({ notFound: true });
                }
            });
    };

    /**
     * Returns the allowed token types map.
     * @returns {object}
     */
    getAllowedTokenTypes = (oldApplicationTokenType) => {
        const settingsContext = this.context;
        const allowedTokenTypesArray = settingsContext.settings.allowedAppTokenTypes;
        let allowedTokenTypesMap = {};
        // iterate through Application.TOKEN_TYPES map and populate the allowed types as a map
        if (allowedTokenTypesArray) {
            Object.entries(Application.TOKEN_TYPES).map(([key, value]) => (
                allowedTokenTypesArray.map((tokenType) => {
                    if (tokenType === key) {
                        allowedTokenTypesMap[key] = value;
                    }
                })
            ));

            if (oldApplicationTokenType) {
                /*
                 * In case when application token types are restricted, but before that an application is created
                 * with a restricted token type, we should show the restricted token type with the allowed token types
                 * for editing as the app is already created.
                 * */
                if (allowedTokenTypesArray
                    && !allowedTokenTypesArray.includes(oldApplicationTokenType)) {
                    let key = oldApplicationTokenType;
                    allowedTokenTypesMap[key] = (Application.TOKEN_TYPES)[key];
                }
            }
            return allowedTokenTypesMap;
        } else {
            return Application.TOKEN_TYPES;
        }
    };

    /**
     * Checks token type to complete the helper text for token type field.
     */
    checkTokenType = () => {
        const { classes } = this.props;
        const { applicationRequest, oldAppTokenType } = this.state;
        const allowedTokenTypes = this.getAllowedTokenTypes();
        const newAppTokenType = applicationRequest.tokenType;
        const settingsContext = this.context;
        const allowedTokenTypesArray = settingsContext.settings.allowedAppTokenTypes;

        /*
        * In case when application token types are restricted, but before that an application is created with a
        * restricted token type, and now the user tries to change the token type of the application. In this scenario,
        * we provide a warning message saying that you cannot go back to the old token type(now restricted) as it is
        * restricted.
        * */
        if (allowedTokenTypesArray && oldAppTokenType && !Object.keys(allowedTokenTypes).includes(oldAppTokenType)
            && oldAppTokenType !== newAppTokenType) {
            return (
                <span className={classes.warning}>
                    <FormattedMessage
                        defaultMessage='If you choose this token type, you will not be able to go back to your old
                         application token type'
                        id='Shared.AppsAndKeys.ApplicationCreateForm.select.token.type.warn'
                    />
                </span>
            );
        } else {
            return (
                <FormattedMessage
                    defaultMessage='Select token type'
                    id='Shared.AppsAndKeys.ApplicationCreateForm.select.token.type'
                />
            );
        }
    };

    /**
     * Update Application Request state
     * @param {Object} applicationRequest parameters requried for application
     */
    updateApplicationRequest = (applicationRequest) => {
        this.setState({ applicationRequest });
    }

    /**
     * @param {object} name application attribute name
     * @returns {void}
     * @memberof ApplicationFormHandler
     */
    handleAttributesChange = (name) => (event) => {
        if (name == 'regulatory') {
            const { applicationRequest } = this.state;
            applicationRequest.attributes[name] = event.target.checked;
            this.setState({ applicationRequest });
        } else {
            const { applicationRequest } = this.state;
            applicationRequest.attributes[name] = event.target.value;
            this.setState({ applicationRequest });
        }

    };

    /**
     * @param {object} name application attribute name
     * @returns {void}
     * @memberof ApplicationFormHandler
     */
    isRequiredAttribute = (name) => {
        const { allAppAttributes } = this.state;
        if (allAppAttributes) {
            for (let i = 0; i < allAppAttributes.length; i++) {
                if (allAppAttributes[i].attribute === name) {
                    return allAppAttributes[i].required === 'true';
                }
            }
        }
        return false;
    };

    /**
     * @param {object} attributes application attributes list
     * @returns {object}
     * @memberof EditApp
     */
    validateAttributes = (attributes) => {
        const { intl } = this.props;
        const { allAppAttributes } = this.state;
        let isValidAttribute = true;
        const attributeNameList = Object.keys(attributes);
        if (allAppAttributes.length > 0) {
            for (let i = 0; i < allAppAttributes.length; i++) {
                if (allAppAttributes[i].required === 'true' && allAppAttributes[i].hidden === 'false') {
                    if (attributeNameList.indexOf(allAppAttributes[i].attribute) === -1) {
                        isValidAttribute = false;
                    } else if (attributeNameList.indexOf(allAppAttributes[i].attribute) > -1
                    && (!attributes[allAppAttributes[i].attribute]
                        || attributes[allAppAttributes[i].attribute].trim() === '')) {
                        isValidAttribute = false;
                    }
                }
            }
        }
        if (!isValidAttribute) {
            return Promise.reject(new Error(intl.formatMessage({
                id: 'Applications.Edit.app.update.error.no.required.attribute',
                defaultMessage: 'Please fill all required application attributes',
            })));
        } else {
            return Promise.resolve(true);
        }
    };

    /**
     * Validate and send the application create
     * request to the backend
     * @memberof ApplicationFormHandler
     */
    saveApplication = async () => {
        const { applicationRequest } = this.state;
        const { intl, history } = this.props;
        if (applicationRequest.attributes.regulatory == null) {
            applicationRequest.attributes.regulatory = true;
        }

        if (!validateMCR(applicationRequest.attributes)) {
            Alert.error('Given SSA is not valid');
        } else {
            const isExist = await isApplicationExists(applicationRequest);
            if (isExist) {
                Alert.error('Software ID already exist!');
            } else {
                const api = new API();
                await Promise.all(this.validateName(applicationRequest.name)
                    .then(() => this.validateAttributes(applicationRequest.attributes))
                    .then(() => api.createApplication(applicationRequest))
                    .then((response) => {
                        if (response.body.status === 'CREATED') {
                            Alert.info(intl.formatMessage({
                                id: 'application.creation.pending',
                                defaultMessage: 'A request to register this application has been sent.',
                            }));
                            history.push('/applications');
                        } else {
                            console.log('Application created successfully.');
                            Alert.info(intl.formatMessage({
                                id: 'Applications.Create.ApplicationFormHandler.Application.created.successfully',
                                defaultMessage: 'Application created successfully.',
                            }));
                            const appId = response.body.applicationId;
                            // if MCR is enabled then generate keys and subscribe APIs
                            if (OBSettings.openbanking.enableMCR) {
                                this.generateKeysAndSubscription(response.body, applicationRequest);
                            }
                            history.push(`/applications/${appId}`);
                        }
                    })
                    .catch((error) => {
                        const { response } = error;
                        if (response && response.body) {
                            const message = response.body.description || intl.formatMessage({
                                defaultMessage: 'Error while creating the application',
                                id: 'Applications.Create.ApplicationFormHandler.error.while.creating.the.application',
                            });
                            Alert.error(message);
                        } else {
                            Alert.error(error.message);
                        }
                        console.error('Error while creating the application');
                    }));
            }
        }
    };

    /**
     *  Save edited application
     * @memberof EditApp
     */
    saveEdit = () => {
        const { applicationRequest } = this.state;
        const {
            history, intl,
        } = this.props;
        const api = new API();
        this.validateName(applicationRequest.name)
            .then(() => this.validateAttributes(applicationRequest.attributes))
            .then(() => api.updateApplication(applicationRequest, null))
            .then((response) => {
                const appId = response.body.applicationId;
                history.push(`/applications/${appId}`);
                Alert.info(intl.formatMessage({
                    id: 'Applications.ApplicationFormHandler.app.updated.success',
                    defaultMessage: 'Application updated successfully',
                }));
                console.log('Application updated successfully.');
            })
            .catch((error) => {
                const { response } = error;
                if (response && response.body) {
                    const message = response.body.description || 'Error while updating the application';
                    Alert.error(message);
                } else {
                    Alert.error(error.message);
                }
                console.error('Error while updating the application');
            });
    };

    validateName = (value) => {
        const { intl } = this.props;
        if (!value || value.trim() === '') {
            this.setState({ isNameValid: false });
            return Promise.reject(new Error(intl.formatMessage({
                id: 'Applications.Create.ApplicationFormHandler.app.name.required',
                defaultMessage: 'Application name is required',
            })));
        }
        this.setState({ isNameValid: true });
        return Promise.resolve(true);
    };

    /**
     * add a new group function
     * @param {*} chip newly added group
     * @param {*} appGroups already existing groups
     */
    handleAddChip = (chip, appGroups) => {
        const { applicationRequest } = this.state;
        const newRequest = { ...applicationRequest };
        let values = appGroups || [];
        values = values.slice();
        values.push(chip);
        newRequest.groups = values;
        this.setState({ applicationRequest: newRequest });
    }

    /**
     * remove a group from already existing groups function
     * @param {*} chip selected group to be removed
     * @param {*} index selected group index to be removed
     * @param {*} appGroups already existing groups
     */
    handleDeleteChip = (chip, index, appGroups) => {
        const { applicationRequest } = this.state;
        const newRequest = { ...applicationRequest };
        let values = appGroups || [];
        values = values.filter((v) => v !== chip);
        newRequest.groups = values;
        this.setState({ applicationRequest: newRequest });
    }

    /**
     * retrieve Settings from the context and check the application sharing enabled
     * @param {*} settingsData required data
     */
    isApplicationGroupSharingEnabled = () => {
        const settingsContext = this.context;
        const enabled = settingsContext.settings.applicationSharingEnabled;
        this.setState({ isApplicationSharingEnabled: enabled });
    }

    /**
     * @inheritdoc
     * @memberof ApplicationFormHandler
     */
    render() {
        const {
            throttlingPolicyList, applicationRequest, isNameValid, allAppAttributes, isApplicationSharingEnabled,
            isEdit, applicationOwner, allowedTokenTypes
        } = this.state;
        const { match: { params }, classes } = this.props;

        const CreatePageTitle = (
            <>
                <Typography variant='h5' component='h1'>
                    <FormattedMessage
                        id='Applications.Create.ApplicationFormHandler.create.application.heading'
                        defaultMessage='Create an application'
                    />
                </Typography>
                <Typography variant='caption'>
                    <FormattedMessage
                        id='Applications.Create.ApplicationFormHandler.create.application.sub.heading'
                        defaultMessage={
                            'Create an application providing name, quota and token type parameters.'
                            + ' Description is optional'
                        }
                    />
                </Typography>
            </>
        );
        const EditPageTitle = (
            <>
                <Typography variant='h5'>
                    <FormattedMessage
                        id='Applications.Create.ApplicationFormHandler.edit.application.heading'
                        defaultMessage='Edit application'
                    />
                </Typography>
                <Typography variant='caption'>
                    <FormattedMessage
                        id='Applications.Create.ApplicationFormHandler.edit.application.sub.heading'
                        defaultMessage={
                            'Edit this application. Name, quota and token type are mandatory parameters'
                            + ' and description is optional'
                        }
                    />
                </Typography>
            </>
        );
        return (
            params.application_id && applicationRequest.throttlingPolicy === ''
                ? <Progress />
                : (
                    <ApplicationCreateBase title={isEdit ? EditPageTitle : CreatePageTitle}>
                        <Box py={4} mb={2} display='flex' justifyContent='center'>
                            <Grid item xs={10} md={9}>
                                <ApplicationCreateForm
                                    throttlingPolicyList={throttlingPolicyList}
                                    applicationRequest={applicationRequest}
                                    updateApplicationRequest={this.updateApplicationRequest}
                                    validateName={this.validateName}
                                    isNameValid={isNameValid}
                                    allAppAttributes={allAppAttributes}
                                    handleAttributesChange={this.handleAttributesChange}
                                    isRequiredAttribute={this.isRequiredAttribute}
                                    getAttributeValue={this.getAttributeValue}
                                    isApplicationSharingEnabled={isApplicationSharingEnabled}
                                    handleDeleteChip={this.handleDeleteChip}
                                    handleAddChip={this.handleAddChip}
                                    allowedTokenTypes={allowedTokenTypes}
                                    checkTokenType={this.checkTokenType}
                                />

                                <Box display='flex' justifyContent='flex-start' mt={4} spacing={1}>
                                    <Box>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={isEdit ? this.saveEdit : this.saveApplication}
                                            disabled={isEdit && AuthManager.getUser().name !== applicationOwner}
                                            className={classes.button}
                                        >
                                            <FormattedMessage
                                                id='Applications.Create.ApplicationFormHandler.save'
                                                defaultMessage='SAVE'
                                            />
                                        </Button>
                                    </Box>
                                    <Box ml={1}>
                                        <Link to='/applications/'>
                                            <Button variant='text'>
                                                <FormattedMessage
                                                    id='Applications.Create.ApplicationFormHandler.cancel'
                                                    defaultMessage='CANCEL'
                                                />
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>
                            </Grid>
                        </Box>
                    </ApplicationCreateBase>
                )
        );
    }
}
ApplicationFormHandler.defaultProps = {
    match: {
        params: {
            application_id: null,
        },
    },
};
ApplicationFormHandler.propTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            application_id: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

export default injectIntl(withStyles(styles)(ApplicationFormHandler));
