<template>
  <div class="section-container">
    <!-- <div class="process">
      <ul>
        <li v-for="item in  processList">
         
          <el-button type="primary">
             {{item.label}}
          </el-button>
        </li>
      </ul>
    </div> -->
    <h1 class="title">洗衣机下线外观缺陷检测</h1>
    <section class="data-show">
      <div class="data-show-left">
        <div class="data-show-left-top">
          <div class="data-show-left-top-left">
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
                <div class="data-show-right-top-result">
                  <p>检测结果：</p>
                  <h3 v-if="result === 1">合格</h3>
                  <h3 v-else-if="result === 0" style="color:red">NG</h3>
                  <h3 v-else style="color:blue">监测中</h3>
                </div>
                <el-form
                  :inline="true"
                  :model="numberValidateForm"
                  ref="numberValidateForm"
                  class="demo-ruleForm"
                >
                  <el-form-item>
                    <el-button
                      icon="el-icon-switch-button"
                      v-if="wsConnect"
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
              </div>
              <div class="data-show-right-top-list">
                <header-title title="检测项" />
                <el-table
                  size="mini"
                  :data="tableData"
                  :row-class-name="tableRowClassName"
                >
                  <el-table-column prop="detectType" label="检测项" />
                  <el-table-column
                    prop="detectInfo"
                    label="检测描述"
                  />
                  <el-table-column prop="result" label="检测结果" width="120">
                    <template slot-scope="scope">
                        <span>
                          {{scope.row.result | filiterResult}}
                        </span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="detectInfo" label="结果">
                    <template slot-scope="scope">
                      <img :src="right" v-if="scope.row.detectStatus === 1" />
                      <img :src="error" v-else-if="!scope.row.detectStatus" />
                    </template>
                  </el-table-column> -->
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
          <!-- <div class="data-show-left-bottom-right">
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
          </div> -->
        </div>
      </div>
    </section>
    <!-- <section class="data-scroll" >
      <el-button>
        上一步
      </el-button>
      <el-button type="primary" class="next">
        下一步
      </el-button>
    </section> -->
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
      processList: [{
        label: "第一步：硬件配置"
      },
      {
        label: "第二步：流程配置"
      },
      {
        label: "第三步：显示界面配置"
      },
      {
        label: "第四步：模拟运行"
      },
      {
        label: "第五步：部署"
      }
      ],
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '1%',
          right: '1%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
        },
        series: [
          {
            name: '合格',
            type: 'bar',
            data: []
          },
          {
            name: '不合格',
            type: 'bar',
            data: []
          }
        ]
      },
      optionError: {
         tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '1%',
          right: '1%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
        },
        series: [
          {
            name: '合格',
            type: 'bar',
            data: []
          },
          {
            name: '不合格',
            type: 'bar',
            data: []
          }
        ]
      },
      ws: "",
      result: 0,
      sn: "",
      pos: "",
      wsConnect: false
    };
  },
  created() {
    this.wsConnect = window.localStorage.getItem("sockect-connet");
    if (this.wsConnect) {
      this.initSocketClient();
      this.initSocket();
    }
  },
  mounted() {
    this.wsConnect = window.localStorage.getItem("sockect-connet");
    if (!this.wsConnect) {
      this.initSocketClient();
    }
  },
  beforeDestroy() {
    this.stopHandle();
  },
  methods: {
    initSocketClient() {
      const userId = window.localStorage.getItem("userId");
      this.ws = new Wsocket(`socket/pushMessage/${userId}`);
    },
    productStatisticsApi(res) {
      this.summaryList.forEach(item => {
        item.num = res.productResult[item.key];
      });
      this.optionCheck.xAxis = {
        type: "category",
        data: res.productAnalyse.map(item => item.model)
      };
      this.optionCheck.series = [
        {
          name: "合格",
          type: "bar",
          data: res.productAnalyse.map(item => item.uneligibleNum)
        },
        {
          name: "不合格",
          type: "bar",
          data: res.productAnalyse.map(item => item.eligibleNum)
        }
      ];
    },
    errorPosStatisApi(res) {
      this.optionError.xAxis = {
        type: "category",
        data: res.errorResult.map(item => item.detectType)
      };
      this.optionError.series = [
        {
          name: "合格",
          type: "bar",
          data: res.errorResult.map(item => item.uneligibleNum)
        },
        {
          name: "不合格",
          type: "bar",
          data: res.errorResult.map(item => item.eligibleNum)
        }
      ];
    },
    systemAlerm(res) {
      this.logs = res.sysAlarm.split(",").map(item => ({ log: item }));
    },
    tableRowClassName({ row, rowIndex }) {
      // if (rowIndex % 2 === 0) {
      //   return "table-row-default";
      // }
      // return "success-row";
    },
    startHandle() {
      this.initSocket();
    },
    initSocket() {
      const sendParams = JSON.stringify({
        flag: "start",
        sceneInfoId: this.$route.query.sceneInfoId
      });
      this.ws.onSendMessage(sendParams);
      window.localStorage.setItem("sockect-connet", true);
      this.wsConnect = window.localStorage.getItem("sockect-connet");
      this.ws.ws.addEventListener("message", event => {
        if (event.data === "连接成功") return;
        const res = event.data && JSON.parse(event.data);
        this.display =
          "http://" + process.env.VUE_APP_NGINX_IMG + res.imgPath.replace("/data", "");
        // 0 不合格 1合格 2监测中
        this.result = res.result;
        this.tableData = res.detectResult;
        this.sn = res.model;
        this.productStatisticsApi(res);
        this.errorPosStatisApi(res);
        this.systemAlerm(res)
        Log.prettyWarn("---Time---:", getTimesTamp());
        Log.prettyPrimary("--Websocket Receive Message: ", res);
        Log.prettyPrimary("Current display Image: ", this.display);
      });
    },
    stopHandle() {
      this.ws.onSendMessage(JSON.stringify({ "flag": "stop", "stopType": "run" }));
      window.localStorage.removeItem("sockect-connet");
      this.wsConnect = window.localStorage.getItem("sockect-connet");
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
    margin: 0px 0px 9px 0px;
    color: #0073E5;
    text-align: center;
    background:#fff;
    padding:22px 0;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .process {
    background:#fff;
    height: 69px;
    line-height: 69px;
    margin-bottom: 5px;
    justify-content: center;
    ul {
      display: flex;
      li {
        flex: 1;
        text-align:center;
      }
    }
  }
  .data-show {
    display: flex;
    .data-show-left {
      flex: 2;
      .chart {
        width: 100%;
        height: 200px;
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
           box-shadow: 0px 12px 12px 0px rgba(184,190,208,0.0900);
          border-radius: 8px;
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
          display: flex;
          flex-flow: column;
          .data-show-left-top-middle-summary {
             box-shadow: 0px 12px 12px 0px rgba(184,190,208,0.0900);
          border-radius: 8px;
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
             box-shadow: 0px 12px 12px 0px rgba(184,190,208,0.0900);
          border-radius: 14px;
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
           box-shadow: 0px 12px 12px 0px rgba(184,190,208,0.0900);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.93);
          .demo-ruleForm {
            // padding: 8px 0;
          }
          .data-show-right-top-result {
            display: flex;
            align-items: center;
            margin: 20px auto;
            padding-bottom: 20px;
            font-weight: bold;
            justify-content: flex-start;
            p {
              font-size: 16px;
            }
            h3 {
              font-size: 24px;
              font-family: PingFangSC-Medium, PingFang SC;
              color: #14dd9f;
              font-weight: 500;
            }
            margin-bottom: 10px;
          }
        }
      }
      .data-show-left-bottom {
        margin-top: 8px;
        display: flex;
        .data-show-left-bottom-left {
          width: calc(100%);
          padding: 8px;
          box-shadow: 0px 12px 12px 0px rgba(184,190,208,0.0900);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.93);
          .data-show-left-bottom-left-blog {
            li {
              display: flex;
              font-weight: 400;
              color: #666666;
              align-items: center;
              font-size: 11px;
              height: 43px;
              line-height: 43px;
              padding: 4px;
              img {
                width: 18px;
                height: 18px;
                margin-right: 5px;
              }
              &:nth-of-type(odd) {
                background: rgba(208, 225, 255, 0.3)
              }
            }
          }
        }
        .data-show-left-bottom-right {
          padding: 8px;
          // margin-left: 8px;
          background: rgba(255, 255, 255, 0.93);
          box-shadow: 0px 12px 12px 0px rgba(184,190,208,0.0900);
          border-radius: 8px;
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
  .data-scroll {
    display: flex;
    justify-content: center;
    margin: 29px 0;
    .next {
      margin-left: 48px;
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
