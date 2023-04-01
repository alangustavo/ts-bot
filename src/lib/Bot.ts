import DataSource from "./DataSource";
import Klines from "./Klines";
import Observer from "./IObserver";
import { Strategy } from "./IStrategy";
export default class Bot implements Observer {
  dataSource: DataSource;
  inPosition: boolean;
  strategy: Strategy;
  constructor(dataSource: DataSource, strategy: Strategy) {
    this.inPosition = false;
    this.dataSource = dataSource;
    this.dataSource.attach(this);
    //@todo Talvez implementar várias stratégias simples para serem testadas em ordem.
    this.strategy = strategy;
  }
  update(klines: Klines): void {
    if (!this.inPosition) {
      this.strategy.getBuySignal(klines);
    } else {
      this.strategy.getSellSignal(klines);
    }
  }
}
