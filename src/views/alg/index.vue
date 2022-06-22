<template>
  <div class="dashboard-container">
    <div class="dashboard-box" v-for="item in box" @click="gotoInfo">
      <div class="deploy" v-if="item.isdeploy">已部署</div>
      <img :src="item.img" class="boxImg" />
      <span>sadas</span>
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
    };
  },
  methods: {
    gotoInfo() {
      this.$router.push({ path: "/info" });
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
