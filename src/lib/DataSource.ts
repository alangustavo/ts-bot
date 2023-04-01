import Klines from "./Klines";
import Observer from "./IObserver";
import Subject from "./ISubject";

export default class DataSource implements Subject {
  symbol: string;
  interval: string;
  limit: number;
  klines: Klines;
  observers: Observer[];
  constructor(symbol: string, interval: string, limit: number = 500) {
    this.symbol = symbol;
    this.interval = interval;
    this.limit = limit;
    this.klines = new Klines(limit);
    this.observers = new Array<Observer>();
  }
  // Attach an observer to the subject.
  attach(observer: Observer): boolean {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return false;
    }
    this.observers.push(observer);
    return true;
  }

  // Detach an observer from the subject.
  detach(observer: Observer): boolean {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return false;
    }
    this.observers.splice(observerIndex, 1);
    return true;
  }

  // Notify all observers about an event.
  /**
   * Trigger an update in each subscriber.
   */
  public notify(): void {
    // console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.update(this.klines);
    }
  }
}
