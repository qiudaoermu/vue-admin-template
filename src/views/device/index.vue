<template>
  <div class="dashboard-container">
    <div class="dashboard-box" v-for="item in box">
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
      box: [
        { img: "123.png" },
        { img: "123.png" },
        { img: "123.png" },
        { img: "123.png" },
        { img: "123.png" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &-box {
    width: 24%;
    height: 220px;
    background: white;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .boxImg {
      width: 96%;
      height: 170px;
    }
  }
}
</style>
