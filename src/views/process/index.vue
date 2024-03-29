<template>
  <div>
    <!-- <vue-bpmn /> -->
    <LF
      v-if="initPanConfFlag"
      :panel-config="panelConfig"
      :record="record"
      version="X"
      :socket-response="socketResponse"
      @emitDeploy="emitDeploy"
      @emitTransfromRecord="emitTransfromRecord"
      @emitPostGraphData="emitPostGraphData"
    />
  </div>
</template>

<script>
// import LF from "logicflow-vue/src/components/LF";
import { getDeviceList, algTest } from "@/api/device";
import { getDict } from "@/api/dict";
import { cameraSocket, PLCSocket } from "./cameraSocket";
import {
  getProcess,
  getSceneList,
  saveProcess,
  modifyProcess
} from "@/api/process";
import { getAlgorithm } from "@/api/algorithm.js";
import panelConfig from "./panelConfig";
import { robotSocket } from "@/views/process/robotSocket";
export default {
  components: {
    // VueBpmn,
    // LF
  },
  data() {
    return {
      panelConfig,
      initPanConfFlag: false,
      record: {},
      query: {},
      dict: { // 下拉框的字典
        imgType: {}, // 图片格式
        triggerType: {} // 触发方式
      },
      socketResponse: {} // 单步调试返回值
    };
  },
  created() {
    this.getDict();
  },
  mounted() {
    this.query = this.$route.query;
    this.main();
  },
  methods: {
    emitDeploy() {
      this.$router.push({
        path: "/station/index",
        query: {
          sceneInfoId: this.$route.query.sceneInfoId,
          procId: this.$route.query.procId
        }
      });
    },
    getDict() {
      getDict({ param: "img_fmt" }).then(res => {
        const data = res.data;
        this.dict.imgType = data;
        window.sessionStorage.setItem("imgType", JSON.stringify(data));
      });
      getDict({ param: "tri_way" }).then(res => {
        const data = res.data;
        this.dict.triggerType = data;
        window.sessionStorage.setItem("triggerType", JSON.stringify(data));
      });
    },
    initEdit() {
      if (!this.query.procId) return;
      getProcess({ procId: this.$route.query.procId }).then(res => {
        this.record = res.data;
      });
    },
    emitTransfromRecord(data, callback) {
      if (data.isTest === true) {
        const item = data;
        // 是单步调试
        item.type = item.deviceType;
        if (item.deviceType === "camera") {
          cameraSocket(item).then(res => {
            this.socketResponse = res;
            callback && callback(this.socketResponse);
          });
        } else if (item.deviceType === "plc") {
          PLCSocket(item).then(res => {
            this.socketResponse = res;
            callback && callback(this.socketResponse);
          });
        } else if (item.deviceType === "gun") {
          cameraSocket(item).then(res => {
            this.socketResponse = res;
            callback && callback(this.socketResponse);
          });
        } else if (item.deviceType === "robot") {
          robotSocket(item).then(res => {
            this.socketResponse = res;
            callback && callback(this.socketResponse);
          });
        } else {
          const { algCriterion, algParam, algType, imgPath } = item;
          algTest({ algCriterion, algParam: JSON.stringify(algParam), algType, imgPath }).then(res => {
            this.socketResponse = res.data;
            if (algType === "libAlgo_detect_scratch") {
              this.socketResponse.roi = this.getScratchRoiArr();
            } else {
              this.socketResponse.roi = [
                this.getRoiArr()
              ];
            }
            callback && callback(this.socketResponse);
            this.$message.success("调试完成!");
          });
        }
        return false;
      }
    },
    getScratchRoiArr() {
      const zoomArr = [];
      let points = [];
      if (this.socketResponse.roi) {
        this.socketResponse.roi = JSON.parse(this.socketResponse.roi);
        for (let i = 0; i < this.socketResponse.roi.length; i++) {
          if (i % 2 === 0) {
            points = [];
            points[0] = {};
            points[0].x = this.socketResponse.roi[i];
          } else {
            points[0].y = this.socketResponse.roi[i];
            zoomArr.push({
              points: points,
              "type": "point"
            });
          }
        }
        return zoomArr;
      }
    },
    getRoiArr() {
      const zoomArr = [];
      let zoom = {
        x: "",
        y: ""
      };
      if (this.socketResponse.roi) {
        this.socketResponse.roi = JSON.parse(this.socketResponse.roi);
        for (let i = 0; i < this.socketResponse.roi.length; i++) {
          if (i % 2 === 0) {
            zoom.x = this.socketResponse.roi[i];
          } else {
            zoom.y = this.socketResponse.roi[i];
            zoomArr.push(zoom);
            zoom = {
              x: "",
              y: ""
            };
          }
        }
        return {
          points: zoomArr,
          "type": "rectangle"
        };
      }
    },
    emitPostGraphData(data) {
      const params = {
        type: 4,
        procId: +this.query.procId,
        sceneInfoId: +this.query.sceneInfoId,
        descInfo: this.query.descInfo,
        name: this.query.name,
        ...data
      };
      // 修改
      if (this.query.procId) {
        modifyProcess(params).then(res => {
          this.$message({
            type: "success",
            message: "修改成功!!",
            center: true
          });
        });
        return;
      }

      saveProcess(params).then(res => {
        this.$message({
          type: "success",
          message: "保存成功!!",
          center: true
        });
      });
    },
    initPanConf() {
      this.panelConfig.scene.list = this.panelConfig.scene.list.map(item => {
        const { procId, ...params } = item;
        return {
          ...params,
          flowProperties: {
            class: "node-scene",
            type: "scene",
            text: item.name,
            label: item.name
          },
          sceneId: procId
        };
      });

      this.panelConfig.device.list = this.panelConfig.device.list.map(item => {
        const { id, ...params } = item;
        return {
          ...params,
          flowProperties: {
            class: "node-device",
            type: "device",
            text: item.name,
            label: item.name
          },
          deviceType: item.type,
          deviceId: id,
          deviceName: item.name
        };
      });

      this.panelConfig.algorithm.list = this.panelConfig.algorithm.list.map(
        item => {
          const { name, params, breif, ...left } = item;
          return {
            ...left,
            flowProperties: {
              class: "node-algorithm",
              type: "algorithm",
              text: name,
              label: name
            },
            breif: breif,
            algParam: params,
            algName: name,
            algType: item.algId
          };
        }
      );

      this.panelConfig.service.list = this.panelConfig.service.list.map(
        item => {
          const { params } = item;
          return {
            ...params,
            flowProperties: {
              class: item.class,
              type: item.type,
              text: item.name,
              label: item.name
            }
            // sceneId: id
          };
        }
      );
      this.initPanConfFlag = true;
    },
    async main() {
      // getDeviceList().then(res => {
      //   this.$set(this.panelConfig.device, 'list', res.data)
      //   this.initPanConf()
      //   // this.panelConfig.device.list = res.data
      // })
      const deviceList = await getDeviceList();
      const scenesList = await getSceneList();
      const algorithmList = await getAlgorithm();
      this.panelConfig.device.list = deviceList.data;
      this.panelConfig.scene.list = scenesList.data;
      this.panelConfig.algorithm.list = Object.values(
        algorithmList.data
      ).filter(item => item);
      // this.panelConfig.service.list = serviceList.data
      this.initPanConf();
      this.initEdit();
    }
  }
};
</script>

<style lang="scss" scoped></style>
