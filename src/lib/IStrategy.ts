import CSVFile from "./CSVFile";
import Observer from "./IObserver";
import TechinicalIndicators from "./TechnicalIndicators";
import Klines from "./Klines";
import { BinanceInterval } from "binance-historical/build/types";

enum Signal {
  BUY = "BUY",
  SELL = "SELL",
  WAITBUY = "WAIT BUY",
  WAITSELL = "WAIT SELL",
  STOPGAIN = "STOPGAIN",
  STOPLOSS = "STOPLOSS",
}
abstract class Strategy implements Observer {
  indicator: TechinicalIndicators;
  klines!: Klines;
  buyPrice: number;
  result: number;
  inPosition: boolean;
  symbol: string;
  interval: BinanceInterval;
  csvFile: CSVFile;
  constructor(symbol: string, interval: BinanceInterval) {
    this.symbol = symbol;
    this.interval = interval;
    this.csvFile = new CSVFile(symbol, interval, this.constructor.name);
    this.getHeader();
    this.indicator = new TechinicalIndicators();
    this.inPosition = false;
    this.buyPrice = 0;
    this.result = 1;
  }
  abstract update(klines: Klines): void;
  public abstract calculate(klines: Klines): void;
  /**
   * "PLEASE WRITE A FILE HEADER FOR YOUR CSV.";
   * @returns a Strategy Description and Fields.
   */
  public abstract getHeader(): void;
}

export { Strategy, Signal };
