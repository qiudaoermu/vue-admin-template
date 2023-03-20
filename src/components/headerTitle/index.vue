<template>
  <div class="pageTitlecomment">
    <div class="headerTitle">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "HeaderTitle",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.pageTitlecomment {
  margin-bottom: 20px;
  box-sizing: border-box;
  .headerTitle {
    width: 100%;
    box-sizing: border-box;
    height: 12px;
    font-weight: bold;
    color: #363636;
    font-size: 12px;
    padding-left: 12px;
    border-left: 3px solid #0073E5;
    box-sizing: border-box;
  }
}
</style>
