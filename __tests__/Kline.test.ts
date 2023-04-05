import Kline from "../src/lib/Kline";

describe("Kline Tests", () => {
  it("Should be exists and constructed by array from binance", () => {
    const obj = new Kline(arrayFromBinance);
    expect(obj).toBeInstanceOf(Kline);
  });

  const arrayFromBinance = [
    1499040000000, // Kline open time
    "0.01634790", // Open price
    "0.80000000", // High price
    "0.01575800", // Low price
    "0.01577100", // Close price
    "148976.11427815", // Volume
    1499644799999, // Kline Close time
    "2434.19055334", // Quote asset volume
    308, // Number of trades
    "1756.87402397", // Taker buy base asset volume
    "28.46694368", // Taker buy quote asset volume
    "0", // Unused field, ignore.
  ];
  it("Should be constructed by array from binance", () => {
    const obj = new Kline(arrayFromBinance);
    expect(obj.openTime).toEqual(new Date(1499040000000));
    expect(obj.open).toEqual(0.0163479);
    expect(obj.high).toEqual(0.8);
    expect(obj.low).toEqual(0.015758);
    expect(obj.close).toEqual(0.015771);
    expect(obj.volume).toEqual(148976.11427815);
    expect(obj.closeTime).toEqual(new Date(1499644799999));
    expect(obj.quotedAssetVolume).toEqual(2434.19055334);
    expect(obj.trades).toEqual(308);
    expect(obj.takerBuyBaseAssetVolume).toEqual(1756.87402397);
    expect(obj.takerBuyQuoteAssetVolume).toEqual(28.46694368);
  });

  const objectFromBinance = {
    t: 1680165900000, // Kline start time
    T: 1680166799999, // Kline close time
    s: "SOLUSDT", // Symbol
    i: "15m", // Interval
    f: 354712476, // First trade ID
    L: 354712700, // Last trade ID
    o: "20.77000000", // Open price
    c: "20.79000000", // Close price
    h: "20.82000000", // High price
    l: "20.76000000", // Low price
    v: "4920.59000000", // Base asset volume
    n: 225, // Number of trades
    x: false, // Is this kline closed?
    q: "102198.49750000", // Quote asset volume
    V: "2625.58000000", // Taker buy base asset volume
    Q: "54535.30750000", // Taker buy quote asset volume
    B: "0", // Ignore
  };

  it("Should be constructed by object from binance", () => {
    const obj = new Kline(objectFromBinance);
    expect(obj.openTime).toEqual(new Date(1680165900000));
    expect(obj.open).toEqual(20.77);
    expect(obj.high).toEqual(20.82);
    expect(obj.low).toEqual(20.76);
    expect(obj.close).toEqual(20.79);
    expect(obj.volume).toEqual(4920.59);
    expect(obj.closeTime).toEqual(new Date(1680166799999));
    expect(obj.quotedAssetVolume).toEqual(102198.4975);
    expect(obj.trades).toEqual(225);
    expect(obj.takerBuyBaseAssetVolume).toEqual(2625.58);
    expect(obj.takerBuyQuoteAssetVolume).toEqual(54535.3075);
  });

  const objFromDatabase = {
    openTime: 1611964800000,
    open: 3.8301,
    high: 3.8995,
    low: 3.8136,
    close: 3.895,
    closeTime: 1611965699999,
    volume: 46867.97,
    quotedAssetVolume: 181042.318636,
    trades: 905,
    takerBuyBaseAssetVolume: 24915.85,
    takerBuyQuoteAssetVolume: 96347.377683,
  };
  it("Should be constructed by object from binance Historical Data", () => {
    const obj = new Kline(objFromDatabase);
    expect(obj.openTime).toEqual(new Date(1611964800000));
    expect(obj.open).toEqual(3.8301);
    expect(obj.high).toEqual(3.8995);
    expect(obj.low).toEqual(3.8136);
    expect(obj.close).toEqual(3.895);
    expect(obj.volume).toEqual(46867.97);
    expect(obj.closeTime).toEqual(new Date(1611965699999));
    expect(obj.quotedAssetVolume).toEqual(181042.318636);
    expect(obj.trades).toEqual(905);
    expect(obj.takerBuyBaseAssetVolume).toEqual(24915.85);
    expect(obj.takerBuyQuoteAssetVolume).toEqual(96347.377683);
  });
});
