<template>
  <div class="pageTitlecomment">
    <div class="headerTitle">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'headerTitle',
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: ''
    }
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
    color: #333333;
    font-size: 16px;
    padding-left: 12px;
    border-left: 5px solid #004BAA;
    box-sizing: border-box;
  }
}
</style>
