
class Wsocket {
  constructor(url) {
    this.ws = new WebSocket(`ws://${process.env.VUE_APP_SOCKET_URL}/${url}`);
    // this.onSendMessage()
    this._onCatchErr()
    this._onClose()
  }
  onSendMessage(params = '') {
    this.ws.sendMessage = (params) => {
      if (this.ws.readyState === 1) {
        this.ws.send(params);
      } else {
        this.ws.addEventListener("open", (e) => {
          console.log(this.ws.readyState);
          this.ws.send(params);
        });
      }
    };
  }
  _onCatchErr() {
    this.ws.addEventListener("error", function (event) {
      console.error( "Error from server ", event.data);
    });
  }
  _onClose() {
    this.ws.addEventListener("close", (e) => {
      console.log(
        "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
      );
      console.log("Ws has closed");
    });
  }
  // onGetMessage() {
  //   this.ws.addEventListener("message", (event) => {
  //     const result = event.data && JSON.parse(event.data);
  //     resolve(result);
  //   });
  // }
}

export default Wsocket;
