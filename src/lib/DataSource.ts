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
  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("Subject: Observer has been attached already.");
    }

    console.log("Subject: Attached an observer.");
    this.observers.push(observer);
  }

  // Detach an observer from the subject.
  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("Subject: Nonexistent observer.");
    }

    this.observers.splice(observerIndex, 1);
    console.log("Subject: Detached an observer.");
  }

  // Notify all observers about an event.
  /**
   * Trigger an update in each subscriber.
   */
  public notify(): void {
    console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.update(this.klines);
    }
  }
}
