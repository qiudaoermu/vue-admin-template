import Wsocket from "../../../package/socket.js";

export function cameraSocket(params,close) {
  const ws = new Wsocket("socket/pushMessage/10086")
  // ws.onSendMessage(JSON.stringify({"flag":"stop","stopType":"device_single_step_debug"}))
  if (close) {
    ws.onSendMessage(JSON.stringify({"flag":"stop","stopType":"device_single_step_debug"}))
    return false
  }
  let res = {}
  let json = {
    flag: "device_single_step_debug",
    userId: '10086',
    deviceInfo: {
      id: params.proc[0].deviceId,
      type: params.proc[0].deviceType,
      ...params.proc[0],
    },
  }
  const sendParams = JSON.stringify({
    ...json
  });
  ws.onSendMessage(sendParams);
  return new Promise((resolve, reject) => {
    ws.ws.addEventListener("message", event => {
      if (event.data === "连接成功") return;
      res = event.data && JSON.parse(event.data);
      resolve(res)
    })
  })
}
