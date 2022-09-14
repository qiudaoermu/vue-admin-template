<template>
  <div class="dashboard-container">
    <el-dialog
      title="自定义设备"
      :visible.sync="dialogFormVisible"
      width="460px"
      custom-class="deviceContainer"
    >
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item
          label="设备名称:"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="设备类型:"
          :label-width="formLabelWidth"
          prop="type"
        >
          <el-select
            v-model="form.type"
            placeholder="请选择设备类型"
            style="width: 100%"
          >
            <el-option label="相机" value="1" />
            <el-option label="PLC" value="2" />
            <el-option label="机器人" value="3" />
            <el-option label="扫码枪" value="4" />
            <el-option label="光源" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="通讯协议:"
          :label-width="formLabelWidth"
          prop="protocol"
        >
          <el-input v-model="form.protocol" autocomplete="off" />
        </el-form-item>
        <el-form-item label="IP端口:" :label-width="formLabelWidth" prop="port">
          <el-input v-model="form.port" autocomplete="off" />
        </el-form-item>
        <el-form-item label="驱动:" :label-width="formLabelWidth">
          <el-select
            v-model="form.drive"
            placeholder="请选择驱动"
            style="width: 100%"
          >
            <el-option label="Basler modal3" value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDevice">确 定</el-button>
      </div>
    </el-dialog>
    <div v-for="(item, index) in box" class="dashboard-box">
      <div :class="'boxImg' + item.type">
        <img :src="'/bg/device' + (index + 1) + '.png'" class="img">
      </div>
      <div>{{ item.name }}</div>
    </div>
    <div class="dashboard-box" @click="dialogFormVisible = true">
      <div class="dashboard-icon">
        <div><i class="el-icon-document-add" /></div>
        <div><span style="font-size: 14px">新增内容</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getDeviceList, addDevice } from "@/api/device";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "请选择设备名称", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择设备类型", trigger: "change" }
        ],
        protocol: [
          { required: true, message: "请选择通讯协议", trigger: "change" }
        ],
        port: [{ required: true, message: "请选择IP端口", trigger: "change" }]
      },
      formLabelWidth: "90px",
      box: [],
      form: {
        name: "",
        drive: "",
        port: "",
        protocol: "",
        type: ""
      },
      dialogFormVisible: false
    };
  },

  created() {
    this.getList();
  },
  methods: {
    addDevice() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          addDevice(this.form).then((res) => {
            this.dialogFormVisible = false;
            this.getList();
          });
        } else {
          return false;
        }
      });
    },
    getList() {
      getDeviceList().then((res) => {
        this.box = res.data;
      });
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
  width: 100%;
  &-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  &-icon {
    font-size: 36px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &-box {
    width: 23%;
    margin-left: 1.5%;
    height: 220px;
    background: white;
    font-size: 14px;
    margin-top: 20px;
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    color: rgba(102, 102, 102, 1);
    .img {
      width: 153px;
      height: 108px;
    }
    .boxImg {
      width: 92%;
      height: 170px;
      &1 {
        background: #f1f8ff;
        width: 92%;
        height: 170px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &2 {
        background: #edfcff;
        width: 92%;
        height: 170px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &3 {
        background: #f1fef7;
        width: 92%;
        height: 170px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &4 {
        background: #fff9f0;
        width: 92%;
        height: 170px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &5 {
        background: #fffae9;
        width: 92%;
        height: 170px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &:hover {
      color: rgba(0, 75, 170, 0.8);
      box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.05);
      cursor: pointer;
    }
  }
}
</style>
