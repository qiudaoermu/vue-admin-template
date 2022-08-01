import Wsocket from "../../../package/socket.js";

export function cameraSocket(params) {
  const ws = new Wsocket("socket/pushMessage/10086")
  let json = {
    flag: "device_single_step_debug",
    userId: '10086',
    deviceInfo: {
      id: params.proc[0].deviceId,
      ...params.proc[0],
    },
  }
  const sendParams = JSON.stringify({
    ...json
  });
  ws.onSendMessage(sendParams);
  ws.ws.addEventListener("message", event => {
    if (event.data === "连接成功") return;
    const res = event.data && JSON.parse(event.data);
  })
}