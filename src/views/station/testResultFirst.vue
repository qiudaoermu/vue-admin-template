<template>
  <div class="section-container">
    <h1 class="title">上海海尔洗涤电器有限公司N码合—视觉检测</h1>
    <section class="data-show">
      <div class="data-show-left">
        <div class="data-show-left-top">
          <div class="data-show-left-top-left">
            <header-title title='数据分析'  class="title1"/>
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
                <el-form :inline="true" :model="numberValidateForm" ref="numberValidateForm"  class="demo-ruleForm">
                  <el-form-item>
                     <el-button type="primary" v-if="ws" size="small" @click="stopHandle()">
                      停止
                    </el-button>
                    <el-button type="primary" v-else size="small" @click="startHandle()">
                      开始
                    </el-button>
                   
                  </el-form-item>
                   <el-form-item label='产品编号:'>
                    {{sn}}
                  </el-form-item>
                </el-form>
                <div class="data-show-right-top-result">
                  <p>检测结果：</p>
                  <div v-if="sn">
                    <h3 v-if="result===1">合格</h3>
                    <h3 style='color:red' v-else>NG</h3>
                  </div>
                
                </div>
              </div>
              <div class="data-show-right-top-list">
                <header-title title="检测项" />
                <el-table
                  size='mini'
                  :data="tableData"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
                  <el-table-column
                    prop="name"
                    label="检测项"
                    width="180"
                  />
                  <el-table-column
                    prop="result"
                    label="检测结果"
                    width="180"
                  />
                  <el-table-column
                    prop="detectInfo"
                    label="结果">
                    <template slot-scope="scope">
                      <img :src="right" v-if="scope.row.detectStatus === 1" />
                      <img :src="error"  v-else-if="!scope.row.detectStatus"/>
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
            <header-title title="设备状态" />
            <div class="receiver-user">
              <div class="content-wrapper">
                <ul class="list">
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
                    <span class="value bold-size">
                    </span>
                  </li>
                </ul>
                <ul class="list">
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
import admin from '@/assets/log.png';
import right from '@/assets/right.png';
import error from '@/assets/error.png';
import display from "@/assets/display.png";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import Wsocket from "../package/socket.js"
import { productStatistics,errorPosStatis } from '@/api/state'
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
  filters: {
    filiterResult(res) {
      if (res === 1) {
        return "合格"
      } else {
        return "NG"
      }
    }
  },
  data() {
    return {
      admin,
      right,
      error,
      display,
      detects: { 1: '二维码', 2: '缝隙', 3: '缺陷检测', 4: '模版匹配', 5: '螺丝检测' },
      tableData: [
        {
          name: '二维码',
          result: '',
          key: 1,
          detectInfo: '',
          detectStatus: 2
        },
        {
          name: '缝隙',
          result: '',
          key: 2,
          detectInfo: '',
          detectStatus: 2
        },
        {
          name: '缺陷检测',
          result: '',
          key: 3,
          detectInfo: '',
          detectStatus: 2
        },
        {
          name: '模版匹配',
          result: '',
          key: 4,
          detectInfo: '',
          detectStatus: 2
        },
        {
          name: '螺丝检测',
          result: '',
          key: 5,
          detectInfo: '',
          detectStatus: 2
        }
      ],
      logs: [
        { log: '2022-0613  15:30:40.537: CPU使用率达到100%！' },
        { log: '2022-0613  15:30:40.537: CPU使用率达到100%！'},
        { log: '2022-0613  15:30:40.537: CPU使用率达到100%！'}
      ],
      numberValidateForm: {
        time: 0
      },
      summaryList: [
        { title: "总数", num: 10, key: 'total' },
        { title: "合格", num: 1, key: 'eligibleNum' },
        { title: "不合格", num: 9, key: 'uneligibleNum' },
        { title: "合格率", num: '10%', key: 'eligibleRate' }
      ],
      optionCheck: {
        xAxis: {
          type: "category",
          data: ["合格", "不合格"],
        },
        yAxis: {
          type: "value",
        },
        grid: {
          left: "15%",
          top: "5%",
          right: "5%",
          bottom: "20%",
        },
        series: [
          {
            data: [
              {
                value: 200,
                itemStyle: {
                  color: "#a90000",
                }
              },
              150,
            ],
            type: "bar",
          },
        ],
      },
      optionError: {
        xAxis: {
          type: "category",
          data: ["合格", "不合格"],
        },
        yAxis: {
          type: "value",
        },
        grid: {
          left: "15%",
          top: "5%",
          right: "5%",
          bottom: "20%",
        },
        series: [
          {
            data: [
            ],
            type: "bar"
          }
        ]
      },
      ws: '',
      result: '',
      sn: ''
    }
  },
  created() {},
  mounted() {
        console.log(process.env,"prod--------------------------------")
    this.productStatisticsApi()
    this.errorPosStatisApi()
  },
  methods: {
    productStatisticsApi() {
      productStatistics().then(res => {
        if (res.code === 200) {
          this.summaryList.forEach(item => {
            item.num = res.data[item.key]
          })
          this.optionCheck.series[0].data[0].value = this.summaryList[0].num
          this.optionCheck.series[0].data[1] = this.summaryList[1].num
        }
      })
    },
    errorPosStatisApi() {
      errorPosStatis().then(res => {
        if (res.code === 200) {
          res.data.forEach(item => {
            item.key = this.detects[item.pos]
          })
          this.optionError.xAxis.data = res.data.map(item => item.key)
          this.optionError.series[0].data = res.data.map(item => item.num)
        }
      })
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'table-row-default'
      }
      return 'success-row'
    },
    startHandle() {
      this.ws = new Wsocket('socket/pushMessage/1')
      this.ws.ws.addEventListener('message', (event) => {
        if (event.data === '连接成功') return;
        const res = event.data && JSON.parse(event.data);
        res.result.forEach(item => {
          item.name = this.detects[item.pos];
          this.display = 'http://' + process.env.VUE_APP_NGINX_IMG + item.imgUrl.replace('/home','')
        })

        this.result = res.eligibleFlag;
        this.tableData = res.result;
        this.sn = res.result[0].sn;
      });
    },
    stopHandle() {
      window.location.reload()
    }
  }
}

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
          flex: 1;
          max-width: 25%;
          padding: 8px;
          background: rgba(255, 255, 255, 0.93);
          .title1 {
            border-bottom: 1px solid #ddd;
            padding: 8px 0;
          }
        }
        .data-show-left-top-middle {
          flex: 2;
          max-width: 40%;
          margin:0 8px;
          display: flex;
          flex-flow: column;
          .data-show-left-top-middle-summary {
            display: flex;
            background: rgba(255, 255, 255, 0.93);
            justify-content: center;
            padding:8px 0;
            
            li {
              flex: 1;
              text-align: center;
              &:nth-of-type(1) {
                h4 {
                  color: red
                }
              }
               &:nth-of-type(2) {
                h4 {
                  color: #14DD9F;
                }
              }
               &:nth-of-type(3) {
                h4 {
                  color: #FC8B7F;
                }
              }
               &:nth-of-type(4) {
                h4 {
                  color: #2BB9FF;
                }
              }
              h4 { 
                  font-size: 20px;
                  font-family: Roboto-Medium, Roboto;
                  font-weight: 500;
                }
              p { margin-top: 3px;}
             
            }
          }
          .data-show-left-top-image {
            width: 100%;
            padding: 8px;
            height: 211px;
            flex:1;
            margin-top: 8px;
            background: rgba(255, 255, 255, 0.93);
            img {
              width: 100%;
            }
          }
        }
        .data-show-left-top-right {
          flex: 1;
          max-width: 35%;
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
              color: #14DD9F;
              font-weight: 500;
            }
            border-bottom:1px solid #ddd;
            margin-bottom: 10px;
          }
        }
      }
      .data-show-left-bottom {
        margin-top: 8px;
        display:flex;
        .data-show-left-bottom-left {
          flex: 3;
          max-width: calc(65% - 8px);
          padding: 8px;
          background: rgba(255, 255, 255, 0.93);
          margin-right: 8px;
          .data-show-left-bottom-left-blog {
            li {
              display: flex;
              font-weight: 400;
              color: #666666;
              align-items: center;
              padding:4px;
              img {
                width:18px;
                height:18px;
                margin-right: 5px;
              }
              &:nth-of-type(odd) {
                  background: #DCE9FB;
              }
            }
          }
        }
        .data-show-left-bottom-right {
          padding: 8px;
          background: rgba(255, 255, 255, 0.93);
          flex: 1;
          max-width: 35%;
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
                margin: 20px auto;
                li {
                  display: flex;
                  margin: 8px 0;
                  font-size: 14px;
                  .key {
                    color: #999999;
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
            width:18px;
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
  background:#f1f4f9

}

</style>
