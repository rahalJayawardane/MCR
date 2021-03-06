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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Route, Switch, Redirect, Link,
} from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import API from 'AppData/api';
import { app } from 'Settings';
import Loading from 'AppComponents/Base/Loading/Loading';
import ResourceNotFound from 'AppComponents/Base/Errors/ResourceNotFound';
import CustomIcon from 'AppComponents/Shared/CustomIcon';
import LeftMenuItem from 'AppComponents/Shared/LeftMenuItem';
import TokenManager from 'AppComponents/Shared/AppsAndKeys/TokenManager';
import ApiKeyManager from 'AppComponents/Shared/AppsAndKeys/ApiKeyManager';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet';
import OBSettings from 'Settings';
import Subscriptions from './Subscriptions';
import InfoBar from './InfoBar';
import Overview from './Overview';


const isMCR = OBSettings.openbanking.enableMCR;
let prodApp = false;

/**
 *
 *
 * @param {*} theme theme details
 * @returns {Object}
 */
const styles = (theme) => {
    const {
        custom: {
            leftMenu: { width, position },
        },
    } = theme;
    const shiftToLeft = position === 'vertical-left' ? width : 0;
    const shiftToRight = position === 'vertical-right' ? width : 0;
    const leftMenuPaddingLeft = position === 'horizontal' ? theme.spacing(3) : 0;

    return {
        LeftMenu: {
            backgroundColor: theme.custom.leftMenu.background,
            backgroundImage: `url(${app.context}${theme.custom.leftMenu.backgroundImage})`,
            textAlign: 'left',
            fontFamily: theme.typography.fontFamily,
            position: 'absolute',
            bottom: 0,
            paddingLeft: leftMenuPaddingLeft,
        },
        leftMenuHorizontal: {
            top: theme.custom.infoBar.height,
            width: '100%',
            overflowX: 'auto',
            height: 60,
            display: 'flex',
            left: 0,
        },
        leftMenuVerticalLeft: {
            width: theme.custom.leftMenu.width,
            top: 0,
            left: 0,
            overflowY: 'auto',
        },
        leftMenuVerticalRight: {
            width: theme.custom.leftMenu.width,
            top: 0,
            right: 0,
            overflowY: 'auto',
        },
        leftLInkMain: {
            borderRight: 'solid 1px ' + theme.custom.leftMenu.background,
            cursor: 'pointer',
            background: theme.custom.leftMenu.rootBackground,
            color: theme.palette.getContrastText(theme.custom.leftMenu.rootBackground),
            textDecoration: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            height: theme.custom.infoBar.height,
            textDecoration: 'none',
        },
        leftLInkMainText: {
            fontSize: 18,
            color: theme.palette.grey[500],
            textDecoration: 'none',
            paddingLeft: theme.spacing(2),
        },
        detailsContent: {
            display: 'flex',
            flex: 1,
        },
        content: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            marginLeft: shiftToLeft,
            marginRight: shiftToRight,
            paddingBottom: theme.spacing(3),
        },
        contentLoader: {
            paddingTop: theme.spacing(3),
        },
        contentLoaderRightMenu: {
            paddingRight: theme.custom.leftMenu.width,
        },
    };
};
/**
 *
 *
 * @class Details
 * @extends {Component}
 */
class Details extends Component {
    /**
     *
     * @param {Object} props props passed from above
     */
    constructor(props) {
        super(props);
        this.state = {
            application: null,
            active: 'overview',
        };
    }

