<template>
  <div class="dashboard-container">
    <div class="dashboard-box" v-for="item in box" @click="gotoInfo">
      <div class="deploy" v-if="item.deployStatus">已部署</div>
      <img :src="'/image/alg'+item.id+'.png'" class="boxImg" />
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {getproductList } from "@/api/device";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      formLabelWidth: "80px",
      box: [
      
      ],
     
    };
  },
  methods: {
    gotoInfo() {
      //this.$router.push({ path: "/info" });
    },
  },
  created(){
    getproductList().then(res=>{
      this.box = res.data;
    });
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
      height: 170px;
      margin-top:15px;
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
</style>
