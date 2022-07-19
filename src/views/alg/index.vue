<template>
  <div class="dashboard-container">
     <el-dialog
      title="自定义场景"
      :visible.sync="dialogFormVisible"
      width="460px"
      custom-class="deviceContainer"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          label="场景名称:"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="场景描述:"
          :label-width="formLabelWidth"
          prop="descInfo"
        >
          <el-input v-model="form.descInfo" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item
          label="场景图片:"
          :label-width="formLabelWidth"
          prop="protocol"
        >
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
         <el-button v-else size="small" type="primary">点击上传</el-button>
        </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDevice">确 定</el-button>
      </div>
    </el-dialog>
    <div class="dashboard-box" v-for="item in box" @click="gotoInfo(item)">
      <div class="deploy" v-if="item.deployStatus">已部署</div>
      <img :src="item.imageUrl" class="boxImg" />
      <span>{{ item.sceneName }}</span>
    </div>
    <div class="dashboard-box" @click="dialogFormVisible = true">
      <div class="dashboard-icon">
        <div><i class="el-icon-document-add"></i></div>
        <div><span style="font-size: 14px">新增内容</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getproductList } from "@/api/device";
import { getProcessList, getSceneInfoList, saveSceneInfo } from "@/api/process"
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      imageUrl: "",
      action: process.env.VUE_APP_BASE_API + '/file/upload',
      fileList: [
        { name: 'food.jpeg',url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      rules: {
        name: [
          { required: true, message: "请选择设备名称", trigger: "change" },
        ],
        type: [
          { required: true, message: "请选择设备类型", trigger: "change" },
        ],
        descInfo: [
          { required: true, message: "请添加描述", trigger: "change" },
        ],
        port: [{ required: true, message: "请选择IP端口", trigger: "change" }],
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      box: [],
      form: {
        name: "",
        descInfo: ""
      }
    }
  },
  methods: {
    addDevice() {
      this.dialogFormVisible = false;
      // this.$router.push({ path: '/process/link', query: { 
      //   descInfo: this.form.descInfo,
      //   name: this.form.name
      // }})

      saveSceneInfo({
        sceneDesc: this.form.descInfo,
        sceneName: this.form.name,
        imageUrl: this.imageUrl
      }).then(res => {
        this.$router.push({ path: "/info" ,query: {
          id: res.data.id
        }});
      })
    },
    gotoInfo(item) {
      this.$router.push({ path: "/info" ,query: {
        id: item.id
      }});
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data.fileUrl;
      let reader = new FileReader();
      reader.readAsDataURL(file.raw)
      reader.onload = e => {
        // console.log(e, "e")
        // this.imageUrl = e.target.result;
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return  isLt2M;
    }
  },
  created(){
    getSceneInfoList().then(res => {
       this.box = res.data;
      console.log(res.data, "------res")
    })
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
    position: relative;
    width: 23%;
    height: 220px;
    background: white;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: rgba(102, 102, 102, 1);
    .boxImg {
      width: 94%;
      height: 160px;
      margin-top:16px;
    }
    &:hover {
      color: rgba(0, 75, 170, 0.8);
      box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.05);
      cursor: pointer;
    }
    .deploy {
      position: absolute;
      color: #ffffff;
      width: 50px;
      height: 24px;
      background: #fc8b7f;
      border-radius: 2px;
      right: 0px;
      text-align: center;
      line-height: 24px;
    }
  }
}
.avatar-uploader  {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
