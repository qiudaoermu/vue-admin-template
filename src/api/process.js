import request from "@/utils/request";
export function getProcess(params) {
  return request({
    url: "/process/getProcess",
    method: "get",
    params
   
  });
}

export function getSceneList(params) {
  return request({
    url: "/process/getSceneList",
    method: "post",
    params
  })
}
// 查询服务
export function getServiceList(params) {
  return request({
    url: "/process/getServiceList",
    method: "post",
    params
  })
}
// 保存流程;
export function saveProcess(params) {
  return request({
    url: "/process/saveProcess",
    method: "post",
    data: {
      ...params,
    },
  });
}
export function getProcessList(params) {
  return request({
    url: "/process/getProcessList",
    method: "post",
    params,
  });
}
export function getSceneInfoList(params) {
  return request({
    url: "/process/getSceneInfoList",
    method: "get",
    params,
  });
}

export function saveSceneInfo(params) {
  return request({
    url: "/process/saveSceneInfo",
    method: "post",
    data: {
      ...params,
    }
  })
}

export function getSceneProcess(params) {
  return request({
    url: "/process/getSceneProcess",
    method: "get",
    params
  })
}

export function modifyProcess(params) {
  return request({
    url: "/process/modifyProcess",
    method: "post",
    data: {
      ...params,
    },
  });
}

