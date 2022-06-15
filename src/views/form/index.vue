<template>
  <div class="containers">
    <div ref="canvas" class="canvas"></div>
  </div>
</template>
<script>
  import BpmnModeler from 'bpmn-js/lib/Modeler' // 引入 bpmn-js
  export default {
    data() {
      return {
        bpmnModeler: null,
      }
    },
    mounted() {
      const canvas = this.$refs.canvas
      // 生成实例
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
      })
      this.createNewDiagram() // 新增流程定义
    },
    methods: {
      createNewDiagram() {
        const bpmnXmlStr = `
      <?xml version="1.0" encoding="UTF-8"?>
        <bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
          <bpmn2:process id="process1567044459787" name="流程1567044459787">
            <bpmn2:documentation>描述</bpmn2:documentation>
            <bpmn2:startEvent id="StartEvent_1" name="开始"/>
          </bpmn2:process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="process1567044459787">
              <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
                <dc:Bounds x="184" y="64" width="36" height="36"/>
                <bpmndi:BPMNLabel>
                  <dc:Bounds x="191" y="40" width="22" height="14"/>
                </bpmndi:BPMNLabel>
              </bpmndi:BPMNShape>
            </bpmndi:BPMNPlane>
          </bpmndi:BPMNDiagram>
        <processType id="test"/></bpmn2:definitions>
      `
        // 将字符串转换成图显示出来
        this.bpmnModeler.importXML(bpmnXmlStr, (err) => {
          if (err) {
            console.error(err)
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  /*左边工具栏以及编辑节点的样式*/
  @import '~bpmn-js/dist/assets/diagram-js.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
  .containers {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    .canvas {
      width: 100%;
      height: 100%;
    }
    .bjs-powered-by {
      // display: none;
    }
  }
</style>
