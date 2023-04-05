import DataSource from "./DataSource";
import Klines from "./Klines";
import { Strategy } from "./IStrategy";
import { BinanceInterval } from "binance-historical/build/types";
import HistoricalDataSource from "./HistoricalDataSource";
import BinanceDataSource from "./BinanceDataSource";
export default class Bot {
  dataSource: DataSource;

  constructor(strategy: Strategy, ini?: Date, end?: Date) {
    // This is a backtest bot?
    if (typeof ini !== "undefined" && typeof end !== "undefined") {
      this.dataSource = new HistoricalDataSource(
        strategy.symbol,
        strategy.interval,
        ini,
        end
      );
      // This is a real data bot
    } else {
      this.dataSource = new BinanceDataSource(
        strategy.symbol,
        strategy.interval
      );
    }
    this.dataSource.attach(strategy);
  }
  update(_klines: Klines): void {}
}
