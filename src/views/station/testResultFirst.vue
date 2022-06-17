<template>
  <div class="section-container">
    <h1 class="title">上海海尔洗涤电器有限公司N码合—视觉检测</h1>
    <section class="data-show">
      <div class="data-show-left">
        <div class="data-show-left-top">
          <div class="data-show-left-top-left">
            <header-title :title="title1" />
            <header-title :title="title2" />
            <v-chart class="chart" :option="option" />
            <header-title :title="title2" />
            <v-chart class="chart" :option="option" />
          </div>
          <div class="data-show-left-top-middle">
            <div class="data-show-left-top-middle-summary">
              <li v-for="(item, key) of summaryList" :key="key">
                <h4>{{ item.num }}</h4>
                <p>{{ item.title }}</p>
              </li>
            </div>
            <div class="data-show-left-top-image">
              <header-title :title="title2" />
              <img />
            </div>
          </div>
          <div class="data-show-left-top-right">
            <div class="data-show-left-top-right-top">
              <div class="data-show-right-top-action" />
              <div class="data-show-right-top-list">
                <header-title :title="title2" />
              </div>
            </div>
          </div>
        </div>
        <div class="data-show-left-bottom">
        
          <div class="data-show-left-bottom-left">
              <header-title :title="title2" />
          </div>
          <div class="data-show-left-bottom-right"></div>
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
  methods: {},
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
    font-size: 28px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .data-show {
    display: flex;
    .data-show-left {
      flex: 2;
      .chart {
        width: 217px;
        height: 120px;
      }
      .data-show-left-top {
        display: flex;
        .data-show-left-top-left {
          flex: 1;
          padding: 8px;
          background: rgba(255, 255, 255, 0.93);
        }
        .data-show-left-top-middle {
          flex: 2;
          margin:0 7px;
          .data-show-left-top-middle-summary {
            display: flex;
            background: rgba(255, 255, 255, 0.93);
            justify-content: center;
            li {
              flex: 1;
              text-align: center;
              h4 {
                font-size: 16px;
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color: #6b9cff;
              }
            }
          }
          .data-show-left-top-image {
            width: 100%;
            padding: 8px;
            height: 211px;
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
          padding: 8px;
          background: rgba(255, 255, 255, 0.93);
        }
      }
      .data-show-left-bottom {
        padding: 8px;
        margin-top: 8px;
        background: rgba(255, 255, 255, 0.93);
        .data-show-left-bottom-left {
          
        }
      }
    }
  }
}
</style>
