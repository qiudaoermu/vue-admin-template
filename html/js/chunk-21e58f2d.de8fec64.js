(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21e58f2d"],{"0467":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"dashboard-container"},[o("el-dialog",{attrs:{title:"自定义设备",visible:e.dialogFormVisible,width:"460px","custom-class":"deviceContainer"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[o("el-form",{ref:"ruleForm",attrs:{model:e.form,rules:e.rules}},[o("el-form-item",{attrs:{label:"设备名称:","label-width":e.formLabelWidth,prop:"name"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),o("el-form-item",{attrs:{label:"设备类型:","label-width":e.formLabelWidth,prop:"type"}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择设备类型"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},[o("el-option",{attrs:{label:"相机",value:"1"}}),o("el-option",{attrs:{label:"PLC",value:"2"}}),o("el-option",{attrs:{label:"机器人",value:"3"}}),o("el-option",{attrs:{label:"扫码枪",value:"4"}}),o("el-option",{attrs:{label:"光源",value:"5"}})],1)],1),o("el-form-item",{attrs:{label:"通讯协议:","label-width":e.formLabelWidth,prop:"protocol"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.protocol,callback:function(t){e.$set(e.form,"protocol",t)},expression:"form.protocol"}})],1),o("el-form-item",{attrs:{label:"IP端口:","label-width":e.formLabelWidth,prop:"port"}},[o("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.port,callback:function(t){e.$set(e.form,"port",t)},expression:"form.port"}})],1),o("el-form-item",{attrs:{label:"驱动:","label-width":e.formLabelWidth}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择驱动"},model:{value:e.form.drive,callback:function(t){e.$set(e.form,"drive",t)},expression:"form.drive"}},[o("el-option",{attrs:{label:"Basler modal3",value:"1"}})],1)],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:e.addDevice}},[e._v("确 定")])],1)],1),e._l(e.box,(function(t){return o("div",{staticClass:"dashboard-box"},[o("div",{class:"boxImg"+t.type},[o("img",{staticClass:"img",attrs:{src:"/bg/device"+t.type+".png"}})]),o("div",[e._v(e._s(t.name))])])})),o("div",{staticClass:"dashboard-box",on:{click:function(t){e.dialogFormVisible=!0}}},[e._m(0)])],2)},r=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"dashboard-icon"},[o("div",[o("i",{staticClass:"el-icon-document-add"})]),o("div",[o("span",{staticStyle:{"font-size":"14px"}},[e._v("新增内容")])])])}],l=o("5530"),i=o("2f62"),s=o("aa98"),n={name:"Dashboard",computed:Object(l["a"])({},Object(i["b"])(["name"])),data:function(){return{rules:{name:[{required:!0,message:"请选择设备名称",trigger:"change"}],type:[{required:!0,message:"请选择设备类型",trigger:"change"}],protocol:[{required:!0,message:"请选择通讯协议",trigger:"change"}],port:[{required:!0,message:"请选择IP端口",trigger:"change"}]},formLabelWidth:"90px",box:[],form:{name:"",drive:"",port:"",protocol:"",type:""},dialogFormVisible:!1}},methods:{addDevice:function(){var e=this;this.$refs["ruleForm"].validate((function(t){if(!t)return!1;Object(s["a"])(e.form).then((function(t){e.dialogFormVisible=!1,e.getList()}))}))},getList:function(){var e=this;Object(s["b"])().then((function(t){e.box=t.data}))}},created:function(){this.getList()}},c=n,d=(o("fb52"),o("2877")),m=Object(d["a"])(c,a,r,!1,null,"b501eede",null);t["default"]=m.exports},3915:function(e,t,o){},aa98:function(e,t,o){"use strict";o.d(t,"b",(function(){return r})),o.d(t,"a",(function(){return l}));var a=o("b775");function r(e){return Object(a["a"])({url:"/screen/getDeviceList",method:"post",params:e})}function l(e){return Object(a["a"])({url:"/screen/addDevice",method:"post",data:e})}},fb52:function(e,t,o){"use strict";o("3915")}}]);