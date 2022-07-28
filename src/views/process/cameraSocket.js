export function cameraSocket(params) {
  const ws = new Wsocket("socket/pushMessage/1")
  let json = {
    flag: "device_single_step_debug",
    ...params,
    id: params.current
  }
  const sendParams = JSON.stringify({
    json
  });
  ws.onSendMessage(sendParams);
  ws.ws.addEventListener("message", event => {
    if (event.data === "连接成功") return;
    const res = event.data && JSON.parse(event.data);
  })
}