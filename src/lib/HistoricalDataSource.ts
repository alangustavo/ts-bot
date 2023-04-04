import { BinanceInterval } from "binance-historical/build/types";
import DataSource from "./DataSource";
import HistoricalKlines from "./HistoricalKlines";
import Klines from "./Klines";
import Kline from "./Kline";

export default class HistoricalDataSource extends DataSource {
  historicalKlines: HistoricalKlines;
  constructor(symbol: string, interval: BinanceInterval, ini: Date, end: Date) {
    super(symbol, interval, 500);
    this.historicalKlines = new HistoricalKlines(symbol, interval, ini, end);
    this.historicalKlines.getHistoricalKlinesFromBinance();
    this.start();
  }
  async start() {
    const stmt = await this.historicalKlines.start();
    let count = 0;
    for (const k of stmt.iterate()) {
      this.klines.addKline(new Kline(k));
      count++;
      if (count >= this.limit) {
        this.notify();
      }
    }
  }
}
