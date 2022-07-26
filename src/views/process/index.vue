<template>
  <div>
    <!-- <vue-bpmn /> -->
    <LF
      v-if="initPanConfFlag"
      :panelConfig="panelConfig"
      :record="record"
      @emitTransfromRecord="emitTransfromRecord"
    />
  </div>
</template>

<script>
import LF from "logicflow-vue/src/components/LF";
// import VueBpmn from "@/components/VueBpmn";
import { getDeviceList, addDevice } from "@/api/device";
import bus from "@/utils/bus";
import {
  getProcess,
  getServiceList,
  getSceneList,
  saveProcess,
  modifyProcess
} from "@/api/process";
import { getAlgorithm } from "@/api/algorithm.js";
import panelConfig from "./panelConfig";
export default {
  data() {
    return {
      panelConfig,
      initPanConfFlag: false,
      record: {},
      query: {},
    };
  },
  components: {
    // VueBpmn,
    LF
  },
  mounted() {
    this.query = this.$route.query
    this.main();
    this.bus.$on("send",(record)=>{
      this.emitTransfromRecord(record);
    })
  },
  methods: {
    initEdit() {
      if (!this.$route.query.procId) return;
      getProcess({ procId: this.$route.query.procId }).then(res => {
        this.record = res.data;
      });
    },
    emitTransfromRecord(data) {
      const params = {
        type: 4,
        procId: +this.query.procId,
        sceneInfoId: +this.query.sceneInfoId,
        descInfo: this.query.descInfo,
        name: this.query.name,
        ...data
      };
      // 修改
      if (this.$route.query.procId) {
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
          const { name, params, ...left } = item;
          return {
            ...left,
            flowProperties: {
              class: "node-algorithm",
              type: "algorithm",
              text: name,
              label: name
            },
            algParam: params,
            algName: name,
            algType: item.algId
          };
        }
      );

      this.panelConfig.service.list = this.panelConfig.service.list.map(
        item => {
          const { id, ...params } = item;
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
      const serviceList = await getServiceList();
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
