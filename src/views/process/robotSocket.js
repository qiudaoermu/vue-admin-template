import Wsocket from "../../../package/socket.js";
export function robotSocket(params) {
    const userId = window.localStorage.getItem("userId");
    const ws = new Wsocket(`socket/pushMessage/${userId}`);
    let res = {}
    try {
        let json = {
            flag: "device_single_step_debug",
            userId,
            deviceInfo: {
                id: params.deviceId,
                type: params.deviceType,
                ...params,
            },
            motionCommand: params.motionCommand,
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
