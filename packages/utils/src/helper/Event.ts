// legacy

import { MyLog } from "./log";

export type EventCallback_Old = (data: any) => void;

export class EventEmitter_Old {
  /**
   * 事件集
   */
  private static events = new Map<string, Array<EventCallback_Old>>();
  private static getCb(e: string) {
    return EventEmitter_Old.events.get(e) ?? []
  }
  /**
   * 分发事件
   * @param event
   * @param data
   */
  public static dispatch = (event: string, data?: any) => {
    if (!EventEmitter_Old.events.get(event)) {
      return;
    }
    const callbacks: Array<EventCallback_Old> = EventEmitter_Old.getCb(event);
    callbacks.forEach((callback) => {
      callback(data);
    });
  };

  /**
   * 订阅事件
   */
  public static subscribe = (event: string, callback: EventCallback_Old) => {
    let callbacks: Array<EventCallback_Old> = EventEmitter_Old.getCb(event);
    if (!callbacks) {
      callbacks = Array<EventCallback_Old>();
    }
    callbacks.push(callback);
    EventEmitter_Old.events.set(event, callbacks);
  };

  /**
   * 取消事件订阅
   */
  public static unSubscribe = (event: string, callback: EventCallback_Old) => {
    let callbacks: Array<EventCallback_Old> = EventEmitter_Old.getCb(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback, 0);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
      EventEmitter_Old.events.set(event, callbacks);
    }
  };
}


export class EventEmitter<TypeMapInterface extends { [x: string]: any[] }> {
  events: { [x in keyof TypeMapInterface]?: Array<(...args: TypeMapInterface[x]) => void> } = {};
  constructor() { }

  addListener<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void): this {
    let existing = this.events[event];
    if (!existing) {
      this.events[event] = existing = [];
    }
    existing.includes(listener) || existing.push(listener)

    return this;
  }
  on<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void): this {
    // this.off(event, listener)
    return this.addListener(event, listener);
  }
  on_cb<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void) {
    // this.off(event, listener)
    this.addListener(event, listener);
    return listener
  }
  on_rm<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void) {
    // this.off(event, listener)
    this.addListener(event, listener);
    return () => {
      this.off(event, listener)
    }
  }
  static logger = new MyLog('EventEmitter')

  emit<T extends keyof TypeMapInterface>(event: T, ...args: TypeMapInterface[T]): boolean {
    let existing = this.events[event];
    // EventEmitter.logger.log({ event, args })
    if (!existing) {
      return false;
    }
    existing.forEach(fn => {
      fn(...args);
    });
    return true;
  }
  removeAllListeners<T extends keyof TypeMapInterface>(event: T): this {
    this.events[event] = [];
    return this;
  }

  off<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void): this {
    let existing = this.events[event];
    if (!existing) {
      return this;
    }
    const index = existing.findIndex(_ => _ === listener)
    if (index < 0) {
      return this
    }
    existing.splice(index, 1)
    return this;
  }

  once<T extends keyof TypeMapInterface>(event: T, listener: (...args: TypeMapInterface[T]) => void): this {
    const fn = (...a: TypeMapInterface[T]) => {
      listener(...a)
      this.off(event, fn)
    }
    this.on(event, fn)
    return this;
  }
  prependListener<T extends keyof TypeMapInterface>(event: keyof TypeMapInterface, listener: (...args: any[]) => void): this {
    return this;
  }
  prependOnceListener<T extends keyof TypeMapInterface>(event: keyof TypeMapInterface, listener: (...args: any[]) => void): this {
    return this;
  }
  removeListener<T extends keyof TypeMapInterface>(event: keyof TypeMapInterface, listener: (...args: any[]) => void): this {
    return this;
  }

  setMaxListeners(n: number): this {
    return this;
  }
  getMaxListeners(): number {
    return 0;
  }
  listeners<T extends keyof TypeMapInterface>(event: keyof TypeMapInterface): Function[] {
    return [];
  }
  rawListeners<T extends keyof TypeMapInterface>(event: keyof TypeMapInterface): Function[] {
    return [];
  }

  eventNames(): Array<keyof TypeMapInterface> {
    return [];
  }
  listenerCount(type: string): number {
    return 0;
  }
}

export const event = new EventEmitter();



