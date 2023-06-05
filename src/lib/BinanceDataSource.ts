import DataSource from "./DataSource";
import KlineWebSocket from "./KlineWebSocket";
const axios = require("axios");

export default class BinanceDataSource extends DataSource {
  minute: number = -1;
  lastCheckIndicator: number = -1;
  klineWebSocket: KlineWebSocket;
  constructor(symbol: string, interval: string, limit: number = 500) {
    super(symbol, interval, limit);
    this.minute = parseInt(interval);
    this.getCandles();
    let channel = `${symbol.toLocaleLowerCase()}@kline_${interval}`;
    this.klineWebSocket = new KlineWebSocket(channel, this.klines);
  }

  async getCandles() {
    const url =
      process.env.API_URL +
      "/v3/klines?symbol=" +
      this.symbol.toUpperCase() +
      "&interval=" +
      this.interval +
      "&limit=" +
      this.limit;
    this.klines = await axios.get(url);
  }
}
