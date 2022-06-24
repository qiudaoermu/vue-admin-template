<template>
  <div class="dashboard-container">
    <div><el-button type="primary" size="small" style="margin: 40px"
      >立即部署</el-button
    ></div>
    <el-tabs tab-position="left" style="height:160px;float:left;margin-left:25px" v-model="activeName">
      <el-tab-pane label="算法场景" name="0"></el-tab-pane>
      <el-tab-pane label="功能演示" name="1"></el-tab-pane>
      <el-tab-pane label="应用场景" name="2"></el-tab-pane>
      <el-tab-pane label="相关算法" name="3"></el-tab-pane>
    </el-tabs>
    <el-input
      type="textarea"
      :rows="17"
      v-model="textarea"
      style="width:65%;float:left;margin-left:30px"
      disabled
    >
    </el-input>
    <div style="clear:both"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      activeName:0,
      formLabelWidth: "80px",
      box: [
        { img: "123.png", isdeploy: true },
        { img: "123.png" },
        { img: "123.png" },
        { img: "123.png" },
        { img: "123.png" },
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      dialogFormVisible: false,
    };
  },
  methods: {
    addDevice() {
      this.dialogFormVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .deviceContainer {
  .el-form-item__label {
    font-weight: 400 !important;
    color: rgba(102, 102, 102, 1);
  }
}
.dashboard {
  &-container {
    margin: 10px;
    background: white;
    height: 600px;
  }
}
</style>
