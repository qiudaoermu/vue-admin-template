<template>
  <div class="dashboard-container">
    <div>
      <el-button
        type="primary"
        size="small"
        style="margin: 40px"
        @click="handleDeploy"
      >立即部署</el-button>
      <el-button
        type="primary"
        size="small"
        style="margin: 40px"
        @click="addDevice"
      >新增流程</el-button>
      <el-select v-model="processValue" placeholder="请选择">
        <el-option
          v-for="(item,index) in options"
          :key="index"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button
        type="primary"
        size="small"
        style="margin: 40px"
        @click="handleViewDevice"
      >查询流程</el-button>
    </div>

    <el-tabs
      v-model="activeName"
      tab-position="left"
      style="height: 160px; float: left; margin-left: 25px"
    >
      <el-tab-pane label="算法场景" name="0" />
      <el-tab-pane label="功能演示" name="1" />
      <el-tab-pane label="应用场景" name="2" />
      <el-tab-pane label="相关算法" name="3" />
    </el-tabs>
    <el-input
      v-if="activeName != 1"
      v-model="textarea[activeName]"
      type="textarea"
      :rows="17"
      style="width: 65%; float: left; margin-left: 30px"
      disabled
    />
    <img v-else src="/image/info1.jpg" style="width:60%;height:400px; margin-left: 30px">
    <div style="clear: both" />
    <el-dialog
      title="自定义场景"
      :visible.sync="dialogFormVisible"
      width="460px"
      custom-class="deviceContainer"
    >
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item
          label="型号名称:"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="型号描述:"
          :label-width="formLabelWidth"
          prop="descInfo"
        >
          <el-input v-model="form.descInfo" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddDevice">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSceneProcess } from "@/api/process";
export default {
  name: "Dashboard",
  data() {
    return {
      processValue: "",
      options: [],
      form: {
        name: "",
        descInfo: ""
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: "请选择设备名称", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择设备类型", trigger: "change" }
        ],
        descInfo: [
          { required: true, message: "请添加描述", trigger: "change" }
        ],
        port: [{ required: true, message: "请选择IP端口", trigger: "change" }]
      },
      activeName: 0,
      box: [
        { img: "123.png", isdeploy: true },
        { img: "123.png" },
        { img: "123.png" },
        { img: "123.png" },
        { img: "123.png" }
      ],

      textarea: [
        "基于海尔家电生产制造多年经验积累，整合了6大类28种缺陷检测模型，开箱即用，同时针对生产流程PLC、MES系统也可以一一键对接。算子检测准确率高，稳定性好。",
        "",
        "",
        "",
        ""
      ]
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  mounted() {
    this.main();
  },
  methods: {
    handleDeploy() {
      this.$router.push({
        path: "/station/index",
        query: {
          sceneInfoId: this.$route.query.id,
          procId: this.processValue
        }
      });
    },
    main() {
      getSceneProcess({
        id: this.$route.query.id
      }).then(res => {
        this.options = res.data;
        console.log(res.data, "data-----");
      });
    },
    handleAddDevice() {
      this.dialogFormVisible = false;
      this.$router.push({
        path: "/process/link",
        query: {
          sceneInfoId: this.$route.query.id,
          name: this.form.name,
          descInfo: this.form.descInfo
        }
      });
    },
    handleViewDevice() {
      if (!this.processValue) {
        this.$message.warning("请选择型号!!");
        return;
      }
      this.$router.push({
        path: "/process/link",
        query: {
          sceneInfoId: this.$route.query.id,
          procId: this.processValue
        }
      });
    },
    addDevice() {
      this.dialogFormVisible = true;
    }
  }
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
