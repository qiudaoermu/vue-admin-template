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
  components: {},
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
        `ws://${process.env.VUE_APP_SOCKET_URL}/websocket/${teamId}/${studentId}`
      );
      this.ws.addEventListener("close", (e) => {
        console.log(
          "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
        );
        console.log("Ws has closed");
      });
      // watch error
      this.ws.addEventListener("error", function (event) {
        console.log("Error from server ", event.data);
      });
      this.ws.sendMessage = (params) => {
        if (this.ws.readyState === 1) {
          this.ws.send(params);
        } else {
          this.ws.addEventListener("open", (e) => {
            console.log(this.ws.readyState);
            this.ws.send(params);
          });
        }
      };
    },
    _onGetMessage() {
      this.ws.addEventListener("message", (event) => {
        const json = JSON.parse(event.data);
        // 答案列表
        this.messageType = Number(json.messageType);
        // 5,6获取答案试题
        if (this.messageType === 5 || this.messageType === 6) {
          this.start = 1;
          this.answerTextArea = "";
          this.sockQuestionAnswer(json);
        } else if (this.messageType === 3) {
          this.message = "";
          if (this.model === 2) {
            this.getChat(json);
          }
        } else if (this.messageType === 7) {
          // 考试结束
          this.showConfirmEnd();
        } else if (this.messageType === 8) {
          // 获取角色列表
          this.sockGetTeamRoles(json);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  background: #2d6ec2;
  padding: 8px;
  height: 100%;
  width: 100%;
}
</style>
