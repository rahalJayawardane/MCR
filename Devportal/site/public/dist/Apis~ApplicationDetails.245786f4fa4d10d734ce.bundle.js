(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1216:function(e,t,a){"use strict";var n=a(1),r=a.n(n),s=a(17),o=a.n(s),i=a(1182),l=a(1549),c=a(1590),p=a(1262);function d(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class u extends r.a.Component{constructor(){super(...arguments),d(this,"state",{value:0}),d(this,"handleExpandClick",()=>{this.setState(e=>({expanded:!e.expanded}))})}render(){const{classes:e,type:t}=this.props,a=t||"info";return r.a.createElement(l.a,{className:e.root,elevation:1},"info"===a&&r.a.createElement(c.a,{className:e.iconItem},"info"),"warn"===a&&r.a.createElement(c.a,{className:e.iconItem},"warning"),r.a.createElement(p.a,{height:100}),r.a.createElement("div",{className:e.content},this.props.children))}}u.propTypes={classes:o.a.shape({}).isRequired,type:o.a.string.isRequired},t.a=Object(i.a)(e=>({root:{display:"flex",minHeight:100,alignItems:"center",paddingLeft:e.spacing(2),borderRadius:e.shape.borderRadius,border:"solid 1px #ddd","& span.material-icons":{fontSize:60,color:e.custom.info.color},"& span, & h5, & label, & input":{color:e.palette.getContrastText(e.palette.background.paper)}},iconItem:{paddingRight:e.spacing(2),fontSize:60},button:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},content:{paddingTop:e.spacing(1),paddingBottom:e.spacing(1)}}))(u)},1456:function(e,t,a){"use strict";var n=a(1),r=a.n(n),s=a(17),o=a.n(s),i=a(1182),l=a(1276),c=a.n(l),p=a(1559),d=a(1457),u=a.n(d),m=a(1528),g=a(1539),h=a(1552),f=a(181),b=a(1216),y=a(1649);function k(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class v extends r.a.Component{constructor(){super(...arguments),k(this,"state",{tokenCopied:!1}),k(this,"onCopy",e=>()=>{this.setState({[e]:!0});const t=this,a=e;setTimeout((function(){t.setState({[a]:!1})}),4e3)})}getTokeScopesString(e){return e?e.join(", "):""}render(){const{classes:e,token:t,consumerSecret:a}=this.props,{tokenCopied:n}=this.state;return r.a.createElement("div",{className:e.root},a&&r.a.createElement("div",{className:e.secretWrapper},r.a.createElement(y.a,{secret:{consumerSecret:a}})),r.a.createElement(b.a,{type:"warn"},r.a.createElement(m.a,{variant:"h5",component:"h3"},t.isOauth&&r.a.createElement(f.a,{id:"Shared.AppsAndKeys.ViewToken.please.copy",defaultMessage:"Please Copy the Access Token"}),!t.isOauth&&r.a.createElement(f.a,{id:"Shared.AppsAndKeys.ViewToken.please.copy.apikey",defaultMessage:"Please Copy the API Key"})),r.a.createElement(m.a,{component:"p"},r.a.createElement(f.a,{id:"Shared.AppsAndKeys.ViewToken.please.copy.help",defaultMessage:"If the token type is JWT or API Key, please copy this generated token value as it will be displayed only for the current browser session. ( The token will not be visible in the UI after the page is refreshed. )"}))),r.a.createElement("div",{className:e.epWrapper},r.a.createElement(m.a,{className:e.prodLabel},t.isOauth&&r.a.createElement(f.a,{id:"Shared.AppsAndKeys.ViewToken.access.token",defaultMessage:"Access Token"}),!t.isOauth&&r.a.createElement(f.a,{id:"Shared.AppsAndKeys.ViewToken.apikey",defaultMessage:"API Key"})),r.a.createElement(g.a,{defaultValue:t.accessToken,id:"bootstrap-input",multiline:!0,fullWidth:!0,rows:4,InputProps:{disableUnderline:!0,classes:{root:e.bootstrapRoot,input:e.bootstrapInput}},InputLabelProps:{shrink:!0,className:e.bootstrapFormLabel}}),r.a.createElement(p.a,{title:n?"Copied":"Copy to clipboard",placement:"right"},r.a.createElement(c.a,{text:t.accessToken,onCopy:this.onCopy("tokenCopied")},r.a.createElement(u.a,{color:"secondary"},"file_copy")))),r.a.createElement(h.a,null,r.a.createElement(f.a,{id:"Shared.AppsAndKeys.ViewToken.info.first",defaultMessage:"Above token has a validity period of "}),t.validityTime,r.a.createElement(f.a,{id:"Shared.AppsAndKeys.ViewToken.info.second",defaultMessage:" seconds"}),t.isOauth&&r.a.createElement(f.a,{id:"Shared.AppsAndKeys.ViewToken.info.third",defaultMessage:" and the token has ("}),this.getTokeScopesString(t.tokenScopes),t.isOauth&&r.a.createElement(f.a,{id:"Shared.AppsAndKeys.ViewToken.info.fourth",defaultMessage:") scopes"}),"."))}}v.defaultProps={consumerSecret:null},v.propTypes={classes:o.a.shape({}).isRequired,token:o.a.shape({accessToken:o.a.string.isRequired,validityTime:o.a.number.isRequired,tokenScopes:o.a.array.isRequired}).isRequired,consumerSecret:o.a.string},t.a=Object(i.a)(e=>({bootstrapRoot:{padding:0,"label + &":{marginTop:e.spacing(3)},flex:1,marginRight:e.spacing(1)},bootstrapInput:{borderRadius:4,backgroundColor:e.custom.apiDetailPages.tokenTextBoxBackground,color:e.palette.getContrastText(e.custom.apiDetailPages.tokenTextBoxBackground),border:"1px solid #ced4da",padding:"5px 12px",height:100,width:"100%",transition:e.transitions.create(["border-color","box-shadow"]),fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),"&:focus":{borderColor:"#80bdff",boxShadow:"0 0 0 0.2rem rgba(0,123,255,.25)"}},epWrapper:{display:"flex",marginTop:20},secretWrapper:{display:"flex",marginBottom:20},prodLabel:{lineHeight:"30px",marginRight:10,width:100,"text-align-last":"center",whiteSpace:"nowrap"},contentWrapper:{maxWidth:e.custom.contentAreaWidth-e.custom.leftMenu.width},root:{marginTop:20,"& span, & h5, & label, & td, & li, & div, & input":{color:e.palette.getContrastText(e.palette.background.paper)}}}))(v)},1641:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a(1),r=a.n(n),s=a(1424),o=a(1206),i=a(1613),l=a(1528),c=a(181),p=a(12);const d=Object(s.a)(e=>({root:{flexGrow:1},messageWrapper:{marginTop:e.spacing(4),padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary}}));function u(){const e=d(),t=Object(o.a)();return r.a.createElement("div",{className:e.root},r.a.createElement(i.a,{container:!0,spacing:3},r.a.createElement(i.a,{item:!0,xs:12,className:e.messageWrapper},r.a.createElement("img",{src:p.app.context+t.custom.noApiImage,className:e.messageWrapper}),r.a.createElement(l.a,{variant:"h5",gutterBottom:!0},r.a.createElement(c.a,{id:"Apis.Listing.NoApi.nodata.title",defaultMessage:"No APIs Available"})),r.a.createElement(l.a,{variant:"subtitle1",gutterBottom:!0},r.a.createElement(c.a,{id:"Apis.Listing.NoApi.nodata.content",defaultMessage:"There are no APIs to display right now."})))))}},1643:function(e,t,a){"use strict";var n=a(1),r=a.n(n),s=a(646),o=a(263),i=a(17),l=a.n(i),c=a(1196),p=a.n(c),d=a(1528),u=a(1182),m=a(1218);function g(e){const[t,a]=Object(n.useState)(!1),{classes:o,theme:i,Icon:l,to:c,history:u,text:g,route:h,submenu:f}=e,b=h||g,{leftMenu:y}=i.custom;let k=i.palette.getContrastText(y.background);const{iconSize:v}=y,E=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e||(e=window.location);const{pathname:t}=e,n=new RegExp("/"+b+"$","g"),r=new RegExp("/"+b+"/","g");t.match(n)||t.match(r)?a(!0):a(!1)};Object(n.useEffect)(()=>{E()},[]),u.listen(e=>{E(e)});let x="";return t&&!f?(x=y.leftMenuActive,k=i.palette.getContrastText(y.leftMenuActive)):t&&f&&(x=y.leftMenuActiveSubmenu),r.a.createElement(s.a,{className:p()(o.leftLInk,{[o.leftLink_IconLeft]:"icon left"===y,[o.submenu]:f},"leftLInk"),to:c,style:{backgroundColor:x}},!f&&(l?r.a.cloneElement(l,{className:p()(o.leftLink_Icon,{[o.noIcon]:"no icon"===y.style,[o.submenu]:f},"leftLink_Icon")}):r.a.createElement(m.a,{strokeColor:k,width:v,height:v,icon:e.iconText,className:p()(o.leftLInk,{[o.noIcon]:"no icon"===y.style},"leftLink_Icon")})),r.a.createElement(d.a,{className:p()(o.leftLInkText,{[o.leftLInkText_IconLeft]:"icon left"===y.style,[o.leftLInkText_NoText]:"no text"===y.style,[o.mainMenuActiveText]:t&&!f,[o.subMenuActiveText]:t&&f},"leftLInkText")},e.text))}g.defaultProps={route:null,iconText:null,Icon:null,submenu:!1},g.propTypes={classes:l.a.shape({}).isRequired,theme:l.a.shape({}).isRequired,Icon:l.a.element,text:l.a.oneOfType([l.a.string,l.a.shape({})]).isRequired,to:l.a.string.isRequired,route:l.a.string,iconText:l.a.string,history:l.a.shape({location:l.a.shape({}).isRequired}).isRequired,submenu:l.a.bool},t.a=Object(o.h)(Object(u.a)(e=>({leftLInkText:{color:e.palette.getContrastText(e.custom.leftMenu.background),textTransform:"capitalize",width:"100%",textAlign:"left",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},leftLInkText_IconLeft:{paddingLeft:10},LeftMenu:{backgroundColor:e.custom.leftMenu.background,width:e.custom.leftMenu.width,textAlign:"center",fontFamily:e.typography.fontFamily,position:"absolute",bottom:0,left:0,top:0},leftLInk:{paddingTop:e.spacing(.6),paddingBottom:e.spacing(.6),paddingLeft:e.spacing(1),paddingRight:0,fontSize:e.typography.caption.fontSize,cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"},leftLink_Icon:{color:e.palette.getContrastText(e.custom.leftMenu.background),fontSize:e.custom.leftMenu.iconSize+"px"},leftLink_IconLeft:{display:"flex",alignItems:"center"},noIcon:{display:"none"},leftLInkText_NoText:{display:"none"},submenu:{paddingLeft:e.spacing(4)},mainMenuActiveText:{"& span":{color:e.palette.getContrastText(e.custom.leftMenu.leftMenuActive)}},subMenuActiveText:{"& span":{color:e.palette.getContrastText(e.custom.leftMenu.leftMenuActiveSubmenu)}}}),{withTheme:!0})(g))},1646:function(e,t,a){"use strict";var n=a(1),r=a.n(n),s=a(1521),o=a(1613),i=a(1182),l=a(1539),c=a(1528),p=a(1542),d=a(1541),u=a(1552),m=a(1714),g=a(1604),h=a(181),f=a(12),b=a.n(f),y=a(17),k=a.n(y),v=a(1228),E=a(1647);function x(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function T(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}const w=e=>{const[t,a]=Object(n.useState)(!1),[i,f]=Object(n.useState)(!1),y=(t,n)=>{const{keyRequest:r,updateKeyRequest:s,setGenerateEnabled:o}=e,i=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?x(Object(a),!0).forEach((function(t){T(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):x(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},r),{target:l}=n;let c=[...i.supportedGrantTypes];switch(t){case"callbackUrl":E.a.url.validate(l.value).error?(f(!0),o(!1)):(f(!1),o(!0)),i.callbackUrl=l.value;break;case"validityTime":E.a.number.validate(l.value).error?(a(!0),o(!1)):(a(!1),o(!0)),i.validityTime=l.value;break;case"grantType":o((c=l.checked?[...c,l.id]:i.supportedGrantTypes.filter(e=>e!==l.id)).includes("client_credentials")),i.supportedGrantTypes=c}s(i)},k=t=>{const{keyRequest:a,isUserOwner:n}=e,{callbackUrl:r}=a;return!n},{classes:w,keyRequest:A,notFound:S,intl:C,isUserOwner:O,isKeysAvailable:I,isRegulatoryApp:M}=e,{serverSupportedGrantTypes:R,supportedGrantTypes:j,callbackUrl:P,validityTime:L}=A;if(S)return r.a.createElement(v.a,null);const q=((e,t)=>{const a={};return e.forEach(e=>{a[e]=t[e],t[e]||(a[e]=e)}),a})(R,b.a.grantTypes);return r.a.createElement(r.a.Fragment,null,r.a.createElement(d.a,{className:w.FormControl,component:"fieldset"},r.a.createElement(p.a,{shrink:!0,htmlFor:"age-label-placeholder",className:w.quotaHelp},r.a.createElement(h.a,{id:"grant.types",defaultMessage:"Grant Types"})),r.a.createElement("div",{className:w.checkboxWrapper},r.a.createElement("div",{className:w.checkboxWrapperColumn},Object.keys(q).map(e=>{const t=q[e];return r.a.createElement(g.a,{control:r.a.createElement(m.a,{id:e,checked:!(!j||!j.includes(e)||k()),onChange:e=>y("grantType",e),value:t,disabled:k(),color:"primary"}),label:t,key:e})}))),r.a.createElement(u.a,null,r.a.createElement(h.a,{defaultMessage:"The application can use the following grant types to generate \n                            Access Tokens. Based on the application requirement,you can enable or disable \n                            grant types for this application.",id:"Shared.AppsAndKeys.KeyConfiguration.the.application.can"}))),r.a.createElement(s.a,{display:"flex"},r.a.createElement(o.a,{item:!0,xs:10,md:5},r.a.createElement(l.a,{classes:{root:w.removeHelperPadding},fullWidth:!0,id:"callbackURL",label:r.a.createElement(h.a,{defaultMessage:"Callback URL",id:"Shared.AppsAndKeys.KeyConfiguration.callback.url.label"}),value:P,name:"callbackURL",onChange:e=>y("callbackUrl",e),helperText:i?r.a.createElement(c.a,{variant:"caption"},r.a.createElement(h.a,{defaultMessage:"Invalid url. Please enter a valid url.",id:"Shared.AppsAndKeys.KeyConfCiguration.Invalid.callback.url.error.text"})):r.a.createElement(c.a,{variant:"caption"},r.a.createElement(h.a,{defaultMessage:"Callback URL is a redirection URI in the client\n                                    application which is used by the authorization server to send the\n                                    client's user-agent (usually web browser) back after granting access.",id:"Shared.AppsAndKeys.KeyConfCiguration.callback.url.helper.text"})),margin:"normal",variant:"outlined",disabled:!O,error:i,placeholder:C.formatMessage({defaultMessage:"http://url-to-webapp",id:"Shared.AppsAndKeys.KeyConfiguration.url.to.webapp"})})),r.a.createElement(o.a,{item:!0,xs:10,md:5},M?null:r.a.createElement(s.a,{ml:2},r.a.createElement(l.a,{classes:{root:w.removeHelperPadding},fullWidth:!0,id:"validityTime",label:r.a.createElement(h.a,{defaultMessage:"Access token validity period",id:"Shared.AppsAndKeys.KeyConfiguration.access.token.validity.label"}),value:L,name:"validityTime",onChange:e=>y("validityTime",e),helperText:t?r.a.createElement(c.a,{variant:"caption"},r.a.createElement(h.a,{defaultMessage:"Please enter a valid number",id:"Shared.AppsAndKeys.KeyConfCiguration.access.token.validity.error.text"})):r.a.createElement(c.a,{variant:"caption"},r.a.createElement(h.a,{defaultMessage:"This is the validity period ( in seconds ) \n                                        of the access token generated ",id:"Shared.AppsAndKeys.KeyConfCiguration.access.token.validity.helper.text"})),margin:"normal",variant:"outlined",error:t,disabled:!O||I})))))};w.defaultProps={notFound:!1},w.propTypes={classes:k.a.instanceOf(Object).isRequired,keyRequest:k.a.shape({callbackUrl:k.a.string,validityTime:k.a.number,serverSupportedGrantTypes:k.a.array,supportedGrantTypes:k.a.array}).isRequired,isUserOwner:k.a.bool.isRequired,isKeysAvailable:k.a.bool.isRequired,notFound:k.a.bool,setGenerateEnabled:k.a.func.isRequired,updateKeyRequest:k.a.func.isRequired,intl:k.a.shape({formatMessage:k.a.func}).isRequired},t.a=Object(h.e)(Object(i.a)(e=>({FormControl:{paddingTop:e.spacing(2),paddingBottom:e.spacing(2),paddingLeft:0,width:"100%"},FormControlOdd:{padding:e.spacing(2),width:"100%"},button:{marginLeft:e.spacing(1)},quotaHelp:{position:"relative"},checkboxWrapper:{display:"flex"},checkboxWrapperColumn:{display:"flex",flexDirection:"row"},group:{flexDirection:"row"},removeHelperPadding:{"& p":{margin:"8px 0px"}}}))(w))},1647:function(e,t,a){"use strict";var n=a(1880),r=a.n(n);const s={number:r.a.number().integer(),url:r.a.string().uri().allow("")};t.a=s},1648:function(e,t,a){"use strict";var n=a(1),r=a.n(n),s=a(181),o=a(17),i=a.n(o),l=a(1182),c=a(1539),p=a(1533),d=a(1542),u=a(1541),m=a(1528),g=a(1722),h=a(1553),f=a(1721);function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function y(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}const k={PaperProps:{style:{maxHeight:224,width:250}}},v=e=>{const t=(t,a)=>{const{accessTokenRequest:n,updateAccessTokenRequest:r}=e,s=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(Object(a),!0).forEach((function(t){y(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},n),{target:o}=a;switch(t){case"timeout":s.timeout=o.value;break;case"scopesSelected":s.scopesSelected=o.value;break;case"keyType":s.keyType=o.value}r(s)},{classes:a,intl:n,accessTokenRequest:o,subscriptionScopes:i}=e;return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,{margin:"normal",className:a.FormControl},r.a.createElement(c.a,{required:!0,label:n.formatMessage({defaultMessage:"Access token validity period",id:"Shared.AppsAndKeys.Tokens.access.token"}),InputLabelProps:{shrink:!0},helperText:n.formatMessage({defaultMessage:"You can set an expiration period to determine the validity period of the token after generation. Set this to a negative value to ensure that the token never expires.",id:"Shared.AppsAndKeys.Tokens.you.can.set"}),fullWidth:!0,name:"timeout",onChange:e=>t("timeout",e),placeholder:n.formatMessage({defaultMessage:"Enter time in milliseconds",id:"Shared.AppsAndKeys.Tokens.enter.time"}),value:o.timeout,autoFocus:!0,className:a.inputText})),r.a.createElement(u.a,{margin:"normal",className:a.FormControlOdd,disabled:0===i.length},r.a.createElement(d.a,{htmlFor:"quota-helper",className:a.quotaHelp},r.a.createElement(s.a,{id:"Shared.AppsAndKeys.Tokens.when.you.generate.scopes",defaultMessage:"Scopes"})),r.a.createElement(f.a,{name:"scopesSelected",multiple:!0,value:o.scopesSelected,onChange:e=>t("scopesSelected",e),input:r.a.createElement(p.a,{id:"select-multiple-chip"}),renderValue:e=>r.a.createElement("div",{className:a.chips},e.map(e=>r.a.createElement(g.a,{key:e,label:e,className:a.chip}))),MenuProps:k},i.map(e=>r.a.createElement(h.a,{key:e,value:e},e))),r.a.createElement(m.a,{variant:"caption"},r.a.createElement(s.a,{id:"Shared.AppsAndKeys.Tokens.when.you.generate",defaultMessage:"When you generate access tokens to APIs protected by scope/s, you can select the scope/s and then generate the token for it. Scopes enable fine-grained access control to API resources based on user roles. You define scopes to an API resource. When a user invokes the API, his/her OAuth 2 bearer token cannot grant access to any API resource beyond its associated scopes."}))))};v.contextTypes={intl:i.a.shape({}).isRequired},t.a=Object(s.e)(Object(l.a)(e=>({FormControl:{padding:e.spacing(2),width:"100%"},FormControlOdd:{padding:e.spacing(2),backgroundColor:e.palette.background.paper,width:"100%"},quotaHelp:{position:"relative"},chips:{display:"flex",flexWrap:"wrap"},chip:{margin:e.spacing(.25)}}))(v))},1649:function(e,t,a){"use strict";var n=a(1),r=a.n(n),s=a(17),o=a.n(s),i=a(1182),l=a(1276),c=a.n(l),p=a(1559),d=a(1457),u=a.n(d),m=a(1528),g=a(1539),h=a(181),f=a(1216);function b(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class y extends r.a.Component{constructor(){super(...arguments),b(this,"state",{secretCopied:!1}),b(this,"onCopy",e=>()=>{this.setState({[e]:!0});const t=this,a=e;setTimeout((function(){t.setState({[a]:!1})}),4e3)})}getTokeScopesString(e){return e?e.join(", "):""}render(){const{classes:e,secret:t}=this.props,{secretCopied:a}=this.state;return r.a.createElement("div",{className:e.root},r.a.createElement(f.a,{type:"warn"},r.a.createElement(m.a,{variant:"h5",component:"h3"},r.a.createElement(h.a,{id:"Shared.AppsAndKeys.ViewSecret.please.copy.secret",defaultMessage:"Please Copy the Consumer Secret"})),r.a.createElement(m.a,{component:"p"},r.a.createElement(h.a,{id:"Shared.AppsAndKeys.ViewSecret.please.copy.secret.help",defaultMessage:"Please make a note of the regenerated consumer \n                            secret value as it will be displayed only once."}))),r.a.createElement("div",{className:e.epWrapper},r.a.createElement(m.a,{className:e.prodLabel},r.a.createElement(h.a,{id:"Shared.AppsAndKeys.ViewSecret.consumer.secret",defaultMessage:"Consumer Secret"})),r.a.createElement(g.a,{defaultValue:t.consumerSecret,id:"bootstrap-input",multiline:!0,rows:4,InputProps:{disableUnderline:!0,classes:{root:e.bootstrapRoot,input:e.bootstrapInput}},InputLabelProps:{shrink:!0,className:e.bootstrapFormLabel}}),r.a.createElement(p.a,{title:a?"Copied":"Copy to clipboard",placement:"right"},r.a.createElement(c.a,{text:t.consumerSecret,onCopy:this.onCopy("secretCopied")},r.a.createElement(u.a,{color:"secondary"},"file_copy")))))}}y.propTypes={classes:o.a.shape({}).isRequired,secret:o.a.shape({consumerSecret:o.a.string.isRequired}).isRequired},t.a=Object(i.a)(e=>({bootstrapRoot:{padding:0,"label + &":{marginTop:e.spacing(3)}},bootstrapInput:{borderRadius:4,backgroundColor:e.palette.common.white,border:"1px solid #ced4da",padding:"5px 12px",width:350,height:100,transition:e.transitions.create(["border-color","box-shadow"]),fontFamily:["-apple-system","BlinkMacSystemFont",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),"&:focus":{borderColor:"#80bdff",boxShadow:"0 0 0 0.2rem rgba(0,123,255,.25)"}},epWrapper:{display:"flex",marginTop:20},prodLabel:{lineHeight:"30px",marginRight:10,width:100,"text-align-last":"center"},contentWrapper:{maxWidth:e.custom.contentAreaWidth-e.custom.leftMenu.width},root:{marginBottom:20}}))(y)}}]);
//# sourceMappingURL=Apis~ApplicationDetails.245786f4fa4d10d734ce.bundle.js.map