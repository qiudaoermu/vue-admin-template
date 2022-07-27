let Bus = function () {
  this.cache = [];
};
// register
Bus.prototype.$on = function (handleEvent, fn) {
  for (let i = 0; i < this.cache.length; i++) {
    let [first] = Object.keys(this.cache[i]);
    if (first === handleEvent) {
      return;
    }
  }
  this.cache.push({
    [handleEvent]: fn,
  });
};
// trigger
Bus.prototype.$emit = function (handleEvent) {
  const [first, ...rest] = Array.from(arguments);
  for (let i = 0; i < this.cache.length; i++) {
    if (this.cache[i][handleEvent]) {
      this.cache[i][handleEvent](...rest);
    }
  }
};
// cancel register
Bus.prototype.$off = function (handleEvent) {
  for (let i = 0; i < this.cache.length; i++) {
    let [first] = Object.keys(this.cache[i]);
    if (first === handleEvent) {
      this.cache.splice(i, 1);
      i = i - 1;
    }
  }
};
export default new Bus()