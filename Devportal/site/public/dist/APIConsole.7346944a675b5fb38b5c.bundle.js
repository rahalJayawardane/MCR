(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1470:function(e,t,a){"use strict";var n=a(1),s=a.n(n),i=a(181),l=a(1613),r=a(1553),c=a(1521),o=a(1539),p=a(1182);t.a=Object(p.a)(e=>({menuItem:{color:e.palette.getContrastText(e.palette.background.paper)}}))(e=>{const{subscriptions:t,handleChanges:a,selectedApplication:n,selectedKeyType:p,classes:d,selectedTokenType:u}=e;return s.a.createElement(s.a.Fragment,null,s.a.createElement(c.a,{display:"flex",justifyContent:"center"},s.a.createElement(l.a,{xs:12,md:3},s.a.createElement(c.a,null,s.a.createElement(o.a,{fullWidth:!0,id:"outlined-select-currency",select:!0,label:s.a.createElement(i.a,{defaultMessage:"Appplications",id:"Apis.Details.ApiConsole.SelectAppPanel.applications"}),value:n,name:"selectedApplication",onChange:a,SelectProps:t,helperText:s.a.createElement(i.a,{defaultMessage:"Please select an application",id:"Apis.Details.ApiConsole.SelectAppPanel.select.an.application"}),margin:"normal",variant:"outlined"},t.map(e=>s.a.createElement(r.a,{value:e.applicationInfo.applicationId,key:e.applicationInfo.applicationId,className:d.menuItem},e.applicationInfo.name))))),s.a.createElement(l.a,{xs:12,md:3},"JWT"!==u&&s.a.createElement(c.a,{ml:2},s.a.createElement(o.a,{fullWidth:!0,id:"outlined-select-currency",select:!0,label:s.a.createElement(i.a,{defaultMessage:"Key Type",id:"Apis.Details.ApiConsole.SelectAppPanel.key.type"}),value:p,name:"selectedKeyType",onChange:a,helperText:s.a.createElement(i.a,{defaultMessage:"Please select a key type",id:"Apis.Details.ApiConsole.SelectAppPanel.select.key.type"}),margin:"normal",variant:"outlined"},null!=t&&"UNBLOCKED"===t.find(e=>e.applicationId===n).status&&s.a.createElement(r.a,{value:"PRODUCTION",className:d.menuItem},s.a.createElement(i.a,{id:"Apis.Details.ApiConsole.SelectAppPanel.production",defaultMessage:"PRODUCTION"})),s.a.createElement(r.a,{value:"SANDBOX",className:d.menuItem},s.a.createElement(i.a,{id:"Apis.Details.ApiConsole.SelectAppPanel.sandbox",defaultMessage:"SANDBOX"})))))))})},2050:function(e,t){},2052:function(e,t){},2264:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),i=a(181),l=a(1613),r=a(1528),c=a(17),o=a.n(c),p=a(1539),d=a(1541),u=a(1636),m=a(1604),g=a(1716),h=a(1182),y=a(1561),E=a(1527),b=a(1590),T=a(22),k=a(1549),A=a(1553),f=a(1597),C=a(1455),S=a.n(C),v=a(1521),w=a(1199),I=a(135),P=a(257),O=(a(1886),a(1888)),N=a.n(O);const D=function(){return{wrapComponents:{info:()=>()=>null,authorizeBtn:()=>()=>null}}},x=e=>{const{spec:t,accessTokenProvider:a,authorizationHeader:n,api:i,securitySchemeType:l}=e,r={spec:t,validatorUrl:null,defaultModelsExpandDepth:-1,docExpansion:"list",requestInterceptor:e=>{const{url:t}=e,{context:s}=i,r=`${s}/*`;if(e.headers[n]="apikey"===n?a():"BASIC"===l?"Basic "+a():"Bearer "+a(),t.endsWith(r))e.url=t.substring(0,t.length-2);else if(t.includes(r+"?")){const a=t.split("/*?");e.url=a.length>1?a[0]+"?"+a[1]:a[0]}return e},defaultModelExpandDepth:-1,plugins:[D]};return s.a.createElement(N.a,r)};x.propTypes={accessTokenProvider:o.a.func.isRequired,authorizationHeader:o.a.string.isRequired,api:o.a.shape({context:o.a.string.isRequired}).isRequired,spec:o.a.string.isRequired};var B=x,j=a(1220),R=a(1470);function M(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function K(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class U extends s.a.Component{constructor(e){super(e),this.state={showToken:!1,securitySchemeType:"OAUTH",username:"",password:""},this.handleChanges=this.handleChanges.bind(this),this.accessTokenProvider=this.accessTokenProvider.bind(this),this.handleClickShowToken=this.handleClickShowToken.bind(this),this.updateSwagger=this.updateSwagger.bind(this),this.updateAccessToken=this.updateAccessToken.bind(this),this.updateApplication=this.updateApplication.bind(this)}componentDidMount(){const{api:e}=this.context,t=e.id,a=T.a.getUser();let n,s,i,l,r,c,o,p,d,u="PRODUCTION";this.apiClient=new P.a,this.apiClient.getAPIById(t).then(e=>((n=e.obj).endpointURLs&&(s=n.endpointURLs.map(e=>e.environmentName)),n.labels&&(i=n.labels.map(e=>e.name)),s&&s.length>0?([l]=s,this.apiClient.getSwaggerByAPIIdAndEnvironment(t,l)):i&&i.length>0?([l]=i,this.apiClient.getSwaggerByAPIIdAndLabel(t,l)):this.apiClient.getSwaggerByAPIId(t))).then(e=>(r=e.obj,null!=a?this.apiClient.getSubscriptions(t):null)).then(e=>{if(null!=e)if((c=e.obj.list.filter(e=>"UNBLOCKED"===e.status||"PROD_ONLY_BLOCKED"===e.status))&&c.length>0){o=c[0].applicationId,j.a.get(o).then(e=>(d=e.tokenType,e.getKeys())).then(e=>{e.get("SANDBOX")?(u="SANDBOX",({accessToken:p}=e.get("SANDBOX").token)):e.get("PRODUCTION")&&(u="PRODUCTION",({accessToken:p}=e.get("PRODUCTION").token)),this.setState({api:n,swagger:r,subscriptions:c,environments:s,labels:i,selectedEnvironment:l,selectedApplication:o,keys:e,selectedKeyType:u,accessToken:p,selectedTokenType:d})})}else this.setState({api:n,swagger:r,subscriptions:c,environments:s,labels:i,selectedEnvironment:l,selectedApplication:o,keys:void 0,selectedKeyType:u,accessToken:p,selectedTokenType:d});else this.setState({api:n,swagger:r,subscriptions:c,environments:s,labels:i,selectedEnvironment:l,selectedApplication:o,keys:void 0,selectedKeyType:u,accessToken:p,selectedTokenType:d})}).catch(e=>{this.setState({serverError:`${e.statusCode} - ${e.response.body.description}`})})}handleClickShowToken(){const{showToken:e}=this.state;this.setState({showToken:!e})}accessTokenProvider(){const{accessToken:e,securitySchemeType:t,username:a,password:n}=this.state;if("BASIC"===t){return btoa(a+":"+n)}return e}handleChanges(e){const{target:t}=e,{name:a,value:n}=t;switch(a){case"selectedEnvironment":this.setState({[a]:n},this.updateSwagger);break;case"selectedApplication":this.setState({[a]:n},this.updateApplication);break;case"selectedKeyType":this.setState({[a]:n},this.updateAccessToken);break;case"securityScheme":this.setState({securitySchemeType:n});break;case"username":this.setState({username:n});break;case"password":this.setState({password:n});break;default:this.setState({[a]:n})}}updateSwagger(){const{selectedEnvironment:e,api:t,environments:a}=this.state;let n;(n=e?a.includes(e)?this.apiClient.getSwaggerByAPIIdAndEnvironment(t.id,e):this.apiClient.getSwaggerByAPIIdAndLabel(t.id,e):this.apiClient.getSwaggerByAPIId(t.id)).then(e=>{this.setState({swagger:e.obj})})}updateAccessToken(){const{keys:e,selectedKeyType:t}=this.state;let a;e.get(t)&&({accessToken:a}=e.get(t).token),this.setState({accessToken:a})}updateApplication(){const{selectedApplication:e,selectedKeyType:t,subscriptions:a}=this.state,n=j.a.get(e);let s,i;null!=a&&"PROD_ONLY_BLOCKED"===a.find(t=>t.applicationId===e).status?(this.setState({selectedKeyType:"SANDBOX"}),i="SANDBOX"):i=t,n.then(e=>(this.setState({selectedTokenType:e.tokenType}),e.getKeys())).then(e=>{e.get(i)&&({accessToken:s}=e.get(i).token),this.setState({accessToken:s,keys:e})})}render(){const{classes:e}=this.props,{api:t,serverError:a,swagger:n,accessToken:c,showToken:o,subscriptions:h,selectedApplication:C,selectedKeyType:w,selectedEnvironment:P,environments:O,labels:N,securitySchemeType:D,username:x,password:j,selectedTokenType:U}=this.state,q=T.a.getUser(),L=JSON.stringify(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?M(Object(a),!0).forEach((function(t){K(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):M(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},n)),z="data:text/json;charset=utf-8, "+encodeURIComponent(L);if(a)return s.a.createElement(r.a,{variant:"h4",className:e.titleSub},a);if(null==t||null==n)return s.a.createElement(I.a,null);let F=!1,H=!1,W=!1,X=t.authorizationHeader?t.authorizationHeader:"Authorization",_="Bearer";t&&t.securityScheme&&(F=t.securityScheme.includes("api_key"),H=t.securityScheme.includes("basic_auth"),W=t.securityScheme.includes("oauth2"),F&&"API-KEY"===D&&(X="apikey",_=""));const Y=t.lifeCycleStatus&&"prototyped"===t.lifeCycleStatus.toLowerCase();return s.a.createElement(s.a.Fragment,null,s.a.createElement(r.a,{variant:"h4",className:e.titleSub},s.a.createElement(i.a,{id:"Apis.Details.ApiConsole.ApiConsole.title",defaultMessage:"Try Out"})),s.a.createElement(k.a,{className:e.paper},s.a.createElement(l.a,{container:!0,className:e.grid},!Y&&!q&&s.a.createElement(l.a,{item:!0,md:6},s.a.createElement(k.a,{className:e.userNotificationPaper},s.a.createElement(r.a,{variant:"h5",component:"h3"},s.a.createElement(b.a,null,"warning")," ",s.a.createElement(i.a,{id:"notice",defaultMessage:"Notice"})),s.a.createElement(r.a,{component:"p"},s.a.createElement(i.a,{id:"api.console.require.access.token",defaultMessage:"You need an access token to try the API. Please log in and subscribe to the API to generate an access token. If you already have an access token, please provide it below."})))),!Y&&s.a.createElement(l.a,{xs:12,md:12,item:!0},s.a.createElement(v.a,{display:"block"},q&&h&&h.length>0&&s.a.createElement(R.a,{subscriptions:h,handleChanges:this.handleChanges,selectedApplication:C,selectedKeyType:w,selectedTokenType:U}),h&&0===h.length&&s.a.createElement(v.a,{display:"flex",justifyContent:"center"},s.a.createElement(r.a,{variant:"body1",gutterBottom:!0},s.a.createElement(i.a,{id:"Apis.Details.ApiConsole.ApiConsole.subscribe.to.application",defaultMessage:"Please subscribe to an application"}))),s.a.createElement(v.a,{display:"flex",justifyContent:"center"},s.a.createElement(l.a,{xs:12,md:6,item:!0},(O&&O.length>0||N&&N.length>0)&&s.a.createElement(p.a,{fullWidth:!0,select:!0,label:s.a.createElement(i.a,{defaultMessage:"Environment",id:"Apis.Details.ApiConsole.environment"}),value:P,name:"selectedEnvironment",onChange:this.handleChanges,helperText:s.a.createElement(i.a,{defaultMessage:"Please select an environment",id:"Apis.Details.ApiConsole.SelectAppPanel.select.environment"}),margin:"normal",variant:"outlined"},O&&O.length>0&&s.a.createElement(A.a,{value:"",disabled:!0,className:e.menuItem},s.a.createElement("em",null,s.a.createElement(i.a,{id:"api.gateways",defaultMessage:"API Gateways"}))),O&&O.map(t=>s.a.createElement(A.a,{value:t,key:t,className:e.menuItem},t)),N&&N.length>0&&s.a.createElement(A.a,{value:"",disabled:!0,className:e.menuItem},s.a.createElement("em",null,s.a.createElement(i.a,{id:"micro.gateways",defaultMessage:"Microgateways"}))),N&&N.map(t=>s.a.createElement(A.a,{value:t,key:t,className:e.menuItem},t))))),s.a.createElement(v.a,{display:"block",justifyContent:"center"},s.a.createElement(l.a,{x:12,md:6,className:e.tokenType,item:!0},"BASIC"===D?s.a.createElement(s.a.Fragment,null,s.a.createElement(p.a,{margin:"normal",variant:"outlined",className:e.usernameField,label:s.a.createElement(i.a,{id:"username",defaultMessage:"Username"}),name:"username",onChange:this.handleChanges,value:x||""}),s.a.createElement(p.a,{margin:"normal",variant:"outlined",className:e.passwordField,label:s.a.createElement(i.a,{id:"password",defaultMessage:"Password"}),name:"password",onChange:this.handleChanges,value:j||""})):s.a.createElement(p.a,{fullWidth:!0,margin:"normal",variant:"outlined",label:s.a.createElement(i.a,{id:"access.token",sdefaultMessage:"Access Token"}),name:"accessToken",onChange:this.handleChanges,type:o?"text":"password",value:c||"",helperText:s.a.createElement(i.a,{id:"enter.access.token",defaultMessage:"Enter access Token"}),InputProps:{endAdornment:s.a.createElement(E.a,{position:"end"},s.a.createElement(y.a,{edge:"end","aria-label":"Toggle token visibility",onClick:this.handleClickShowToken},o?s.a.createElement(b.a,null,"visibility_off"):s.a.createElement(b.a,null,"visibility"))),startAdornment:s.a.createElement(E.a,{className:e.inputAdornmentStart,position:"start"},`${X}: ${_}`)}})),s.a.createElement(l.a,{x:12,md:6,className:e.centerItems},(F||H||W)&&s.a.createElement(d.a,{component:"fieldset"},s.a.createElement(u.a,{name:"securityScheme",value:D,onChange:this.handleChanges,row:!0},W&&s.a.createElement(m.a,{value:"OAUTH",control:s.a.createElement(g.a,null),label:"OAuth"}),H&&s.a.createElement(m.a,{value:"BASIC",control:s.a.createElement(g.a,null),label:"Basic"}),F&&s.a.createElement(m.a,{value:"API-KEY",control:s.a.createElement(g.a,null),label:"API Key"}))))))),s.a.createElement(l.a,{container:!0},s.a.createElement(l.a,{xs:10,item:!0}),s.a.createElement(l.a,{xs:2,item:!0},s.a.createElement("a",{href:z,download:"swagger.json"},s.a.createElement(f.a,{size:"small"},s.a.createElement(S.a,{className:e.buttonIcon}),s.a.createElement(i.a,{id:"Apis.Details.APIConsole.APIConsole.download.swagger",defaultMessage:"Swagger ( /swagger.json )"}))))))),s.a.createElement(k.a,{className:e.swaggerUIPaper},s.a.createElement(B,{api:this.state.api,accessTokenProvider:this.accessTokenProvider,spec:n,authorizationHeader:X,securitySchemeType:D})))}}U.propTypes={classes:o.a.shape({paper:o.a.string.isRequired,titleSub:o.a.string.isRequired,grid:o.a.string.isRequired,userNotificationPaper:o.a.string.isRequired,inputAdornmentStart:o.a.string.isRequired,buttonIcon:o.a.string.isRequired,centerItems:o.a.string.isRequired}).isRequired},U.contextType=w.a;t.default=Object(h.a)(e=>({buttonIcon:{marginRight:10},centerItems:{margin:"auto"},tokenType:{margin:"auto",display:"flex"},inputAdornmentStart:{minWidth:e.spacing(18)},paper:{margin:e.spacing(1),padding:e.spacing(1),"& span, & h5, & label, & td, & li, & div, & input":{color:e.palette.getContrastText(e.palette.background.paper)}},grid:{marginTop:e.spacing(4),marginBottom:e.spacing(4),paddingRight:e.spacing(2),justifyContent:"center"},userNotificationPaper:{padding:e.spacing(2)},titleSub:{marginLeft:e.spacing(2),paddingTop:e.spacing(2),paddingBottom:e.spacing(2),color:e.palette.getContrastText(e.palette.background.default)},usernameField:{width:"100%"},passwordField:{width:"100%",marginLeft:e.spacing(1)},menuItem:{color:e.palette.getContrastText(e.palette.background.paper)},swaggerUIPaper:{backgroundColor:e.custom.apiDetailPages.swaggerUIBackground}}))(U)}}]);
//# sourceMappingURL=APIConsole.7346944a675b5fb38b5c.bundle.js.map