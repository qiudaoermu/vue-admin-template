import Wsocket from "../../../package/socket.js";

export function cameraSocket(params) {
  const ws = new Wsocket("socket/pushMessage/10086")
  let res = {}
  try {
    let json = {
      flag: "device_single_step_debug",
      userId: "10086",
      deviceInfo: {
        id: params.deviceId,
        type: params.deviceType,
        ...params,
      },
    };
    const sendParams = JSON.stringify({
      ...json,
    });
    ws.onSendMessage(sendParams);
    return new Promise((resolve, reject) => {
      ws.ws.addEventListener("message", (event) => {
        if (event.data === "连接成功") return;
        res = event.data && JSON.parse(event.data);
        ws.onSendMessage(
          JSON.stringify({
            flag: "stop",
            stopType: "device_single_step_debug",
          })
        );
        resolve(res);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export function PLCSocket(params) {
  const ws = new Wsocket("socket/pushMessage/10086")
  let res = {}
  try {
    let json = {
      "userId":"1",
      "flag":"device_single_step_debug",
      "deviceInfo":{
      "brand": "",
      "company": "",
      "createTime": "2022-07-08 14:27:14",
      "drive": "1",
      "id": 19,
      "imgFormat": "",
      "imgPath": "",
      "ip": "192.168.1.152",
      "name": "plc",
      "port": 502,
      "protocol": "tcp",
      "type": "plc",
      "updateTime": null
      },
    "commandType": "read",
    "commandAddress": "100"
    };
    const sendParams = JSON.stringify({
      ...json,
    });
    ws.onSendMessage(sendParams);
    return new Promise((resolve, reject) => {
      ws.ws.addEventListener("message", (event) => {
        if (event.data === "连接成功") return;
        res = event.data && JSON.parse(event.data);
        resolve(res);
      });
    });
  } catch (error) {
    console.log(error);
  }
}


function promiseAll(itemable){
  if(!Array.isArray(itemable)) {
    throw new Error('')
  }
  return new Promise((resolve,reject)=>{
    let count = 0
    let arr = []
    for (let i = 0; i < itemable.length; i++) {
      const element = itemable[i];
      Promise.resolve(element.then(res=>{
        count++
        arr[i] = res
        if (count===itemable.length) {
          resolve(arr)
        }
      }),error=>{
        reject()
      })
    }
  })
}