<template>
  <div class="section-container">
    <h1 class="title">洗衣机下线外观缺陷检测</h1>
    <section class="data-show">
      <div class="data-show-left">
        <div class="data-show-left-top">
          <div class="data-show-left-top-left">
            <header-title title="数据分析" class="title1" />
            <header-title title="产品合格率分析" />
            <v-chart class="chart-top chart" :option="optionCheck" />
            <header-title title="错误位置统计" />
            <v-chart class="chart-bottom chart" :option="optionError" />
          </div>
          <div class="data-show-left-top-middle">
            <div class="data-show-left-top-middle-summary">
              <li v-for="(item, key) of summaryList" :key="key">
                <h4>{{ item.num }}</h4>
                <p>{{ item.title }}</p>
              </li>
            </div>
            <div class="data-show-left-top-image">
              <header-title title="当前检测位置" />
              <img :src="display" />
            </div>
          </div>
          <div class="data-show-left-top-right">
            <div class="data-show-left-top-right-top">
              <div class="data-show-right-top-action">
                <el-form
                  :inline="true"
                  :model="numberValidateForm"
                  ref="numberValidateForm"
                  class="demo-ruleForm"
                >
                  <el-form-item>
                    <el-button
                      icon="el-icon-switch-button"
                      v-if="ws"
                      type="danger"
                      @click="stopHandle()"
                    >
                      停止
                    </el-button>
                    <el-button
                      type="primary"
                      icon="el-icon-caret-right"
                      v-else
                      @click="startHandle()"
                    >
                      开始
                    </el-button>
                  </el-form-item>
                  <el-form-item label="产品编号:">
                    <h2 style="color:green">{{ sn }}</h2>
                  </el-form-item>
                </el-form>
                <div class="data-show-right-top-result">
                  <p>检测结果：</p>
                  <div v-if="pos === 5">
                    <h3 v-if="result">合格</h3>
                    <h3 style="color:red" v-else>NG</h3>
                  </div>
                </div>
              </div>
              <div class="data-show-right-top-list">
                <header-title title="检测项" />
                <el-table
                  size="mini"
                  :data="tableData"
                  :row-class-name="tableRowClassName"
                >
                  <el-table-column prop="name" label="检测项" width="80" />
                  <el-table-column
                    prop="detectInfo"
                    label="检测标准"
                    width="80"
                  />
                  <el-table-column prop="result" label="检测结果" width="120" />
                  <el-table-column prop="detectInfo" label="结果">
                    <template slot-scope="scope">
                      <img :src="right" v-if="scope.row.detectStatus === 1" />
                      <img :src="error" v-else-if="!scope.row.detectStatus" />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div class="data-show-left-bottom">
          <div class="data-show-left-bottom-left">
            <header-title title="报警信息" />
            <ul class="data-show-left-bottom-left-blog">
              <li v-for="item in logs">
                <img :src="admin" />
                <p>
                  {{ item.log }}
                </p>
              </li>
            </ul>
          </div>
          <div class="data-show-left-bottom-right">
            <header-title
              :title="'设备状态' + '(' + connectionStatesText + ')'"
            />
            <div class="receiver-user">
              <div class="content-wrapper">
                <ul class="list" :class="{ 'cn-ative': !connectionStates }">
                  <li>
                    <span class="key">机械臂:</span>
                    <span class="value bold-size">127.0.0.1:57156</span>
                  </li>
                  <li>
                    <span class="key">PLC:</span>
                    <span class="value bold-size">127.0.0.1:502</span>
                  </li>
                  <li>
                    <span class="key">TCP扫码枪：</span>
                    <span class="value bold-size"></span>
                  </li>
                  <li>
                    <span class="key">A面相机：</span>
                    <span class="value bold-size"> </span>
                  </li>
                </ul>
                <ul class="list" :class="{ 'cn-ative': !connectionStates }">
                  <li>
                    <span class="key">RFID扫码枪：</span>
                    <span class="value bold-size">127.0.0.1:57156</span>
                  </li>
                  <li>
                    <span class="key">B面相机：</span>
                    <span class="value bold-size">127.0.0.1:502</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="data-scroll" />
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";
import admin from "@/assets/log.png";
import right from "@/assets/right.png";
import error from "@/assets/error.png";
import display from "@/assets/display.png";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart from "vue-echarts";
import Wsocket from "../../../package/socket.js";
import Log from "../../../package/Log";
import { getTimesTamp } from "../../../package/utils";
use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default {
  name: "TestResultFirst",
  components: {
    VChart
  },
  watch: {
    connectionStates(record) {
      this.connectionStatesText = record === true ? "已连接" : "未连接";
    }
  },
  filters: {
    filiterResult(res) {
      if (res === 1) {
        return "合格";
      } else {
        return "NG";
      }
    }
  },
  data() {
    return {
      connectionStatesText: "未连接",
      connectionStates: false,
      admin,
      right,
      error,
      display,
      detects: {
        1: "二维码",
        2: "缝隙",
        3: "划伤划痕",
        4: "模版匹配",
        5: "螺丝检测"
      },
      tableData: [
        {
          name: "二维码",
          result: "",
          key: 1,
          detectInfo: "",
          detectStatus: 2
        },
        {
          name: "缝隙",
          result: "",
          key: 2,
          detectInfo: "",
          detectStatus: 2
        },
        {
          name: "划伤划痕",
          result: "",
          key: 3,
          detectInfo: "",
          detectStatus: 2
        },
        {
          name: "模版匹配",
          result: "",
          key: 4,
          detectInfo: "",
          detectStatus: 2
        },
        {
          name: "螺丝检测",
          result: "",
          key: 5,
          detectInfo: "",
          detectStatus: 2
        }
      ],
      logs: [
        { log: "2022-06-13  15:30:30.537: CPU使用率达到87%！" },
        { log: "2022-06-13  18:30:10.537: CPU使用率达到70%！" },
        { log: "2022-06-13  19:30:42.537: CPU使用率达到90%！" }
      ],
      numberValidateForm: {
        time: 0
      },
      summaryList: [
        { title: "总数", num: 0, key: "total" },
        { title: "合格", num: 0, key: "eligibleNum" },
        { title: "不合格", num: 0, key: "uneligibleNum" },
        { title: "合格率", num: 0, key: "eligibleRate" }
      ],
      optionCheck: {
        xAxis: {
          type: "category",
          data: ["合格", "不合格"]
        },
        yAxis: {
          type: "value"
        },
        grid: {
          left: "15%",
          top: "5%",
          right: "5%",
          bottom: "20%"
        },
        series: [
          {
            data: [
              0,
              {
                value: 0,
                itemStyle: {
                  color: "#a90000"
                }
              }
            ],
            type: "bar"
          }
        ]
      },
      optionError: {
        xAxis: {
          type: "category",
          data: ["合格", "不合格"]
        },
        yAxis: {
          type: "value"
        },
        grid: {
          left: "15%",
          top: "5%",
          right: "5%",
          bottom: "20%"
        },
        series: [
          {
            data: [],
            type: "bar"
          }
        ]
      },
      ws: "",
      result: "",
      sn: "",
      pos: ""
    };
  },
  created() {
    let socketConnet = window.localStorage.getItem("sockect-connet");
    if (socketConnet) {
      this.initSocket();
    }
  },
  mounted() {},
  methods: {
    productStatisticsApi(res) {
      this.summaryList.forEach(item => {
        item.num = res[item.key];
      });
      this.optionCheck.series[0].data[0] = this.summaryList[1].num;
      this.optionCheck.series[0].data[1].value = this.summaryList[2].num;
    },
    errorPosStatisApi(error) {
      error.forEach(item => {
        item.key = this.detects[item.pos];
      });
      this.optionError.xAxis.data = error.map(item => item.key);
      this.optionError.series[0].data = error.map(item => item.num);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "table-row-default";
      }
      return "success-row";
    },
    startHandle() {
      window.localStorage.setItem("sockect-connet", true);
      this.initSocket();
    },
    initSocket() {
      this.ws = new Wsocket("socket/pushMessage/1");
      const sendParams = JSON.stringify({
        sceneInfoId: this.$route.query.sceneInfoId
      });
      this.ws.onSendMessage(sendParams);
      this.ws.ws.addEventListener("message", event => {
        if (event.data === "连接成功") return;
        const res = event.data && JSON.parse(event.data);
        if (res.cs === "close") {
          this.connectionStates = false;
        }
        if (res.cs === "connect") {
          this.connectionStates = true;
        }
        this.connectionStatesText =
          this.connectionStates === true ? "已连接" : "未连接";
        if (!res.result) return;
        res.result.forEach(item => {
          item.name = this.detects[item.pos];
        });
        const [firstDetect] = res.result;
        this.display =
          "http://" +
          process.env.VUE_APP_NGINX_IMG +
          firstDetect.imgUrl.replace("/home", "");

        this.result = res.result.every(item => item.detectStatus === 1);
        this.tableData = res.result;
        this.sn = firstDetect.sn;
        this.productStatisticsApi(res.product);
        this.errorPosStatisApi(res.error);
        this.pos = res.pos;
        Log.prettyWarn("---Time---:", getTimesTamp());
        Log.prettyPrimary("--Websocket Receive Message: ", res);
        Log.prettyPrimary("Current display Image: ", this.display);
      });
    },
    stopHandle() {
      window.localStorage.removeItem("sockect-connet");
      window.location.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
ul,
li,
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}
.section-container {
  .title {
    font-size: 22px;
    font-weight: 500;
    margin: 16px 0;
    color: #ffffff;
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .data-show {
    display: flex;
    .data-show-left {
      flex: 2;
      .chart {
        width: 100%;
        height: 120px;
      }
      .chart-top {
        margin-bottom: 30px;
        margin-top: 30px;
      }
      .chart-bottom {
        margin-top: 30px;
      }
      .data-show-left-top {
        display: flex;
        .data-show-left-top-left {
          margin-right: 8px;
          width: calc(25% - 8px);
          padding: 8px;
          background: rgba(255, 255, 255, 0.93);
          .title1 {
            border-bottom: 1px solid #ddd;
            padding: 8px 0;
          }
        }
        .data-show-left-top-middle {
          width: 40%;
          // margin:0 8px;
          border-right: 1px solid #ddd;
          display: flex;
          flex-flow: column;
          .data-show-left-top-middle-summary {
            display: flex;
            background: rgba(255, 255, 255, 0.93);
            justify-content: center;
            padding: 8px 0;
            li {
              flex: 1;
              text-align: center;
              &:nth-of-type(1) {
                h4 {
                  color: red;
                }
              }
              &:nth-of-type(2) {
                h4 {
                  color: #14dd9f;
                }
              }
              &:nth-of-type(3) {
                h4 {
                  color: #fc8b7f;
                }
              }
              &:nth-of-type(4) {
                h4 {
                  color: #2bb9ff;
                }
              }
              h4 {
                font-size: 20px;
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
              }
              p {
                margin-top: 3px;
              }
            }
          }
          .data-show-left-top-image {
            width: 100%;
            padding: 8px;
            height: 211px;
            flex: 1;
            margin-top: 8px;
            background: rgba(255, 255, 255, 0.93);
            img {
              max-width: 100%;
            }
          }
        }
        .data-show-left-top-right {
          margin-left: 8px;
          width: 35%;
          padding: 8px;
          background: rgba(255, 255, 255, 0.93);
          .demo-ruleForm {
            border-bottom: 1px solid #ddd;
            // padding: 8px 0;
          }
          .data-show-right-top-result {
            display: flex;
            align-items: center;
            width: 60%;
            margin: 20px auto;
            padding-bottom: 20px;
            justify-content: center;
            p {
              font-size: 16px;
            }
            h3 {
              font-size: 24px;
              font-family: PingFangSC-Medium, PingFang SC;
              color: #14dd9f;
              font-weight: 500;
            }
            border-bottom: 1px solid #ddd;
            margin-bottom: 10px;
          }
        }
      }
      .data-show-left-bottom {
        margin-top: 8px;
        display: flex;
        .data-show-left-bottom-left {
          width: calc(65%);
          padding: 8px;
          background: rgba(255, 255, 255, 0.93);
          margin-right: 8px;
          border-right: 1px solid #ddd;
          .data-show-left-bottom-left-blog {
            li {
              display: flex;
              font-weight: 400;
              color: #666666;
              align-items: center;
              padding: 4px;
              img {
                width: 18px;
                height: 18px;
                margin-right: 5px;
              }
              &:nth-of-type(odd) {
                background: #dce9fb;
              }
            }
          }
        }
        .data-show-left-bottom-right {
          padding: 8px;
          // margin-left: 8px;
          background: rgba(255, 255, 255, 0.93);
          width: 35%;
          .receiver-user {
            margin: 0 auto;
            text-align: center;
            font-family: Microsoft YaHei;
            img {
              width: 30px;
              margin-bottom: 8px;
            }
            .title {
              margin-bottom: 8px;
              font-size: 16px;
              font-weight: bold;
              line-height: 18px;
              color: #333333;
            }
            .content-wrapper {
              margin: 0px auto;
              border-radius: 10px;
              display: flex;
              .ticket {
                font-size: 16px;
                line-height: 24px;
                display: flex;
                align-items: center;
                .name {
                  color: #333333;
                }
                .type {
                  color: #ffffff;
                  background: #21b872;
                  border-radius: 2px;
                  margin-left: 6px;
                  padding: 2px 5px;
                }
              }
              .list {
                &.cn-ative {
                  color: red;
                  .key {
                    color: red;
                  }
                }
                margin: 20px auto;
                li {
                  display: flex;
                  margin: 8px 0;
                  font-size: 14px;
                  // & > :nth-of-type(1) {
                  //   color: red;
                  // }
                  .key {
                    // color: #999999;
                    min-width: 60px;
                    display: block;
                    text-align: left;
                  }
                  .value {
                    color: #333333;
                    margin-left: 10px;
                  }
                }
              }
            }
          }
        }
      }
      .data-show-right-top-list {
        table {
          img {
            width: 18px;
            display: block;
          }
        }
      }
    }
  }
}
::v-deep .el-form-item {
  margin-bottom: 12px;
}
::v-deep .el-table .warning-row {
  background: oldlace;
}

::v-deep .el-table .success-row {
  background: #f0f9eb;
}
::v-deep .el-table .table-row-default {
  background: #f1f4f9;
}
</style>
