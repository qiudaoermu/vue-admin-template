<template>
  <div class="section-container">
    <h1 class="title">上海海尔洗涤电器有限公司N码合—视觉检测</h1>
    <section class="data-show">
      <div class="data-show-left">
        <div class="data-show-left-top">
          <div class="data-show-left-top-left">
            <header-title title='数据分析'  class="title1"/>
            <header-title title="产品合格率分析" />
            <v-chart class="chart-top chart" :option="option" />
            <header-title title="错误位置统计" />
            <v-chart class="chart-bottom chart" :option="option" />
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
              <img />
            </div>
          </div>
          <div class="data-show-left-top-right">
            <div class="data-show-left-top-right-top">
              <div class="data-show-right-top-action">
                <el-form :inline="true" :model="numberValidateForm" ref="numberValidateForm"  class="demo-ruleForm">
                  <el-form-item
                    label="运动超时"
                  >
                     <el-input-number v-model="numberValidateForm.time" controls-position="right" @change="handleChange" :min="1" :max="10" size="small"/>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="small" @click="resetForm('numberValidateForm')">重置</el-button>
                  </el-form-item>
                </el-form>
                <div class="data-show-right-top-result">
                    <p>检测结果：</p>
                    <h3>成功</h3>
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
                      prop="date"
                      label="日期"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址">
                      <template slot-scope="scope">
                      <el-button
                        v-if="scope.row.name==='王大虎'"
                        @click.native.prevent="deleteRow(scope.$index, tableData)"
                        type="text"
                        size="small">
                        移除
                      </el-button>
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
                  <img :src="admin"/>
                  <p>
                   {{item.log}}
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
                    <span class="key">物流单号</span>
                    <span class="value bold-size">data.logisticsOrderCode</span>
                  </li>
                  <li>
                    <span class="key">收件人</span>
                    <span class="value bold-size">data.receiverUser</span>
                  </li>
                  <li>
                    <span class="key">收件电话</span>
                    <span class="value bold-size">data.receivePhone</span>
                  </li>
                  <li>
                    <span class="key">地址</span>
                    <span class="value bold-size">
                      data.province
                    </span>
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
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  xAxis,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

export default {
  name: "TestResultFirst",
  components: {
    VChart,
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王大虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-03',
        name: '王大虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      admin,
      logs: [
        { log:'2022-0613  15:30:40.537: CPU使用率达到100%！'},
        { log: '2022-0613  15:30:40.537: 发生异常错误：索引超出了数组界限，文件名D:MachineVisionPlat SHXDLSourceCodelVer0.5 20210818ProjectsMachineVisionPlat.S，行数120'
      },
      {log: '2022-0613  15:30:40.537: CPU使用率达到100%！'},
      {log: '2022-0613  15:30:40.537: CPU使用率达到100%！'},
      ],
      numberValidateForm: {
        time: 0
      },
      summaryList: [
        { title: "总数", num: 10 },
        { title: "合格", num: 10 },
        { title: "不合格", num: 10 },
        { title: "合格率", num: 10 },
      ],
      title1: "数据分析",
      title2: "产品合格率分析",
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        grid: {
          left: "15%",
          top: "5%",
          right: "5%",
          bottom: "5%",
        },
        series: [
          {
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: "#a90000",
                },
              },
              150,
              80,
              70,
              110,
              130,
            ],
            type: "bar",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'table-row-default';
      }
      return 'success-row';
    }
  },
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
    font-size: 18px;
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
            image {
              width: 321px;
              height: 211px;
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
            margin: 8px auto;
            padding-bottom: 10px;
            justify-content: center;
            h3 {
              font-size: 18px;
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
              width: 390px;
              margin: 0px auto;
              border-radius: 10px;
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
