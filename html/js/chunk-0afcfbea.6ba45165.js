(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0afcfbea"],{"156d":function(e,s,t){},2017:function(e,s,t){"use strict";t("cafe")},2868:function(e,s,t){"use strict";t("156d")},"9ed6":function(e,s,t){"use strict";t.r(s);var n=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"login-container"},[t("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[t("div",{staticClass:"title-container"},[t("h3",{staticClass:"title"},[e._v("工业视觉一体机-X系列")])]),t("el-form-item",{attrs:{prop:"userName"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"user"}})],1),t("el-input",{ref:"userName",attrs:{placeholder:"userName",name:"userName",type:"text",tabindex:"1","auto-complete":"on"},model:{value:e.loginForm.userName,callback:function(s){e.$set(e.loginForm,"userName",s)},expression:"loginForm.userName"}})],1),t("el-form-item",{attrs:{prop:"passwd"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"passwd"}})],1),t("el-input",{key:e.passwdType,ref:"passwd",attrs:{type:e.passwdType,placeholder:"Password",name:"passwd",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:e.handleLogin(s)}},model:{value:e.loginForm.passwd,callback:function(s){e.$set(e.loginForm,"passwd",s)},expression:"loginForm.passwd"}}),t("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[t("svg-icon",{attrs:{"icon-class":"passwd"===e.passwdType?"eye":"eye-open"}})],1)],1),t("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(s){return s.preventDefault(),e.handleLogin(s)}}},[e._v("Login")])],1)],1)},a=[],i=(t("d9e2"),t("d401"),t("61f7"),{name:"Login",data:function(){var e=function(e,s,t){s.length<3?t(new Error("The passwd can not be less than 3 digits")):t()};return{loginForm:{userName:"张三",passwd:"123456"},loginRules:{userName:[{required:!0,trigger:"blur"}],passwd:[{required:!0,trigger:"blur",validator:e}]},loading:!1,passwdType:"passwd",redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{showPwd:function(){var e=this;"passwd"===this.passwdType?this.passwdType="":this.passwdType="passwd",this.$nextTick((function(){e.$refs.passwd.focus()}))},handleLogin:function(){var e=this;this.$refs.loginForm.validate((function(s){if(!s)return console.log("error submit!!"),!1;e.loading=!0,e.$store.dispatch("user/login",e.loginForm).then((function(){e.$router.push({path:e.redirect||"/"}),e.loading=!1}))["catch"]((function(){e.loading=!1}))}))}}}),o=i,r=(t("2017"),t("2868"),t("2877")),l=Object(r["a"])(o,n,a,!1,null,"d0b0452c",null);s["default"]=l.exports},cafe:function(e,s,t){}}]);