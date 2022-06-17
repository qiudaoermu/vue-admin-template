<template>
  <div class="containers">
    <!-- <my-process-palette /> -->

    <div ref="canvas" class="canvas" />
    <panel v-if="bpmnModeler" ref="panel" :modeler="bpmnModeler" />

    <div class="toolbar">
      <my-process-designer
        v-if="bpmnModeler"
        :key="`designer-${reloadIndex}`"
        ref="processDesigner"
        v-model="xmlString"
        :bpmn-modeler="bpmnModeler"
        :options="{
          taskResizingEnabled: true,
          eventResizingEnabled: true,
          minimap: {
            open: true,
          },
        }"
        v-bind="controlForm"
        keyboard
        @element-click="elementClick"
        @element-contextmenu="elementContextmenu"
        @init-finished="initModeler"
      />
      <!-- <a title="download">下载</a> -->
      <!-- <a ref="saveDiagram" href="javascript:" title="download BPMN diagram">BPMN</a> -->
      <!-- <a ref="saveSvg" href="javascr ipt:" title="download as SVG image">SVG</a> -->
    </div>
  </div>
</template>

<script>
import customModule from "./custom";
import BpmnModeler from "bpmn-js/lib/Modeler"; // bpmn-js 设计器
import panel from "./PropertyPanel"; // 属性面板
import BpmData from "./BpmData";
export default {
  components: {
    panel,
  },
  data() {
    return {
      bpmnModeler: null,
      element: null,
      reloadIndex: 0,
      xmlString: "",
      controlForm: "",
      bpmData: new BpmData(),
    };
  },
  mounted() {
    const canvas = this.$refs.canvas;
    // 生成实例
    this.bpmnModeler = new BpmnModeler({
      additionalModules: [customModule],
      container: canvas,
    });

    // 获取a标签dom节点
    const downloadLink = this.$refs.saveDiagram;
    const downloadSvgLink = this.$refs.saveSvg;
    // 监听流程图改变事件
    const _this = this;
    this.bpmnModeler.on("selection.changed", (e) => {
      const element = e.newSelection[0];
      if (!element) return;
      this.$refs.panel.open();
      console.log(element);
    });
    this.bpmnModeler.on("commandStack.changed", function () {
      debugger;
      _this.saveSVG(function (err, svg) {
        _this.setEncoded(downloadSvgLink, "diagram.svg", err ? null : svg);
      });
      _this.saveDiagram(function (err, xml) {
        _this.setEncoded(downloadLink, "diagram.bpmn", err ? null : xml);
      });
    });
    // 新增流程定义
    this.createNewDiagram();
  },
  methods: {
    elementClick() {},
    elementContextmenu() {},
    initModeler() {},
    createNewDiagram() {
      const bpmnXmlStr = `
    <?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" xmlns:color="http://www.omg.org/spec/BPMN/non-normative/color/1.0" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd"><bpmn2:process id="process1567044459787" name="流程1567044459787"><bpmn2:documentation>描述</bpmn2:documentation><bpmn2:startEvent id="StartEvent_01ydzqe" name="开始"><bpmn2:outgoing>Flow_0yc1rf5</bpmn2:outgoing></bpmn2:startEvent><bpmn2:task id="Activity_0l2ynqn" name="监听服务" color="rgb(201, 98, 98)"><bpmn2:incoming>Flow_0yc1rf5</bpmn2:incoming><bpmn2:outgoing>Flow_0ioxilz</bpmn2:outgoing><bpmn2:outgoing>Flow_0zr8gpl</bpmn2:outgoing><bpmn2:outgoing>Flow_1x13tcq</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_0yc1rf5" sourceRef="StartEvent_01ydzqe" targetRef="Activity_0l2ynqn" /><bpmn2:task id="Activity_068fz0b" name="机器人控制"><bpmn2:incoming>Flow_0ioxilz</bpmn2:incoming><bpmn2:outgoing>Flow_1l5glis</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_0ioxilz" sourceRef="Activity_0l2ynqn" targetRef="Activity_068fz0b" /><bpmn2:task id="Activity_14m5cxb" name="相机控制"><bpmn2:incoming>Flow_1l5glis</bpmn2:incoming><bpmn2:outgoing>Flow_1ayzwfg</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_1l5glis" sourceRef="Activity_068fz0b" targetRef="Activity_14m5cxb" /><bpmn2:task id="Activity_1x6e1da" name="LOGO匹配"><bpmn2:incoming>Flow_1ayzwfg</bpmn2:incoming><bpmn2:outgoing>Flow_1wakygp</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_1ayzwfg" sourceRef="Activity_14m5cxb" targetRef="Activity_1x6e1da" /><bpmn2:task id="Activity_0qlvt8s" name="智家贴检测"><bpmn2:incoming>Flow_1wakygp</bpmn2:incoming><bpmn2:outgoing>Flow_1yeej3p</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_1wakygp" sourceRef="Activity_1x6e1da" targetRef="Activity_0qlvt8s" /><bpmn2:task id="Activity_0robijf" name="机器人控制"><bpmn2:incoming>Flow_0zr8gpl</bpmn2:incoming><bpmn2:outgoing>Flow_0b7y24y</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_0zr8gpl" sourceRef="Activity_0l2ynqn" targetRef="Activity_0robijf" /><bpmn2:task id="Activity_0zrpbme" name="相机检测"><bpmn2:incoming>Flow_0b7y24y</bpmn2:incoming><bpmn2:outgoing>Flow_1xejojq</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_0b7y24y" sourceRef="Activity_0robijf" targetRef="Activity_0zrpbme" /><bpmn2:task id="Activity_0duzmx4" name="门缝测量"><bpmn2:incoming>Flow_1xejojq</bpmn2:incoming><bpmn2:outgoing>Flow_1y6nkfq</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_1xejojq" sourceRef="Activity_0zrpbme" targetRef="Activity_0duzmx4" /><bpmn2:task id="Activity_15lj3jo" name="划伤检测"><bpmn2:incoming>Flow_1y6nkfq</bpmn2:incoming><bpmn2:outgoing>Flow_1q6577w</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_1y6nkfq" sourceRef="Activity_0duzmx4" targetRef="Activity_15lj3jo" /><bpmn2:task id="Activity_0ppzxc9" name="结果判定"><bpmn2:incoming>Flow_1yeej3p</bpmn2:incoming><bpmn2:incoming>Flow_1q6577w</bpmn2:incoming><bpmn2:incoming>Flow_1htx4ge</bpmn2:incoming><bpmn2:outgoing>Flow_1mlfqjq</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_1yeej3p" sourceRef="Activity_0qlvt8s" targetRef="Activity_0ppzxc9" /><bpmn2:sequenceFlow id="Flow_1q6577w" sourceRef="Activity_15lj3jo" targetRef="Activity_0ppzxc9" /><bpmn2:task id="Activity_19hhswc" name="PLC控制" color="rgb(200, 89, 89)"><bpmn2:incoming>Flow_1x13tcq</bpmn2:incoming><bpmn2:outgoing>Flow_0kgkqj9</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_1x13tcq" sourceRef="Activity_0l2ynqn" targetRef="Activity_19hhswc" /><bpmn2:task id="Activity_0277fgf" name="相机控制" color="rgb(203, 47, 47)"><bpmn2:incoming>Flow_0kgkqj9</bpmn2:incoming><bpmn2:outgoing>Flow_1umz98d</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_0kgkqj9" sourceRef="Activity_19hhswc" targetRef="Activity_0277fgf" /><bpmn2:task id="Activity_14zzeo9" name="螺丝检测" color="rgb(200, 41, 41)"><bpmn2:incoming>Flow_1umz98d</bpmn2:incoming><bpmn2:outgoing>Flow_1246bus</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_1umz98d" sourceRef="Activity_0277fgf" targetRef="Activity_14zzeo9" /><bpmn2:task id="Activity_1ynpdkj" name="走线匹配" color="rgb(213, 96, 96)"><bpmn2:incoming>Flow_1246bus</bpmn2:incoming><bpmn2:outgoing>Flow_1gey4i1</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_1246bus" sourceRef="Activity_14zzeo9" targetRef="Activity_1ynpdkj" /><bpmn2:task id="Activity_0ci9j0r" name="电源固定"><bpmn2:incoming>Flow_1gey4i1</bpmn2:incoming><bpmn2:outgoing>Flow_1htx4ge</bpmn2:outgoing></bpmn2:task><bpmn2:sequenceFlow id="Flow_1gey4i1" sourceRef="Activity_1ynpdkj" targetRef="Activity_0ci9j0r" /><bpmn2:sequenceFlow id="Flow_1htx4ge" sourceRef="Activity_0ci9j0r" targetRef="Activity_0ppzxc9" /><bpmn2:endEvent id="Event_0q2rh90"><bpmn2:incoming>Flow_1mlfqjq</bpmn2:incoming></bpmn2:endEvent><bpmn2:sequenceFlow id="Flow_1mlfqjq" sourceRef="Activity_0ppzxc9" targetRef="Event_0q2rh90" /></bpmn2:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="process1567044459787"><bpmndi:BPMNEdge id="Flow_1mlfqjq_di" bpmnElement="Flow_1mlfqjq"><di:waypoint x="1290" y="310" /><di:waypoint x="1290" y="371" /><di:waypoint x="1310" y="371" /><di:waypoint x="1310" y="432" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1htx4ge_di" bpmnElement="Flow_1htx4ge"><di:waypoint x="1120" y="530" /><di:waypoint x="1180" y="530" /><di:waypoint x="1180" y="300" /><di:waypoint x="1240" y="300" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1gey4i1_di" bpmnElement="Flow_1gey4i1"><di:waypoint x="850" y="450" /><di:waypoint x="850" y="470" /><di:waypoint x="1070" y="470" /><di:waypoint x="1070" y="490" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1246bus_di" bpmnElement="Flow_1246bus"><di:waypoint x="750" y="410" /><di:waypoint x="800" y="410" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1umz98d_di" bpmnElement="Flow_1umz98d"><di:waypoint x="600" y="410" /><di:waypoint x="650" y="410" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0kgkqj9_di" bpmnElement="Flow_0kgkqj9"><di:waypoint x="450" y="410" /><di:waypoint x="500" y="410" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1x13tcq_di" bpmnElement="Flow_1x13tcq"><di:waypoint x="370" y="200" /><di:waypoint x="370" y="285" /><di:waypoint x="400" y="285" /><di:waypoint x="400" y="370" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1q6577w_di" bpmnElement="Flow_1q6577w"><di:waypoint x="1120" y="270" /><di:waypoint x="1180" y="270" /><di:waypoint x="1180" y="300" /><di:waypoint x="1240" y="300" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1yeej3p_di" bpmnElement="Flow_1yeej3p"><di:waypoint x="1060" y="160" /><di:waypoint x="1290" y="160" /><di:waypoint x="1290" y="230" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1y6nkfq_di" bpmnElement="Flow_1y6nkfq"><di:waypoint x="950" y="270" /><di:waypoint x="1020" y="270" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1xejojq_di" bpmnElement="Flow_1xejojq"><di:waypoint x="780" y="270" /><di:waypoint x="850" y="270" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0b7y24y_di" bpmnElement="Flow_0b7y24y"><di:waypoint x="610" y="270" /><di:waypoint x="680" y="270" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0zr8gpl_di" bpmnElement="Flow_0zr8gpl"><di:waypoint x="420" y="160" /><di:waypoint x="470" y="160" /><di:waypoint x="470" y="270" /><di:waypoint x="510" y="270" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1wakygp_di" bpmnElement="Flow_1wakygp"><di:waypoint x="910" y="160" /><di:waypoint x="960" y="160" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1ayzwfg_di" bpmnElement="Flow_1ayzwfg"><di:waypoint x="760" y="160" /><di:waypoint x="810" y="160" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1l5glis_di" bpmnElement="Flow_1l5glis"><di:waypoint x="610" y="160" /><di:waypoint x="660" y="160" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0ioxilz_di" bpmnElement="Flow_0ioxilz"><di:waypoint x="420" y="160" /><di:waypoint x="510" y="160" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_0yc1rf5_di" bpmnElement="Flow_0yc1rf5"><di:waypoint x="370" y="78" /><di:waypoint x="370" y="120" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id="StartEvent_01ydzqe_di" bpmnElement="StartEvent_01ydzqe"><dc:Bounds x="352" y="42" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="359" y="23" width="22" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0l2ynqn_di" bpmnElement="Activity_0l2ynqn" bioc:stroke="#c96262" color:border-color="#c96262"><dc:Bounds x="320" y="120" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_068fz0b_di" bpmnElement="Activity_068fz0b"><dc:Bounds x="510" y="120" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_14m5cxb_di" bpmnElement="Activity_14m5cxb"><dc:Bounds x="660" y="120" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1x6e1da_di" bpmnElement="Activity_1x6e1da"><dc:Bounds x="810" y="120" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0qlvt8s_di" bpmnElement="Activity_0qlvt8s"><dc:Bounds x="960" y="120" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0robijf_di" bpmnElement="Activity_0robijf"><dc:Bounds x="510" y="230" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0zrpbme_di" bpmnElement="Activity_0zrpbme"><dc:Bounds x="680" y="230" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0duzmx4_di" bpmnElement="Activity_0duzmx4"><dc:Bounds x="850" y="230" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_15lj3jo_di" bpmnElement="Activity_15lj3jo"><dc:Bounds x="1020" y="230" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0ppzxc9_di" bpmnElement="Activity_0ppzxc9"><dc:Bounds x="1240" y="230" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_19hhswc_di" bpmnElement="Activity_19hhswc" bioc:stroke="#c85959" color:border-color="#c85959"><dc:Bounds x="350" y="370" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0277fgf_di" bpmnElement="Activity_0277fgf" bioc:stroke="#cb2f2f" color:border-color="#cb2f2f"><dc:Bounds x="500" y="370" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_14zzeo9_di" bpmnElement="Activity_14zzeo9" bioc:stroke="#c82929" color:border-color="#c82929"><dc:Bounds x="650" y="370" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1ynpdkj_di" bpmnElement="Activity_1ynpdkj" bioc:stroke="#d56060" color:border-color="#d56060"><dc:Bounds x="800" y="370" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0ci9j0r_di" bpmnElement="Activity_0ci9j0r"><dc:Bounds x="1020" y="490" width="100" height="80" /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_0q2rh90_di" bpmnElement="Event_0q2rh90"><dc:Bounds x="1292" y="432" width="36" height="36" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn2:definitions>
      `;
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(bpmnXmlStr, (err) => {
        if (err) {
          console.error(err);
        } else {
          this.adjustPalette();
          // this.addEventBusListener();
        }
      });
    },
    // 调整左侧工具栏排版
    adjustPalette() {
      try {
        // 获取 bpmn 设计器实例
        const canvas = this.$refs.canvas;
        const djsPalette = canvas.children[0].children[1].children[4];
        const djsPalStyle = {
          width: "130px",
          padding: "5px",
          background: "white",
          left: "20px",
          borderRadius: 0,
        };
        for (var key in djsPalStyle) {
          djsPalette.style[key] = djsPalStyle[key];
        }
        const palette = djsPalette.children[0];
        const allGroups = palette.children;
        allGroups[0].style["display"] = "none";
        // 修改控件样式
        for (var gKey in allGroups) {
          const group = allGroups[gKey];
          for (var cKey in group.children) {
            const control = group.children[cKey];
            const controlStyle = {
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              padding: "5px",
            };
            if (
              control.className &&
              control.dataset &&
              control.className.indexOf("entry") !== -1
            ) {
              const controlProps = this.bpmData.getControl(
                control.dataset.action
              );
              control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;'>${controlProps["title"]}</div>`;
              for (var csKey in controlStyle) {
                control.style[csKey] = controlStyle[csKey];
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG(done) {
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      this.bpmnModeler.saveSVG(done);
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveDiagram(done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
        done(err, xml);
      });
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data);
      // 获取到图的xml，保存就是把这个xml提交给后台
      this.xmlStr = data;
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      if (data) {
        link.className = "active";
        link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        link.download = name;
      }
    },
    addEventBusListener() {
      const eventBus = this.bpmnModeler.get("eventBus");
      // 注册节点事件，eventTypes中可以写多个事件
      const eventTypes = ["element.click"];
      eventTypes.forEach((eventType) => {
        eventBus.on(eventType, (e) => {
          const { element } = e;
          if (!element.parent) return;

          if (!e || element.type === "bpmn:Process") {
            return false;
          } else {
            if (eventType === "element.click") {
              // 节点点击后想要做的处理
              // 此时想要点击节点后，拿到节点实例，通过外部输入更新节点名称
              this.currentElement = element;
            }
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
/*左边工具栏以及编辑节点的样式*/
@import "~bpmn-js/dist/assets/diagram-js.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  .canvas {
    width: 100%;
    height: 100%;
  }
  .panel {
    position: absolute;
    right: 0;
    top: 50px;
    width: 300px;
  }
  .bjs-powered-by {
    display: none;
  }
  .toolbar {
    position: absolute;
    top: 20px;
    right: 350px;
    a {
      text-decoration: none;
      margin: 5px;
      color: #409eff;
    }
  }
}
</style>
