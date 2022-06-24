<template>
  <div class="my-process-palette">
    <el-collapse :accordion='true' v-model="activeNames"  @change="handleChange">
         <el-collapse-item title="控制流程" name="1">
        <div class="custom-button" @click="createElement($event, 'StartEvent')" @mousedown="createElement($event, 'StartEvent')">
          开始
        </div>
           <div class="custom-button" @click="createElement($event, 'EndEvent')" @mousedown="createElement($event, 'EndEvent')">
          结束
        </div>
      </el-collapse-item>
      <el-collapse-item title="设备" name="2">
        <!--  可以简化。。。 -->
        <div class="custom-button" @click="createElement($event, 'Task')" @mousedown="createElement($event, 'Task')">
          相机
        </div>
        <div class="custom-button" @click="createElement($event, 'UserTask')" @mousedown="createElement($event, 'UserTask')">
          机器人
        </div>
        <div class="custom-button" @click="createElement($event, 'SendTask')" @mousedown="createElement($event, 'SendTask')">
          PLC
        </div>
      </el-collapse-item>
      <el-collapse-item title="算子" name="3">
       <div class="custom-button" @click="createElement($event, 'Task')" @mousedown="createElement($event, 'Task')">
          划伤划痕
        </div>
        <div class="custom-button" @click="createElement($event, 'UserTask')" @mousedown="createElement($event, 'UserTask')">
          Logo匹配
        </div>
        <div class="custom-button" @click="createElement($event, 'SendTask')" @mousedown="createElement($event, 'SendTask')">
          产品贴检测
        </div>
        <div class="custom-button" @click="createElement($event, 'SendTask')" @mousedown="createElement($event, 'SendTask')">
          螺丝检测
        </div>
        <div class="custom-button" @click="createElement($event, 'SendTask')" @mousedown="createElement($event, 'SendTask')">
          二维码检测
        </div>
        <div class="custom-button" @click="createElement($event, 'SendTask')" @mousedown="createElement($event, 'SendTask')">
          条码检测
        </div>
      </el-collapse-item>
   
     
  
    </el-collapse>
  </div>
</template>

<script>
import { assign } from "min-dash";

export default {
  name: "MyProcessPalette",
  data() {
    return {
       activeNames: ['1','2','3']
    };
  },
  mounted() {},
  methods: {
     handleChange(val) {
        console.log(val);
      },
    createElement(event, type, options = {}) {
      const ElementFactory = window.bpmnInstances.elementFactory;
      const create = window.bpmnInstances.modeler.get("create");
      const shape = ElementFactory.createShape(assign({ type: `bpmn:${type}` }, options));
      if (options) {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }
      create.start(event, shape);
    },
    startTool(event, type) {
      if (type === "handTool") {
        window.bpmnInstances.modeler.get("handTool").activateHand(event);
      }
      if (type === "lassoTool") {
        window.bpmnInstances.modeler.get("lassoTool").activateSelection(event);
      }
      if (type === "connectTool") {
        window.bpmnInstances.modeler.get("globalConnect").toggle(event);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.my-process-palette {
  box-sizing: border-box;
  position: absolute;
  z-index: 999;
  left: 20px;
  top:20px;
  padding: 8px;
  border:1px solid #ddd;
  .custom-button {
    box-sizing: border-box;
    padding: 4px 8px;
    border-radius: 4px;
    text-align:center;
    min-width:40px;
    color: #fff;
    background: rgba(24, 144, 255, 1);
    border: 1px solid rgba(24, 144, 255, 0.8);
    cursor: pointer;
    margin-bottom: 8px;
    &:first-child {
      margin-top: 8px;
    }
  }
}
</style>
