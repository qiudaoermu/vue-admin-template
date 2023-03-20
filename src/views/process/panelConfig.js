const panelConfig = {
  device: { list: "", title: "设备" },
  service: {
    list: [
      {
        name: "开始",
        text: "开始节点",
        class: "node-start",
        type: "start"
      },
      {
        name: "结束",
        text: "结束节点",
        class: "node-end",
        type: "end"
      }
    ],
    title: "服务"
  },
  algorithm: {
    list: [
      {
        name: "二维码",
        id: 1
      },
      {
        name: "缝隙",
        id: 2
      },
      {
        name: "划伤划痕",
        id: 3
      },
      {
        name: "模版匹配",
        id: 4
      },
      {
        name: "螺丝检测",
        id: 5
      }
    ],
    title: "算子"
  },
  scene: { list: "", title: "场景" }
};
export default panelConfig;
