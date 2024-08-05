export default {
  event: (data: any) => {},
  triger(data: any) {
    this.event(data);
  },
  subscribe(fn: any) {
    this.event = fn;
  },
  unSubscribe() {
    this.event = (data: any) => {};
  },
};
