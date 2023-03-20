<script>
export default {
  data() {
    return {
      json: {
        "__config__": {
          "label": "单行文本",
          "labelWidth": null,
          "showLabel": true,
          "changeTag": true,
          "tag": "el-input",
          "tagIcon": "input",
          "required": true,
          "layout": "colFormItem",
          "span": 12,
          "document": "https://element.eleme.cn/#/zh-CN/component/input",
          "regList": [{
            "pattern": "/^1(3|4|5|7|8|9)\\d{9}$/",
            "message": "手机号格式错误"
          }]
        },
        "__slot__": {
          "prepend": "",
          "append": ""
        },
        "__vModel__": "mobile",
        "placeholder": "请输入手机号",
        "style": {
          "width": "100%"
        },
        "clearable": true,
        "prefix-icon": "el-icon-mobile",
        "suffix-icon": "",
        "maxlength": 11,
        "show-word-limit": true,
        "readonly": false,
        "disabled": false
      }
    };
  },
  render(h) {
    const config = this.json.__config__;
    const listeners = this.json;
    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    if (config.showLabel === false) labelWidth = "0";
    return (
      <el-col span={config.span}>
        <el-form-item label-width={labelWidth} prop={this.json.__vModel__}
          label={config.showLabel ? config.label : ""}>
          <render conf={this.json} {...{ on: listeners }} />
        </el-form-item>
      </el-col>
    );
  }
};
</script>

<style>

</style>
