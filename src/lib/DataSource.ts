import Klines from "./Klines";

export default class DataSource {
  symbol: string;
  interval: string;
  limit: number;
  klines: Klines;
  constructor(symbol: string, interval: string, limit: number = 500) {
    this.symbol = symbol;
    this.interval = interval;
    this.limit = limit;
    this.klines = new Klines(limit);
  }
}
