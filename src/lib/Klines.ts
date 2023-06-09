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

  addKlinesFromArray(array_klines: any[][]): void {
    array_klines.forEach(async (k) => {
      await this.addKline(new Kline(k));
    });
  }
  addKline(kline: Kline): void {
    if (this.klines.length > 0 && kline.openTime.getTime() > this.getId()) {
      this.klines.push(kline);
      if (this.klines.length > this.limit) {
        this.klines.shift();
      }
    } else {
      this.klines.pop();
      this.klines.push(kline);
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

  getId(): number {
    const op = this.getOpenTimes();
    return op[op.length - 1].getTime();
  }

  getPrice(): number {
    const price = this.getCloses();
    return price[price.length - 1];
  }
}
