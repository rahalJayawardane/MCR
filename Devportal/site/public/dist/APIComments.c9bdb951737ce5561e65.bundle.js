(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{2245:function(e,t,a){"use strict";var n=a(1187);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var s=n(a(1263)),i=n(a(1251)),o=n(a(1)),l=(n(a(17)),n(a(1181))),r=n(a(1426)),m=(n(a(2246)),[0,1,2,3,4,5,6,7,8,9,10]),c=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=parseFloat(e);return"".concat(a/t).concat(String(e).replace(String(a),"")||"px")}var p=function(e){return(0,i.default)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-xs-center":{justifyContent:"center"},"justify-xs-flex-end":{justifyContent:"flex-end"},"justify-xs-space-between":{justifyContent:"space-between"},"justify-xs-space-around":{justifyContent:"space-around"},"justify-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var a={};return m.forEach((function(n){var s=e.spacing(n);0!==s&&(a["spacing-".concat(t,"-").concat(n)]={margin:"-".concat(d(s,2)),width:"calc(100% + ".concat(d(s),")"),"& > $item":{padding:d(s,2)}})})),a}(e,"xs"),{},e.breakpoints.keys.reduce((function(t,a){return function(e,t,a){var n={};c.forEach((function(e){var t="grid-".concat(a,"-").concat(e);if(!0!==e)if("auto"!==e){var s="".concat(Math.round(e/12*1e8)/1e6,"%");n[t]={flexBasis:s,flexGrow:0,maxWidth:s}}else n[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else n[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===a?(0,i.default)(e,n):e[t.breakpoints.up(a)]=n}(t,e,a),t}),{}))};t.styles=p;var h=o.default.forwardRef((function(e,t){var a=e.alignContent,n=void 0===a?"stretch":a,r=e.alignItems,m=void 0===r?"stretch":r,c=e.classes,d=e.className,p=e.component,h=void 0===p?"div":p,g=e.container,u=void 0!==g&&g,C=e.direction,f=void 0===C?"row":C,x=e.item,b=void 0!==x&&x,v=e.justify,w=void 0===v?"flex-start":v,E=e.lg,y=void 0!==E&&E,k=e.md,T=void 0!==k&&k,S=e.sm,A=void 0!==S&&S,D=e.spacing,O=void 0===D?0:D,R=e.wrap,I=void 0===R?"wrap":R,M=e.xl,L=void 0!==M&&M,W=e.xs,N=void 0!==W&&W,q=e.zeroMinWidth,j=void 0!==q&&q,U=(0,s.default)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),B=(0,l.default)(c.root,d,u&&[c.container,0!==O&&c["spacing-xs-".concat(String(O))]],b&&c.item,j&&c.zeroMinWidth,"row"!==f&&c["direction-xs-".concat(String(f))],"wrap"!==I&&c["wrap-xs-".concat(String(I))],"stretch"!==m&&c["align-items-xs-".concat(String(m))],"stretch"!==n&&c["align-content-xs-".concat(String(n))],"flex-start"!==w&&c["justify-xs-".concat(String(w))],!1!==N&&c["grid-xs-".concat(String(N))],!1!==A&&c["grid-sm-".concat(String(A))],!1!==T&&c["grid-md-".concat(String(T))],!1!==y&&c["grid-lg-".concat(String(y))],!1!==L&&c["grid-xl-".concat(String(L))]);return o.default.createElement(h,(0,i.default)({className:B,ref:t},U))})),g=(0,r.default)(p,{name:"MuiGrid"})(h);t.default=g},2246:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(e){return function(){return null}};t.default=n},2248:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),i=a(17),o=a.n(i),l=a(1182),r=a(1590),m=a(1549),c=a(1528),d=a(2245),p=a.n(d),h=a(181),g=a(1196),u=a.n(g),C=a(1532),f=a(1216),x=a(1613),b=a(1558),v=a(1202),w=a(1624),E=a(1628),y=a(1626),k=a(1627),T=a(1625),S=a(1597);class A extends s.a.Component{handleRequestClose(e){const{callback:t}=this.props;e===A.Action.OK?t(!0):t(!1)}render(){const{title:e,message:t,labelCancel:a,labelOk:n,open:i,classes:o}=this.props;return s.a.createElement(w.a,{open:i,onClose:this.handleRequestClose,className:o.dialogWrapper},s.a.createElement(E.a,null,e||s.a.createElement(h.a,{id:"Shared.ConfirmDialog.please.confirm",defaultMessage:"Please Confirm"})),s.a.createElement(y.a,null,s.a.createElement(k.a,null,t||s.a.createElement(h.a,{id:"Shared.ConfirmDialog.please.confirm.sure",defaultMessage:"Are you sure?"}))),s.a.createElement(T.a,null,s.a.createElement(S.a,{onClick:()=>this.handleRequestClose(A.Action.CANCEL),color:"primary"},a||s.a.createElement(h.a,{id:"Shared.ConfirmDialog.cancel",defaultMessage:"Cancel"})),s.a.createElement(S.a,{onClick:()=>this.handleRequestClose(A.Action.OK),color:"primary",variant:"contained"},n||s.a.createElement(h.a,{id:"Shared.ConfirmDialog.ok",defaultMessage:"OK"}))))}}A.propTypes={title:o.a.string.isRequired,message:o.a.string.isRequired,labelCancel:o.a.string.isRequired,labelOk:o.a.string.isRequired,callback:o.a.func.isRequired,open:o.a.bool.isRequired},A.Action={OK:"ok",CANCEL:"cancel"};var D=Object(l.a)(e=>({dialogWrapper:{"& span, & h5, & label, & td, & li, & div, & p":{color:e.palette.getContrastText(e.palette.background.paper)}}}))(A),O=a(257),R=a(1539),I=a(1541),M=a(1553),L=a(1721);class W extends s.a.Component{constructor(e){super(e),this.state={commentText:"",category:"",currentLength:0},this.inputChange=this.inputChange.bind(this),this.handleCategoryChange=this.handleCategoryChange.bind(this),this.handleClickUpdateComment=this.handleClickUpdateComment.bind(this),this.handleClickCancel=this.handleClickCancel.bind(this),this.filterCommentToUpdate=this.filterCommentToUpdate.bind(this),this.filterCommentToUpdateReply=this.filterCommentToUpdateReply.bind(this)}componentDidMount(){const{comment:e}=this.props;this.setState({commentText:e.commentText,category:e.category,currentLength:e.commentText.length})}inputChange(e){let{target:t}=e;this.setState({commentText:t.value,currentLength:t.value.length})}handleClickCancel(){const{toggleShowEdit:e,commentsUpdate:t,allComments:a}=this.props;e(),t(a)}handleCategoryChange(e){this.setState({category:e.target.value})}filterCommentToUpdate(e){const{comment:t}=this.props;return e.commentId===t.commentId}filterCommentToUpdateReply(e){const{comment:t}=this.props;return e.commentId===t.parentCommentId}handleClickUpdateComment(){const{apiId:e,comment:t,allComments:a,toggleShowEdit:n,commentsUpdate:s,intl:i}=this.props,{category:o,commentText:l}=this.state,r=new O.a,m=t;m.commentText=l.trim(),m.category=o,t.commentText.replace(/\s/g,"").length?r.updateComment(e,m.commentId,m).then(e=>{const t=e.body;if(void 0===m.parentCommentId){const e=a.findIndex(this.filterCommentToUpdate);a[e].category=t.category,a[e].commentText=t.commentText}else{const e=a.findIndex(this.filterCommentToUpdateReply),n=a[e].replies.findIndex(this.filterCommentToUpdate);a[e].replies[n]=t}n(),s(a)}).catch(e=>{console.error(e),e.response?v.a.error(e.response.body.message):v.a.error(i.formatMessage({defaultMessage:"Something went wrong while adding the comment",id:"Apis.Details.Comments.CommentEdit.something.went.wrong"}))}):v.a.error(i.formatMessage({defaultMessage:"You cannot enter a blank comment",id:"Apis.Details.Comments.CommentEdit.blank.comment.error"}))}render(){const{classes:e,theme:t,intl:a}=this.props,{category:n,commentText:i,currentLength:o}=this.state;return s.a.createElement("div",null,s.a.createElement(I.a,{className:e.category},s.a.createElement(L.a,{value:n,onChange:this.handleCategoryChange},s.a.createElement(M.a,{value:"General"},s.a.createElement(h.a,{id:"Apis.Details.Comments.CommentEdit.general",defaultMessage:"General"})),s.a.createElement(M.a,{value:"Feature Request"},s.a.createElement(h.a,{id:"Apis.Details.Comments.CommentEdit.feature.request",defaultMessage:"Feature Request"})),s.a.createElement(M.a,{value:"Bug Report"},s.a.createElement(h.a,{id:"Apis.Details.Comments.CommentEdit.bug.report",defaultMessage:"Bug Report"})))),s.a.createElement(R.a,{id:"multiline-static",autoFocus:!0,multiline:!0,className:e.textField,margin:"normal",placeholder:a.formatMessage({defaultMessage:"Write a comment",id:"Apis.Details.Comments.CommentEdit.write.a.comment"}),inputProps:{maxLength:t.custom.maxCommentLength},value:i,onChange:this.inputChange}),s.a.createElement(c.a,{className:e.commentText,align:"right"},o+"/"+t.custom.maxCommentLength),s.a.createElement(x.a,{container:!0,spacing:1},s.a.createElement(x.a,{item:!0},s.a.createElement(S.a,{variant:"contained",color:"primary",onClick:()=>this.handleClickUpdateComment()},s.a.createElement(h.a,{id:"Apis.Details.Comments.CommentEdit.btn.save",defaultMessage:"Save"}))),s.a.createElement(x.a,{item:!0},s.a.createElement(S.a,{onClick:()=>this.handleClickCancel(),className:e.button},s.a.createElement(h.a,{id:"Apis.Details.Comments.CommentEdit.btn.cancel",defaultMessage:"Cancel"})))))}}W.propTypes={classes:o.a.instanceOf(Object).isRequired,apiId:o.a.string.isRequired,allComments:o.a.instanceOf(Array).isRequired,commentsUpdate:o.a.func.isRequired,toggleShowEdit:o.a.func.isRequired,comment:o.a.instanceOf(Object).isRequired,intl:o.a.shape({formatMessage:o.a.func}).isRequired};var N=Object(h.e)(Object(l.a)(e=>({textField:{marginTop:0,width:"87.5%"},contentWrapper:{maxWidth:e.custom.contentAreaWidth,paddingLeft:e.spacing(2),paddingTop:e.spacing.unig,marginTop:e.spacing(2)},category:{width:"12%",marginRight:"0.5%"}}),{withTheme:!0})(W)),q=a(1262),j=a(22);class U extends s.a.Component{constructor(e){super(e),this.state={},this.showAddComment=this.showAddComment.bind(this),this.showEditComment=this.showEditComment.bind(this),this.handleClickOpen=this.handleClickOpen.bind(this)}showAddComment(e){const{editIndex:t,showAddComment:a}=this.props;-1===t&&a(e)}showEditComment(e){const{editIndex:t,showEditComment:a}=this.props;-1===t&&a(e)}handleClickOpen(e){const{editIndex:t,handleClickOpen:a}=this.props;-1===t&&a(e)}displayDate(e){const t=new Date(e);return t.toLocaleDateString(void 0,{day:"numeric",month:"short",year:"numeric"})+" "+t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}render(){const{classes:e,comment:t,editIndex:a,index:n,theme:i}=this.props;return s.a.createElement(x.a,{container:!0,spacing:1,className:e.verticalSpace,key:t.id},j.a.getUser()&&t.createdBy===j.a.getUser().name&&[s.a.createElement(x.a,{item:!0,key:"key-delete"},s.a.createElement(S.a,{variant:"outlined",size:"small",className:-1===a?e.link:e.disable,onClick:()=>this.handleClickOpen(t),variant:"contained",color:"primary"},s.a.createElement(h.a,{id:"Apis.Details.Comments.CommentOptions.delete",defaultMessage:"Delete"}))),s.a.createElement(x.a,{item:!0,key:"key-delete-vertical-divider"},s.a.createElement(q.a,{height:15}))],s.a.createElement(x.a,{item:!0,className:e.time},s.a.createElement(c.a,{component:"a",variant:"caption"},this.displayDate(t.createdTime))))}}U.defaultProps={showAddComment:null},U.propTypes={classes:o.a.instanceOf(Object).isRequired,editIndex:o.a.number.isRequired,index:o.a.number.isRequired,comment:o.a.instanceOf(Object).isRequired,handleClickOpen:o.a.func.isRequired,showEditComment:o.a.func.isRequired,showAddComment:o.a.func};var B=Object(l.a)(e=>({link:{color:e.palette.getContrastText(e.palette.primary.main),"& span.MuiButton-label span":{color:e.palette.getContrastText(e.palette.primary.main)},cursor:"pointer"},time:{color:e.palette.getContrastText(e.palette.background.default),marginTop:e.spacing(.3)},verticalSpace:{marginTop:e.spacing(1),display:"flex",alignItems:"center"},disable:{color:e.palette.grey[200]},commentIcon:{color:e.palette.getContrastText(e.palette.background.default)},commentText:{color:e.palette.getContrastText(e.palette.background.default),marginTop:e.spacing.unig,width:"100%",whiteSpace:"pre-wrap",overflowWrap:"break-word"},root:{marginTop:e.spacing(2.5)},contentWrapper:{maxWidth:e.custom.contentAreaWidth,paddingLeft:e.spacing(2),paddingTop:e.spacing.unig}}),{withTheme:!0})(U);class P extends s.a.Component{constructor(e){super(e),this.state={openDialog:!1,replyIndex:-1,editIndex:-1,deleteComment:null},this.handleClickDeleteComment=this.handleClickDeleteComment.bind(this),this.handleShowEdit=this.handleShowEdit.bind(this),this.handleShowReply=this.handleShowReply.bind(this),this.handleClickOpen=this.handleClickOpen.bind(this),this.showAddComment=this.showAddComment.bind(this),this.showEditComment=this.showEditComment.bind(this),this.handleConfirmDialog=this.handleConfirmDialog.bind(this),this.handleClose=this.handleClose.bind(this),this.filterRemainingComments=this.filterRemainingComments.bind(this),this.filterCommentToDelete=this.filterCommentToDelete.bind(this)}filterRemainingComments(e){const{deleteComment:t}=this.state;return e.id!==t.id}filterCommentToDelete(e){return e.id}showAddComment(e){const{editIndex:t}=this.state;-1===t&&this.setState({replyIndex:e})}showEditComment(e){const{editIndex:t}=this.state;-1===t&&this.setState({editIndex:e})}handleShowEdit(){this.setState({editIndex:-1})}handleShowReply(){this.setState({replyIndex:-1})}handleClickOpen(e){const{editIndex:t}=this.state;-1===t&&this.setState({deleteComment:e,openDialog:!0})}handleClose(){this.setState({openDialog:!1})}handleConfirmDialog(e){e?this.handleClickDeleteComment():this.handleClose()}handleClickDeleteComment(){const e=new O.a,{deleteComment:t}=this.state,{apiId:a,allComments:n,commentsUpdate:s,intl:i}=this.props,o=t.id;this.handleClose(),e.deleteComment(a,o).then(()=>{const e=n.filter(this.filterRemainingComments);s(e),v.a.message("Comment"+o+"has been successfully deleted")}).catch(e=>{console.error(e),e.response&&v.a.error(e.response.body.message)})}render(){const{classes:e,comments:t,apiId:a,allComments:n,commentsUpdate:i,isOverview:o}=this.props,{editIndex:l,openDialog:d}=this.state;return s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{className:u()({[e.paper]:!o&&t.length>0},{[e.cleanBack]:o})},t&&t.slice(0).reverse().map((t,m)=>s.a.createElement("div",{key:t.commentId+"-"+m,className:u()({[e.contentWrapper]:!o},{[e.contentWrapperOverview]:o})},0!==m&&s.a.createElement(b.a,{className:e.divider}),s.a.createElement(x.a,{container:!0,spacing:1,className:u()({[e.root]:!o})},s.a.createElement(x.a,{item:!0},s.a.createElement(r.a,{className:e.commentIcon},"account_box")),s.a.createElement(x.a,{item:!0,xs:!0,zeroMinWidth:!0},s.a.createElement(c.a,{noWrap:!0,className:e.commentText},t.createdBy),m!==l&&s.a.createElement(c.a,{className:e.commentText},t.content),m===l&&s.a.createElement(N,{apiId:a,allComments:n,commentsUpdate:i,comment:t,toggleShowEdit:this.handleShowEdit}),s.a.createElement(B,{comment:t,editIndex:l,index:m,showAddComment:this.showAddComment,handleClickOpen:this.handleClickOpen,showEditComment:this.showEditComment})))))),s.a.createElement(D,{key:"key-dialog",labelCancel:"Cancel",title:"Confirm Delete",message:"Are you sure you want to delete this comment?",labelOk:"Yes",callback:this.handleConfirmDialog,open:d}))}}P.defaultProps={isOverview:!1},P.propTypes={classes:o.a.shape({}).isRequired,apiId:o.a.string.isRequired,allComments:o.a.instanceOf(Array).isRequired,commentsUpdate:o.a.func.isRequired,comments:o.a.instanceOf(Array).isRequired,isOverview:o.a.bool};var z=Object(h.e)(Object(l.a)(e=>({link:{color:e.palette.getContrastText(e.palette.background.default),cursor:"pointer"},commentIcon:{color:e.palette.getContrastText(e.palette.background.default)},commentText:{color:e.palette.getContrastText(e.palette.background.default),marginTop:0,width:"99%",whiteSpace:"pre-wrap",overflowWrap:"break-word",wordBreak:"break-all"},root:{marginTop:e.spacing(1)},contentWrapper:{paddingLeft:e.spacing(2),paddingTop:e.spacing(1)},contentWrapperOverview:{background:"transparent",width:"100%"},divider:{marginTop:e.spacing(1)},paper:{margin:0,marginTop:e.spacing(1),marginRight:e.spacing(3),paddingBottom:e.spacing(3)},cleanBack:{background:"transparent",width:"100%",boxShadow:"none"}}))(P));class F extends s.a.Component{constructor(e){super(e),this.state={content:"",currentLength:0},this.inputChange=this.inputChange.bind(this),this.handleClickAddComment=this.handleClickAddComment.bind(this),this.handleClickCancel=this.handleClickCancel.bind(this)}inputChange(e){let{target:t}=e;this.setState({content:t.value,currentLength:t.value.length})}handleClickCancel(){this.setState({content:""})}handleClickAddComment(){const{apiId:e,allComments:t,commentsUpdate:a,intl:n}=this.props,{content:s}=this.state,i=new O.a,o={content:s.trim()};o.content.replace(/\s/g,"").length?i.addComment(e,o).then(e=>{this.setState({content:""});const n=e.body;t.push(n),a(t)}).catch(e=>{console.error(e),e.response&&e.response.body&&e.response.body.message?v.a.error(e.response.body.message):v.a.error(n.formatMessage({defaultMessage:"Something went wrong while adding the comment",id:"Apis.Details.Comments.CommentAdd.something.went.wrong"}))}):v.a.error(n.formatMessage({defaultMessage:"You cannot enter a blank comment",id:"Apis.Details.Comments.CommentAdd.error.blank.comment"})),this.setState({currentLength:0})}render(){const{classes:e,cancelButton:t,theme:a,intl:n}=this.props,{content:i,currentLength:o}=this.state;return s.a.createElement(x.a,{container:!0,spacing:3,className:e.contentWrapper},s.a.createElement(x.a,{item:!0,xs:!0,zeroMinWidth:!0},s.a.createElement("div",{className:e.commentAddWrapper},s.a.createElement(R.a,{id:"standard-multiline-flexible",autoFocus:!0,multiline:!0,className:e.textField,margin:"normal",placeholder:n.formatMessage({defaultMessage:"Write a comment",id:"Apis.Details.Comments.CommentAdd.write.comment.help"}),inputProps:{maxLength:a.custom.maxCommentLength},value:i,onChange:this.inputChange,variant:"outlined"}),s.a.createElement(c.a,{className:e.content,align:"left"},o+"/"+a.custom.maxCommentLength)),s.a.createElement(x.a,{container:!0,spacing:1},s.a.createElement(x.a,{item:!0},s.a.createElement(S.a,{variant:"contained",color:"primary",disabled:0===o,onClick:()=>this.handleClickAddComment(),className:e.commentAddButton},s.a.createElement(h.a,{id:"Apis.Details.Comments.CommentAdd.btn.add.comment",defaultMessage:"Add Comment"}))),t&&s.a.createElement(x.a,{item:!0},s.a.createElement(S.a,{onClick:()=>this.handleClickCancel(),className:e.button},s.a.createElement(h.a,{id:"Apis.Details.Comments.CommentAdd.btn.cancel",defaultMessage:"Cancel"}))))))}}F.defaultProps={parentCommentId:null,toggleShowReply:null,commentsUpdate:null},F.propTypes={classes:o.a.instanceOf(Object).isRequired,cancelButton:o.a.bool.isRequired,apiId:o.a.string.isRequired,parentCommentId:o.a.string,toggleShowReply:o.a.func,commentsUpdate:o.a.func,allComments:o.a.instanceOf(Array).isRequired,intl:o.a.shape({formatMessage:o.a.func}).isRequired};var _=Object(h.e)(Object(l.a)(e=>({commentIcon:{color:e.palette.getContrastText(e.palette.background.default)},content:{color:e.palette.getContrastText(e.palette.background.default)},contentWrapper:{maxWidth:e.custom.contentAreaWidth,paddingLeft:e.spacing(2),paddingTop:e.spacing.unig,marginTop:e.spacing(2)},textField:{marginTop:0,marginRight:5,width:"100%"},commentAddWrapper:{display:"flex",alignItems:"top"},commentAddButton:{"& span.MuiButton-label span":{color:e.palette.getContrastText(e.palette.primary.main)}}}),{withTheme:!0})(F)),G=a(1199);class K extends n.Component{constructor(e){super(e),this.state={expanded:!0,allComments:null,comments:[],totalComments:0,startCommentsToDisplay:0},this.updateCommentList=this.updateCommentList.bind(this),this.handleExpandClick=this.handleExpandClick.bind(this),this.handleLoadMoreComments=this.handleLoadMoreComments.bind(this)}componentDidMount(){let{apiId:e,theme:t,match:a,intl:n,isOverview:s,setCount:i}=this.props;a&&(e=a.params.apiUuid),(new O.a).getAllComments(e).then(e=>{let a=e.body.list;s&&(i(a.length),a.length>2&&(a=a.slice(a.length-3,a.length))),this.setState({allComments:a,totalComments:a.length}),a.length<t.custom.commentsLimit?this.setState({startCommentsToDisplay:0,comments:a.slice(0,a.length)}):this.setState({startCommentsToDisplay:a.length-t.custom.commentsLimit,comments:a.slice(a.length-t.custom.commentsLimit,a.length)})}).catch(e=>{0})}handleLoadMoreComments(){const{totalComments:e,startCommentsToDisplay:t,allComments:a}=this.state,{theme:n}=this.props;t-n.custom.commentsLimit<=0?this.setState({startCommentsToDisplay:0,comments:a.slice(0,e)}):this.setState({startCommentsToDisplay:t-n.custom.commentsLimit,comments:a.slice(t-n.custom.commentsLimit,e)})}handleExpandClick(){const{expanded:e}=this.state;this.setState({expanded:!e})}updateCommentList(e){const{startCommentsToDisplay:t,totalComments:a}=this.state,{theme:n}=this.props;let s,i,o;this.setState({allComments:e}),a<n.custom.commentsLimit?(o=e.length,this.setState({startCommentsToDisplay:0,totalComments:o,comments:e})):a<=e.length?(s=t+(i=e.length-a),o=e.length,this.setState({startCommentsToDisplay:s,totalComments:o,comments:e.slice(s,o)})):(i=a-e.length,s=0===t?t:t-i,o=e.length,this.setState({startCommentsToDisplay:s,totalComments:o,comments:e.slice(s,o)}))}isCrossTenant(e,t){let a=null,n=null;const s=t.name;if(e.includes("@")){const t=e.split("@");a=t[t.length-1]}else a="carbon.super";if(s.includes("@")){const e=s.split("@");n=e[e.length-1]}else n="carbon.super";return a!==n}render(){const{classes:e,showLatest:t,isOverview:a}=this.props,{comments:n,expanded:i,allComments:o,startCommentsToDisplay:l,totalComments:d,commentsUpdate:g}=this.state;return s.a.createElement(G.a.Consumer,null,i=>{let{api:g}=i;return s.a.createElement("div",{className:u()({[e.contentWrapper]:!a},{[e.contentWrapperOverview]:a})},!t&&s.a.createElement("div",{className:e.root},s.a.createElement(c.a,{variant:"h4",className:e.titleSub},s.a.createElement(h.a,{id:"Apis.Details.Comments.title",defaultMessage:"Comments"}))),!t&&j.a.getUser()&&!this.isCrossTenant(g.provider,j.a.getUser())&&s.a.createElement(m.a,{className:e.paper},s.a.createElement(_,{apiId:g.id,commentsUpdate:this.updateCommentList,allComments:o,parentCommentId:null,cancelButton:!0})),!o&&s.a.createElement(m.a,{className:e.paperProgress},s.a.createElement(C.a,{size:24})),o&&0===d&&!a&&s.a.createElement("div",{className:e.genericMessageWrapper},s.a.createElement(f.a,{type:"info",className:e.dialogContainer},s.a.createElement(c.a,{variant:"h5",component:"h3"},s.a.createElement(h.a,{id:"Apis.Details.Comments.no.comments",defaultMessage:"No Comments Yet"})),s.a.createElement(c.a,{component:"p"},s.a.createElement(h.a,{id:"Apis.Details.Comments.no.comments.content",defaultMessage:"No comments available for this API yet"})))),s.a.createElement(z,{comments:n,apiId:g.id,commentsUpdate:this.updateCommentList,allComments:o,isOverview:a}),0!==l&&s.a.createElement("div",{className:e.contentWrapper},s.a.createElement(p.a,{container:!0,spacing:4,className:e.root},s.a.createElement(p.a,{item:!0},s.a.createElement(c.a,{className:e.verticalSpace,variant:"body1"},s.a.createElement("a",{className:e.link+" "+e.loadMoreLink,onClick:this.handleLoadMoreComments},s.a.createElement(h.a,{id:"Apis.Details.Comments.load.previous.comments",defaultMessage:"Load Previous Comments"})))),s.a.createElement(p.a,null,s.a.createElement(r.a,{onClick:this.handleLoadMoreComments,className:e.link+" "+e.verticalSpace},"arrow_drop_down")),s.a.createElement(p.a,{item:!0},s.a.createElement(c.a,{className:e.verticalSpace,variant:"body1"},s.a.createElement(h.a,{id:"Apis.Details.Comments.showing.comments",defaultMessage:"Showing comments "}),d-l+" of "+d)))))})}}var Y,J,$;Y=K,J="contextType",$=G.a,J in Y?Object.defineProperty(Y,J,{value:$,enumerable:!0,configurable:!0,writable:!0}):Y[J]=$,K.propTypes={classes:o.a.instanceOf(Object).isRequired};t.default=Object(h.e)(Object(l.a)(e=>({root:{display:"flex",alignItems:"center",paddingTop:e.spacing(2),paddingBottom:e.spacing(2)},paper:{marginRight:e.spacing(3),paddingBottom:e.spacing(3),paddingRight:e.spacing(2),"& span, & h5, & label, & td, & li, & div, & input":{color:e.palette.getContrastText(e.palette.background.paper)}},contentWrapper:{paddingLeft:e.spacing(3),marginTop:e.spacing(1),"& span, & h5, & label, & td, & li, & div, & input":{color:e.palette.getContrastText(e.palette.background.paper)}},contentWrapperOverview:{padding:0,width:"100%",boxShadow:"none"},titleSub:{cursor:"pointer",color:e.palette.getContrastText(e.palette.background.default)},link:{color:e.palette.getContrastText(e.palette.background.default),cursor:"pointer"},verticalSpace:{marginTop:e.spacing(.2)},loadMoreLink:{textDecoration:"underline"},genericMessageWrapper:{marginTop:e.spacing(2),marginBottom:e.spacing(2),marginRight:e.spacing(3)},paperProgress:{padding:e.spacing(3),marginTop:e.spacing(2)}}),{withTheme:!0})(K))}}]);
//# sourceMappingURL=APIComments.c9bdb951737ce5561e65.bundle.js.map