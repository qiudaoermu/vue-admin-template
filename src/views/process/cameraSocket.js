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
      flag: "device_single_step_debug",
      userId: "10086",
      "deviceInfo":{
        id: params.deviceId,
        type: params.deviceType,
        ...params,
      },
    "commandType": params.commandType,
    "commandAddress": params.commandAddress,
    "commandValue": params.commandValue
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
