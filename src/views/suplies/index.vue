<template>
  <div class="dashboard-container">
    <el-dialog title="自定义设备" :visible.sync="dialogFormVisible" width="460px" custom-class="deviceContainer">
      <el-form :model="form">
        <el-form-item label="设备名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备类型:" :label-width="formLabelWidth" >
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="通讯协议:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="IP端口:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="驱动:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <div class="dashboard-box" v-for="item in box">
      <img :src="item.img" class="boxImg" />
      <span>sadas</span>
    </div>
    <div class="dashboard-box" @click="addDevice">
      <div class="dashboard-icon">
        <div><i class="el-icon-document-add"></i></div>
        <div><span style="font-size: 14px">新增内容</span></div>
      </div>
    </div>
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
      formLabelWidth: "80px",
      box: [
        { img: "123.png" },
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
 ::v-deep .deviceContainer{
  .el-form-item__label{
        font-weight: 400 !important;
        color: rgba(102, 102, 102, 1);
    }
}
.dashboard {
  &-container {
    margin: 30px;
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
    margin-left: 1.5%;
    width: 23.5%;
    height: 220px;
    background: white;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: rgba(102, 102, 102, 1);
    .boxImg {
      width: 96%;
      height: 170px;
    }
    &:hover {
      color: rgba(0, 75, 170, 0.8);
      box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.05);
      cursor: pointer;
    }
  }
}
</style>
