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
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Icon from '@material-ui/core/Icon';
import { FormattedMessage, injectIntl } from 'react-intl';
import Loading from 'AppComponents/Base/Loading/Loading';
import CircularProgress from '@material-ui/core/CircularProgress';

import Alert from 'AppComponents/Shared/Alert';
import ProvideOAuthKeys from 'AppComponents/Shared/AppsAndKeys/ProvideOAuthKeys';
import Application from 'AppData/Application';
import AuthManager from 'AppData/AuthManager';
import Settings from 'AppComponents/Shared/SettingsContext';
import API from 'AppData/api';
import OBConfiguration from 'AppOverride/src/app/components/Shared/AppsAndKeys/OBConfiguration.jsx';
import { openbanking } from 'Settings';
import KeyConfiguration from './KeyConfiguration';

import ViewKeys from './ViewKeys';
import WaitingForApproval from './WaitingForApproval';
import { ScopeValidation, resourceMethods, resourcePaths } from '../ScopeValidation';
import TokenMangerSummary from './TokenManagerSummary';
import Progress from '../Progress';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(3),
        '& span, & h5, & label, & input': {
            color: theme.palette.getContrastText(theme.palette.background.paper),
        },
    },
    button: {
        marginLeft: 0,
        '& span': {
            color: theme.palette.getContrastText(theme.palette.primary.main),
        },
    },
    cleanUpButton: {
        marginLeft: 15,
    },
    cleanUpInfoText: {
        padding: '10px 0px 10px 15px',
    },
    tokenSection: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    margin: {
        marginRight: theme.spacing(2),
    },
    keyConfigWrapper: {
        flexDirection: 'column',
        marginBottom: 0,
    },
    generateWrapper: {
        padding: '10px 0px',
        marginLeft: theme.spacing(1.25),
    },
    paper: {
        background: 'none',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
});

/**
 *  @param {event} event event
 *  @param {String} value description
 */
class TokenManager extends React.Component {
    static contextType = Settings;

    /**
     *
     * @param {*} props props
     */
    constructor(props) {
        super(props);
        const { selectedApp, keyType } = this.props;
        this.state = {
            isLoading: false,
            keys: null,
            isKeyJWT: false,
            keyRequest: {
                keyType,
                serverSupportedGrantTypes: [],
                supportedGrantTypes: [],
                callbackUrl: '',
                validityTime: 3600,
            },
            providedConsumerKey: '',
            providedConsumerSecret: '',
            generateEnabled: true,
        };
        this.keyStates = {
            COMPLETED: 'COMPLETED',
            APPROVED: 'APPROVED',
            CREATED: 'CREATED',
            REJECTED: 'REJECTED',
        };
        if (selectedApp) {
            this.isRegulatoryApp = selectedApp.isRegulatory;
            this.appId = selectedApp.appId || selectedApp.value;
            this.application = Application.get(this.appId);
        }
        this.updateKeyRequest = this.updateKeyRequest.bind(this);
        this.generateKeys = this.generateKeys.bind(this);
        this.updateKeys = this.updateKeys.bind(this);
        this.cleanUpKeys = this.cleanUpKeys.bind(this);
        this.handleOnChangeProvidedOAuth = this.handleOnChangeProvidedOAuth.bind(this);
        this.provideOAuthKeySecret = this.provideOAuthKeySecret.bind(this);
    }

    /**
     *
     *
     * @memberof TokenManager
     */
    componentDidMount() {
        this.loadApplication();
    }

    setGenerateEnabled = (state) => {
        this.setState({ generateEnabled: state });
    }

