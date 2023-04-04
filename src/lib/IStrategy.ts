import Observer from "./IObserver";
import Indicators from "./Indicators";
import Klines from "./Klines";

enum Signal {
  BUY,
  SELL,
  WAIT,
  STOPGAIN,
  STOPLOSS,
}
abstract class Strategy implements Observer {
  indicator: Indicators;
  klines!: Klines;
  buyPrice: number;
  result: number;
  inPosition: boolean;
  constructor() {
    this.indicator = new Indicators();
    this.inPosition = false;
    this.buyPrice = 0;
    this.result = 1;
  }
  abstract update(klines: Klines): void;
  public abstract calculate(klines: Klines): void;
}

export { Strategy, Signal };
