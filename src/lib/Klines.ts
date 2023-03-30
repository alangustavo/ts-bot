export default class Klines {
  openTimes: number[];
  opens: number[];
  highs: number[];
  lows: number[];
  closes: number[];
  volumes: number[];
  quotedAssetVolume: number[];
  trades: number[];
  takerBuyBaseAssetVolume: number[];
  takerBuyQuoteAssetVolume: number[];
  constructor(limit: number) {
    this.openTimes = new Array<number>();
    this.opens = new Array<number>();
    this.highs = new Array<number>();
    this.lows = new Array<number>();
    this.closes = new Array<number>();
    this.volumes = new Array<number>();
    this.quotedAssetVolume = new Array<number>();
    this.trades = new Array<number>();
    this.takerBuyBaseAssetVolume = new Array<number>();
    this.takerBuyQuoteAssetVolume = new Array<number>();
  }
}
