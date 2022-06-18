<template>
  <div class="main">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="家电外观缺陷检测" name="first">
        <test-result-first />
      </el-tab-pane>
      <el-tab-pane label="家电外观缺陷检测" name="second"
        >家电外观缺陷检测</el-tab-pane
      >
      <el-tab-pane label="家电外观缺陷检测" name="fourth"
        >家电外观缺陷检测</el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script>
import testResultFirst from "./testResultFirst";
export default {
  name: "Index",
  components: {
    testResultFirst,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  created() {},
  mounted() {
    this.websocket();
  },
  methods: {
    websocket(teamId, studentId) {
      this.ws = new WebSocket(
        `ws://${process.env.VUE_APP_SOCKET_URL}/socket/pushMessage/2`
      )
      this._onSendMessage()
      this._onGetMessage()
      this._onCatchErr()
      this._onClose()
    },
    _onSendMessage() {
      this.ws.sendMessage = (params) => {
        if (this.ws.readyState === 1) {
          this.ws.send(params);
        } else {
          this.ws.addEventListener("open", (e) => {
            console.log(this.ws.readyState)
            this.ws.send(params)
          })
        }
      }
    },
    _onCatchErr() {
      this.ws.addEventListener("error", function (event) {
        console.log("Error from server ", event.data);
      });
    },
    _onClose() {
      this.ws.addEventListener("close", (e) => {
        console.log(
          "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
        );
        console.log("Ws has closed");
      });
    },
    _onGetMessage() {
      this.ws.addEventListener("message", (event) => {
        const result = JSON.parse(event.data);
      })
    }
  }
};

</script>
<style lang="scss" scoped>
.main {
  background: #2d6ec2;
  padding: 8px;
  height: 100%;
  width: 100%;
}
 ::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item {
  background:#fff !important;
}
</style>
