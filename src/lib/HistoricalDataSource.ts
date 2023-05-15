import { BinanceInterval } from "binance-historical/build/types";
import DataSource from "./DataSource";
import BinanceHistoricalKlines from "./BinanceHistoricalKlines";

import Kline from "./Kline";

const cliProgress = require('cli-progress');



export default class HistoricalDataSource extends DataSource {
  historicalKlines: BinanceHistoricalKlines;
  constructor(symbol: string, interval: BinanceInterval, ini: Date, end: Date) {
    /** Create Limited this.klines */
    super(symbol, interval, 500);
    this.historicalKlines = new BinanceHistoricalKlines(symbol, interval, ini, end);
    this.historicalKlines.getHistoricalKlinesFromBinance();
    this.start();
  }
  async start() {
    const stmt = await this.historicalKlines.start();
    let count = 0;
    let max = this.historicalKlines.count;
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    bar1.start(max, 0);
    for (const k of stmt.iterate()) {
      this.klines.addKline(new Kline(k));
      bar1.increment();
      count++;
      if (count >= this.limit) {
        this.notify();
      }
    }
    bar1.stop();
  }
  // stop the progress bar

}
