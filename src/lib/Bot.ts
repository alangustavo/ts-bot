import DataSource from "./DataSource";
import Klines from "./Klines";
import { Strategy } from "./IStrategy";
import { BinanceInterval } from "binance-historical/build/types";
import HistoricalDataSource from "./HistoricalDataSource";
import BinanceDataSource from "./BinanceDataSource";
import Indicator from "./Indicator";
export default class Bot {
  dataSource: DataSource;

  constructor(indicator: Indicator, ini?: Date, end?: Date) {
    // This is a backtest bot?
    if (typeof ini !== "undefined" && typeof end !== "undefined") {
      this.dataSource = new HistoricalDataSource(
        indicator.getSymbol(),
        indicator.getInterval(),
        ini,
        end
      );
      // This is a real data bot
    } else {
      this.dataSource = new BinanceDataSource(
        indicator.getSymbol(),
        indicator.getInterval(),
      );
    }
    this.dataSource.attach(indicator);

  }

  addIndicator(indicator: Indicator): void {
    this.dataSource.attach(indicator);
  }
  update(_klines: Klines): void { }
}
