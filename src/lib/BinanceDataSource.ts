import DataSource from "./DataSource";

export default class BinanceDataSource extends DataSource {
  constructor(symbol: string, interval: string, limit: number = 500) {
    super(symbol, interval, limit);
  }
}
