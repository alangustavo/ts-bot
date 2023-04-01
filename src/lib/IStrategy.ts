import { ComplexIndicator } from "./ComplexIndicator";
import Klines from "./Klines";

enum Signal {
  BUY,
  SELL,
}
abstract class Strategy {
  indicator: ComplexIndicator;
  constructor(indicator: ComplexIndicator) {
    this.indicator = indicator;
  }
  public abstract getBuySignal(klines: Klines): Signal;
  public abstract getSellSignal(klines: Klines): Signal;
}

export { Strategy, Signal };