    /**
     *
     *
     * @memberof Details
     */
    componentDidMount() {
        const { match } = this.props;
        const client = new API();
        const promisedApplication = client.getApplication(match.params.application_uuid);
        promisedApplication
            .then((response) => {
                this.setState({ application: response.obj });
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
    }

    /**
     *
     * @param {String} menuLink selected menu name
     * @memberof Details
     */
    handleMenuSelect = (menuLink) => {
        const { history, match } = this.props;
        history.push({ pathname: '/applications/' + match.params.application_uuid + '/' + menuLink });
        this.setState({ active: menuLink });
    };

    renderManager = (application, keyType, secScheme) => {
        return (
            <Paper>
                {secScheme === 'oauth' && (
                    <div>
                        <TokenManager
                            keyType={keyType}
                            selectedApp={{
                                appId: application.applicationId,
                                label: application.name,
                                tokenType: application.tokenType,
                                owner: application.owner,
                                hashEnabled: application.hashEnabled,
                                isRegulatory:(application.attributes.regulatory === 'true'),
                            }}
                        />
                    </div>
                )}
                {secScheme === 'apikey' && (
                    <div>
                        <ApiKeyManager
                            keyType={keyType}
                            selectedApp={{
                                appId: application.applicationId,
                                label: application.name,
                                tokenType: application.tokenType,
                                owner: application.owner,
                            }}
                        />
                    </div>
                )}
            </Paper>
        );
    }

    /**
     *
     *
     * @returns {Component}
     * @memberof Details
     */
    render() {
        const { classes, match, theme } = this.props;
        const { notFound, application } = this.state;
        const pathPrefix = '/applications/' + match.params.application_uuid;
        const redirectUrl = pathPrefix + '/overview';
        const {
            custom: {
                leftMenu: {
                    rootIconSize, rootIconTextVisible, rootIconVisible, position,
                },
                title: {
                    prefix, sufix,
                },
            },
        } = theme;
        if (notFound) {
            return <ResourceNotFound />;
        } else if (!application) {
            return <Loading />;
        }
        if (isMCR && !application.attributes.software_id_sandbox) {
            prodApp = true;
        }
        return (
            <>
                <Helmet>
                    <title>{`${prefix} ${application.name}${sufix}`}</title>
                </Helmet>
                <div
                    className={classNames(
                        classes.LeftMenu,
                        {
                            [classes.leftMenuHorizontal]: position === 'horizontal',
                        },
                        {
                            [classes.leftMenuVerticalLeft]: position === 'vertical-left',
                        },
                        {
                            [classes.leftMenuVerticalRight]: position === 'vertical-right',
                        },
                        'left-menu',
                    )}
                >
                    {rootIconVisible && (
                        <Link to='/applications' className={classes.leftLInkMain} aria-label='All applications'>
                            <CustomIcon width={rootIconSize} height={rootIconSize} icon='applications' />
                            {rootIconTextVisible && (
                                <Typography className={classes.leftLInkMainText}>
                                    <FormattedMessage id='Applications.Details.applications.all' defaultMessage='ALL APPs' />
                                </Typography>
                            )}
                        </Link>
                    )}
                    <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.overview' defaultMessage='Overview' />} iconText='overview' route='overview' to={pathPrefix + '/overview'} />
                    {(isMCR && prodApp) && (
                        <div>
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.prod.keys' defaultMessage='Production Keys' />} iconText='productionkeys' route='productionkeys' to={pathPrefix + '/productionkeys/oauth'} />
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.oauth.tokens' defaultMessage='OAuth2 Tokens' />} route='productionkeys/oauth' to={pathPrefix + '/productionkeys/oauth'} submenu />
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.api.key' defaultMessage='Api Key' />} route='productionkeys/apikey' to={pathPrefix + '/productionkeys/apikey'} submenu />
                        </div>
                    )}
                    {(isMCR && !prodApp) && (
                        <div>
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.sandbox.keys' defaultMessage='Sandbox Keys' />} iconText='productionkeys' route='sandboxkeys' to={pathPrefix + '/sandboxkeys/oauth'} />
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.oauth.tokens' defaultMessage='OAuth2 Tokens' />} route='sandboxkeys/oauth' to={pathPrefix + '/sandboxkeys/oauth'} submenu />
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.api.key' defaultMessage='Api Key' />} route='sandboxkeys/apikey' to={pathPrefix + '/sandboxkeys/apikey'} submenu />
                        </div>
                    )}
                    {!isMCR && (
                        <div>
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.prod.keys' defaultMessage='Production Keys' />} iconText='productionkeys' route='productionkeys' to={pathPrefix + '/productionkeys/oauth'} />
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.oauth.tokens' defaultMessage='OAuth2 Tokens' />} route='productionkeys/oauth' to={pathPrefix + '/productionkeys/oauth'} submenu />
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.api.key' defaultMessage='Api Key' />} route='productionkeys/apikey' to={pathPrefix + '/productionkeys/apikey'} submenu />
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.sandbox.keys' defaultMessage='Sandbox Keys' />} iconText='productionkeys' route='sandboxkeys' to={pathPrefix + '/sandboxkeys/oauth'} />
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.oauth.tokens' defaultMessage='OAuth2 Tokens' />} route='sandboxkeys/oauth' to={pathPrefix + '/sandboxkeys/oauth'} submenu />
                            <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.api.key' defaultMessage='Api Key' />} route='sandboxkeys/apikey' to={pathPrefix + '/sandboxkeys/apikey'} submenu />
                        </div>
                    )}
                    <LeftMenuItem text={<FormattedMessage id='Applications.Details.menu.subscriptions' defaultMessage='Subscriptions' />} iconText='subscriptions' route='subscriptions' to={pathPrefix + '/subscriptions'} />
                </div>
                <div className={classes.content}>
                    <InfoBar applicationId={match.params.application_uuid} innerRef={node => (this.infoBar = node)} />
                    <div
                        className={classNames(
                            { [classes.contentLoader]: position === 'horizontal' },
                            { [classes.contentLoaderRightMenu]: position === 'vertical-right' },
                        )}
                    >
                        <Switch>
                            <Redirect exact from='/applications/:applicationId' to={redirectUrl} />
                            <Route
                                path='/applications/:applicationId/overview'
                                component={Overview}
                            />
                            <Route
                                path='/applications/:applicationId/productionkeys/oauth'
                                component={() => (this.renderManager(application, 'PRODUCTION', 'oauth'))}
                            />
                            <Route
                                path='/applications/:applicationId/productionkeys/apikey'
                                component={() => (this.renderManager(application, 'PRODUCTION', 'apikey'))}
                            />
                            <Route
                                path='/applications/:applicationId/sandboxkeys/oauth'
                                component={() => (this.renderManager(application, 'SANDBOX', 'oauth'))}
                            />
                            <Route
                                path='/applications/:applicationId/sandboxkeys/apikey'
                                component={() => (this.renderManager(application, 'SANDBOX', 'apikey'))}
                            />
                            <Route path='/applications/:applicationId/subscriptions' component={Subscriptions} />
                            <Route component={ResourceNotFound} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

Details.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    theme: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            application_uuid: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withStyles(styles, { withTheme: true })(Details);