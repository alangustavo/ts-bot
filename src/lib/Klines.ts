import Kline from "./Kline";

/**
 * Klines is a limited set of Klines.
 */
export default class Klines {
  klines: Kline[];
  limit: number;
  constructor(limit: number) {
    this.limit = limit;
    this.klines = new Array<Kline>();
  }

  addKline(kline: Kline): void {
    this.klines.push(kline);
    if (this.klines.length > this.limit) {
      this.klines.shift();
    }
  }
  getOpenTimes(): Array<Date> {
    return this.klines.map((k) => k.openTime);
  }
  getOpens(): Array<number> {
    return this.klines.map((k) => k.open);
  }
  getHighs(): Array<number> {
    return this.klines.map((k) => k.high);
  }
  getLows(): Array<number> {
    return this.klines.map((k) => k.low);
  }
  getCloses(): Array<number> {
    return this.klines.map((k) => k.close);
  }
  getVolumes(): Array<number> {
    return this.klines.map((k) => k.volume);
  }
  getCloseTimes(): Array<Date> {
    return this.klines.map((k) => k.closeTime);
  }
  getTrades(): Array<number> {
    return this.klines.map((k) => k.trades);
  }
  getQuotedAssetVolumes(): Array<number> {
    return this.klines.map((k) => k.quotedAssetVolume);
  }
  getTakerBuyBaseAssetVolumes(): Array<number> {
    return this.klines.map((k) => k.takerBuyBaseAssetVolume);
  }
  getTakerBuyQuoteAssetVolumes(): Array<number> {
    return this.klines.map((k) => k.takerBuyQuoteAssetVolume);
  }
}
