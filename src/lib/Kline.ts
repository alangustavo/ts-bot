export default class Kline {
  openTime: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  closeTime: Date;
  volume: number;
  quotedAssetVolume: number;
  trades: number;
  takerBuyBaseAssetVolume: number;
  takerBuyQuoteAssetVolume: number;
  constructor(data: any) {
    this.openTime = new Date(Array.isArray(data) ? data[0] : data.t);
    this.open = parseFloat(Array.isArray(data) ? data[1] : data.o);
    this.high = parseFloat(Array.isArray(data) ? data[2] : data.h);
    this.low = parseFloat(Array.isArray(data) ? data[3] : data.l);
    this.close = parseFloat(Array.isArray(data) ? data[4] : data.c);
    this.volume = parseFloat(Array.isArray(data) ? data[5] : data.v);
    this.closeTime = new Date(Array.isArray(data) ? data[6] : data.T);
    this.quotedAssetVolume = parseFloat(Array.isArray(data) ? data[7] : data.q);
    this.trades = parseInt(Array.isArray(data) ? data[8] : data.n);
    this.takerBuyBaseAssetVolume = parseFloat(
      Array.isArray(data) ? data[9] : data.V
    );
    this.takerBuyQuoteAssetVolume = parseFloat(
      Array.isArray(data) ? data[10] : data.Q
    );
  }
}