    /**
     * get supported grant types from the settings api
     */
    getserverSupportedGrantTypes = () => {
        const api = new API();
        const promisedSettings = api.getSettings();
        promisedSettings
            .then((response) => {
                const { keyRequest } = this.state;
                const newKeyRequest = { ...keyRequest };

                const { selectedApp } = this.props;

                if (selectedApp.isRegulatory) {
                    newKeyRequest.serverSupportedGrantTypes = Object.keys(openbanking.grantTypes).filter((value) => response.obj.grantTypes.includes(value));
                    newKeyRequest.supportedGrantTypes = Object.keys(openbanking.grantTypes).filter((value) => response.obj.grantTypes.includes(value));
                } else {
                    newKeyRequest.serverSupportedGrantTypes = response.obj.grantTypes;
                    newKeyRequest.supportedGrantTypes = response.obj.grantTypes.filter((item) => item !== 'authorization_code'
                        && item !== 'implicit');
                }
                this.setState({ keyRequest: newKeyRequest });
            })
            .catch((error) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.log(error);
                }
                const { status } = error;
                if (status === 404) {
                    this.setState({ notFound: true });
                }
            });
    };

    /**
     * load application key generation ui
     */
    loadApplication = () => {
        this.getserverSupportedGrantTypes();
        if (this.appId) {
            this.application
                .then((application) => application.getKeys())
                .then((keys) => {
                    const { keyType } = this.props;
                    const { keyRequest } = this.state;
                    if (keys.size > 0 && keys.get(keyType)) {
                        const { callbackUrl, supportedGrantTypes } = keys.get(keyType);
                        const newRequest = {
                            ...keyRequest, callbackUrl, supportedGrantTypes,
                        };
                        this.setState({ keys, keyRequest: newRequest });
                    } else {
                        this.setState({ keys });
                    }
                })
                .catch((error) => {
                    if (process.env.NODE_ENV !== 'production') {
                        console.error(error);
                    }
                    if (error.status === 404) {
                        this.setState({ notFound: true });
                    }
                });
        }
    }

    /**
     * Update keyRequest state
     * @param {Object} keyRequest parameters requried for key generation request
     */
    updateKeyRequest(keyRequest) {
        this.setState({ keyRequest });
    }

    /**
     * Generate keys for application,
     *
     * @memberof KeyConfiguration
     */
    generateKeys() {
        const { keyRequest, keys } = this.state;
        this.setState({ isLoading: true });
        const {
            keyType, updateSubscriptionData, selectedApp: { tokenType, hashEnabled }, intl,
        } = this.props;
        this.application
            .then((application) => {
                let orgId = keyRequest.organizationId != null ? keyRequest.organizationId : null;
                let certContent = keyRequest.spCertificate != null ? btoa(keyRequest.spCertificate.trim()) : null;
                return application.generateKeys(
                    keyType, keyRequest.supportedGrantTypes,
                    keyRequest.callbackUrl, keyRequest.validityTime,
                    '{ \"orgId\": \"' + orgId + '\", \"spCert\": \"'
                    + certContent + '\" }',
                );
            })
            .then((response) => {
                if (updateSubscriptionData) {
                    updateSubscriptionData();
                }
                const newKeys = new Map([...keys]);
                // in case token hashing is enabled, isKeyJWT is set to true even if the token type is JWT.
                // This is to mimic the behavior of JWT tokens (by showing the token in a dialog)
                const isKeyJWT = (tokenType === 'JWT') || hashEnabled;
                newKeys.set(keyType, response);
                this.setState({ keys: newKeys, isKeyJWT });
                Alert.info(intl.formatMessage({
                    id: 'Shared.AppsAndKeys.TokenManager.key.generate.success',
                    defaultMessage: 'Application keys generated successfully',
                }));
            })
            .catch((error) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                const { status } = error;
                if (status === 404) {
                    this.setState({ notFound: true });
                }
                Alert.error(intl.formatMessage({
                    id: 'Shared.AppsAndKeys.TokenManager.key.generate.error',
                    defaultMessage: 'Error occurred when generating application keys',
                }));
            }).finally(() => this.setState({ isLoading: false }));
    }

    /**
     *
     * @memberof KeyConfiguration
     */
    updateKeys() {
        this.setState({ isLoading: true });
        const { keys, keyRequest } = this.state;
        const { keyType, intl } = this.props;
        const applicationKey = keys.get(keyType);
        this.application
            .then((application) => {
                return application.updateKeys(
                    applicationKey.tokenType,
                    keyType,
                    keyRequest.supportedGrantTypes,
                    keyRequest.callbackUrl,
                    applicationKey.consumerKey,
                    applicationKey.consumerSecret,
                );
            })
            .then((response) => {
                this.setState({ keys: response.keys });
                Alert.info(intl.formatMessage({
                    id: 'Shared.AppsAndKeys.TokenManager.key.update.success',
                    defaultMessage: 'Application keys updated successfully',
                }));
            })
            .catch((error) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                const { status } = error;
                if (status === 404) {
                    this.setState({ notFound: true });
                }
                Alert.error(intl.formatMessage({
                    id: 'Shared.AppsAndKeys.TokenManager.key.update.error',
                    defaultMessage: 'Error occurred when updating application keys',
                }));
            }).finally(() => this.setState({ isLoading: false }));
    }

    /**
     * Cleanup application keys
     */
    cleanUpKeys() {
        const { keyType, intl } = this.props;
        this.application
            .then((application) => {
                return application.cleanUpKeys(keyType);
            })
            .then(() => {
                this.loadApplication();
                Alert.info(intl.formatMessage({
                    id: 'Shared.AppsAndKeys.TokenManager.key.cleanup.success',
                    defaultMessage: 'Application keys cleaned successfully',
                }));
            })
            .catch((error) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                const { status } = error;
                if (status === 404) {
                    this.setState({ notFound: true });
                }
                Alert.error(intl.formatMessage({
                    id: 'Shared.AppsAndKeys.TokenManager.key.cleanup.error',
                    defaultMessage: 'Error occurred while cleaning up application keys',
                }));
            });
    }

    /**
     * Handle on change of provided consumer key and consumer secret
     *
     * @param event onChange event
     */
    handleOnChangeProvidedOAuth(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
     * Provide consumer key and secret of an existing OAuth app to an application
     */
    provideOAuthKeySecret() {
        const { providedConsumerKey, providedConsumerSecret } = this.state;
        const { keyType, intl } = this.props;

        this.application
            .then((application) => {
                return application.provideKeys(keyType, providedConsumerKey, providedConsumerSecret);
            })
            .then(() => {
                this.setState({ providedConsumerKey: '', providedConsumerSecret: '' });
                Alert.info(intl.formatMessage({
                    id: 'Shared.AppsAndKeys.TokenManager.key.provide.success',
                    defaultMessage: 'Application keys provided successfully',
                }));
            })
            .catch((error) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                const { status } = error;
                if (status === 404) {
                    this.setState({ notFound: true });
                }
                Alert.error(intl.formatMessage({
                    id: 'Shared.AppsAndKeys.TokenManager.key.provide.error',
                    defaultMessage: 'Error occurred when providing application keys',
                }));
            });
    }

    getOrgIDEnabled() {
        if (openbanking.spec.toLowerCase() === 'uk') {
            return false;
        } else {
            return openbanking.spec.toLowerCase() === 'berlin';
        }
    }


    /**
     *  @returns {Component}
     * @memberof Tokenemanager
     */
    render() {
        const {
            classes, selectedApp, keyType, summary,
        } = this.props;
        const {
            keys, keyRequest, isLoading, isKeyJWT, providedConsumerKey,
            providedConsumerSecret, generateEnabled,
        } = this.state;
        if (!keys) {
            return <Loading />;
        }
        const username = AuthManager.getUser().name;
        let isUserOwner = false;

        if (selectedApp.owner && username.toLowerCase() === selectedApp.owner.toLowerCase()) {
            isUserOwner = true;
        }
        const key = keys.get(keyType);
        if (key && key.token) {
            keyRequest.validityTime = key.token.validityTime;
        }
        if (summary) {
            if (keys) {
                return (
                    <TokenMangerSummary
                        keys={keys}
                        key={key}
                        keyStates={this.keyStates}
                        selectedApp={selectedApp}
                        keyType={keyType}
                        isKeyJWT={isKeyJWT}
                        isUserOwner={isUserOwner}
                    />
                );
            } else {
                return (<Progress />);
            }
        }
        if (keys.size > 0 && key && key.keyState === 'APPROVED' && !key.consumerKey) {
            return (
                <>
                    <Typography className={classes.cleanUpInfoText} variant='subtitle1'>
                        <FormattedMessage
                            id='Shared.AppsAndKeys.TokenManager.cleanup.text'
                            defaultMessage='Error! You have partially-created keys.
                            Please click `Clean Up` button and try again.'
                        />
                    </Typography>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.cleanUpButton}
                        onClick={this.cleanUpKeys}
                    >
                        <FormattedMessage
                            defaultMessage='Clean up'
                            id='Shared.AppsAndKeys.TokenManager.cleanup'
                        />
                    </Button>
                </>
            );
        }
        if (key && (key.keyState === this.keyStates.CREATED || key.keyState === this.keyStates.REJECTED)) {
            return <WaitingForApproval keyState={key.keyState} states={this.keyStates} />;
        }
        // todo replace use of localStorage with useContext
        // const settingsData = localStorage.getItem('settings');
        // const { mapExistingAuthApps } = JSON.parse(settingsData);
        const keyGrantTypes = key ? key.supportedGrantTypes : [];
        const settingsContext = this.context;
        const { mapExistingAuthApps } = settingsContext.settings;
        const isOrgIdEnabled = this.getOrgIDEnabled();
        const isRegulatory = this.isRegulatoryApp;
        return (
            <div className={classes.root}>
                <Typography variant='h5'>
                    {keyType === 'PRODUCTION' ? 'Production ' : 'Sandbox '}
                    <FormattedMessage
                        defaultMessage='Key and Secret'
                        id='Shared.AppsAndKeys.TokenManager.key.and.secret'
                    />
                </Typography>
                <ViewKeys
                    selectedApp={selectedApp}
                    keyType={keyType}
                    keys={keys}
                    isKeyJWT={isKeyJWT}
                    selectedGrantTypes={keyGrantTypes}
                    isUserOwner={isUserOwner}
                    isRegulatoryApp={isRegulatory}
                />
                <Paper className={classes.paper}>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                            <Typography className={classes.heading} variant='subtitle1'>
                                {
                                    keys.size > 0 && keys.get(keyType)
                                        ? (
                                            <FormattedMessage
                                                defaultMessage='Key Configurations'
                                                id='Shared.AppsAndKeys.TokenManager.update.configuration'
                                            />
                                        )
                                        : (
                                            <FormattedMessage
                                                defaultMessage='Key Configuration'
                                                id='Shared.AppsAndKeys.TokenManager.key.configuration'
                                            />
                                        )
                                }
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.keyConfigWrapper}>
                            <KeyConfiguration
                                keys={keys}
                                selectedApp={selectedApp}
                                keyType={keyType}
                                updateKeyRequest={this.updateKeyRequest}
                                keyRequest={keyRequest}
                                isUserOwner={isUserOwner}
                                isKeysAvailable={keys.size > 0 && keys.get(keyType)}
                                setGenerateEnabled={this.setGenerateEnabled}
                                isRegulatoryApp={isRegulatory}
                            />
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails className={classes.keyConfigWrapper}>
                            <OBConfiguration
                                selectedApp={selectedApp}
                                keyType={keyType}
                                updateKeyRequest={this.updateKeyRequest}
                                keyRequest={keyRequest}
                                isOrgIdEnabled={isOrgIdEnabled}
                                setGenerateEnabled={this.setGenerateEnabled}
                                isRegulatoryApp={isRegulatory}
                                keys={keys.size > 0 && keys.get(keyType) ? keys.get(keyType).additionalProperties : null}
                                hasKeysGenerated={keys.size > 0 && keys.get(keyType)}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <div className={classes.generateWrapper}>
                        <ScopeValidation
                            resourcePath={resourcePaths.APPLICATION_GENERATE_KEYS}
                            resourceMethod={resourceMethods.POST}
                        >
                            {!isUserOwner ? (
                                <>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        className={classes.button}
                                        onClick={
                                            keys.size > 0 && keys.get(keyType) ? this.updateKeys : this.generateKeys
                                        }
                                        disabled={!isUserOwner || isLoading}
                                    >
                                        {keys.size > 0 && keys.get(keyType) ? 'Update keys' : 'Generate Keys'}
                                        {isLoading && <CircularProgress size={20} />}
                                    </Button>
                                    <Typography variant='caption'>
                                        <FormattedMessage
                                            defaultMessage='Only owner can generate or update keys'
                                            id='Shared.AppsAndKeys.TokenManager.key.and.user.owner'
                                        />
                                    </Typography>
                                </>
                            ) : (
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className={classes.button}
                                    onClick={keys.size > 0 && keys.get(keyType) ? this.updateKeys : this.generateKeys}
                                    disabled={!generateEnabled || isLoading}
                                >
                                    {keys.size > 0 && keys.get(keyType) ? 'Update' : 'Generate Keys'}
                                    {isLoading && <CircularProgress size={20} />}
                                </Button>
                            )}
                        </ScopeValidation>
                    </div>
                </Paper>
                {
                    mapExistingAuthApps && !keys.get(keyType) && (
                        <Paper className={classes.paper}>
                            <ExpansionPanel defaultExpanded>
                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <Typography className={classes.heading} variant='subtitle1'>
                                        <FormattedMessage
                                            defaultMessage='Provide Existing OAuth Keys'
                                            id='Shared.AppsAndKeys.TokenManager.provide.oauth'
                                        />
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.keyConfigWrapper}>
                                    <ProvideOAuthKeys
                                        onChange={this.handleOnChangeProvidedOAuth}
                                        consumerKey={providedConsumerKey}
                                        consumerSecret={providedConsumerSecret}
                                        isUserOwner={isUserOwner}
                                    />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <div className={classes.generateWrapper}>
                                <ScopeValidation
                                    resourcePath={resourcePaths.APPLICATION_GENERATE_KEYS}
                                    resourceMethod={resourceMethods.POST}
                                >
                                    {!isUserOwner ? (
                                        <>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                className={classes.button}
                                                onClick={this.provideOAuthKeySecret}
                                                disabled={!isUserOwner}
                                            >
                                                {
                                                    keys.size > 0 && keys.get(keyType)
                                                        ? (
                                                            <FormattedMessage
                                                                defaultMessage='Update'
                                                                id='Shared.AppsAndKeys.TokenManager.provide.
                                                                oauth.button.update'
                                                            />
                                                        )
                                                        : (
                                                            <FormattedMessage
                                                                defaultMessage='Provide'
                                                                id='Shared.AppsAndKeys.TokenManager.
                                                                provide.oauth.button.provide'
                                                            />
                                                        )
                                                }
                                            </Button>
                                            <Typography variant='caption'>
                                                <FormattedMessage
                                                    defaultMessage='Only owner can provide keys'
                                                    id='Shared.AppsAndKeys.TokenManager.key.provide.user.owner'
                                                />
                                            </Typography>
                                        </>
                                    ) : (
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            className={classes.button}
                                            onClick={this.provideOAuthKeySecret}
                                        >
                                            {
                                                keys.size > 0 && keys.get(keyType)
                                                    ? (
                                                        <FormattedMessage
                                                            defaultMessage='Update'
                                                            id='Shared.AppsAndKeys.TokenManager.
                                                            provide.oauth.button.update'
                                                        />
                                                    )
                                                    : (
                                                        <FormattedMessage
                                                            defaultMessage='Provide'
                                                            id='Shared.AppsAndKeys.
                                                            TokenManager.provide.oauth.button.provide'
                                                        />
                                                    )
                                            }
                                        </Button>
                                    )}
                                </ScopeValidation>
                            </div>
                        </Paper>
                    )
                }
            </div>
        );
    }
}
TokenManager.defaultProps = {
    updateSubscriptionData: () => {},
    summary: false,
};
TokenManager.propTypes = {
    classes: PropTypes.instanceOf(Object).isRequired,
    selectedApp: PropTypes.shape({
        tokenType: PropTypes.string.isRequired,
        appId: PropTypes.string,
        value: PropTypes.string,
        owner: PropTypes.string,
        hashEnabled: PropTypes.bool,
    }).isRequired,
    keyType: PropTypes.string.isRequired,
    updateSubscriptionData: PropTypes.func,
    intl: PropTypes.shape({ formatMessage: PropTypes.func }).isRequired,
    summary: PropTypes.bool,
};

export default injectIntl(withStyles(styles)(TokenManager));
