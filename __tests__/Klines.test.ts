import Kline from "../src/lib/Kline";
import Klines from "../src/lib/Klines";
import Kline500 from "../testdata/data";

describe("Klines Tests", () => {
  it("Should exists", () => {
    const obj = new Klines(3);
    expect(obj).toBeInstanceOf(Klines);
  });

  it("It must not have the amount of elements greater than the limits.", () => {
    const obj = new Klines(3);
    let kline = new Kline([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(obj.getCloses().length).toEqual(0);
    obj.addKline(kline);
    expect(obj.getCloses().length).toEqual(1);
    obj.addKline(kline);
    expect(obj.getCloses().length).toEqual(2);
    obj.addKline(kline);
    expect(obj.getCloses().length).toEqual(3);
    obj.addKline(kline);
    expect(obj.getCloses().length).toEqual(3);
  });

  it("It must return array from klines.", () => {
    const obj = new Klines(3);
    let kline = new Kline([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    obj.addKline(kline);
    obj.addKline(kline);
    obj.addKline(kline);
    obj.addKline(kline);
    expect(obj.getOpenTimes()).toEqual([new Date(0), new Date(0), new Date(0)]);
    expect(obj.getOpens()).toEqual([1, 1, 1]);
    expect(obj.getHighs()).toEqual([2, 2, 2]);
    expect(obj.getLows()).toEqual([3, 3, 3]);
    expect(obj.getCloses()).toEqual([4, 4, 4]);
    expect(obj.getVolumes()).toEqual([5, 5, 5]);
    expect(obj.getCloseTimes()).toEqual([
      new Date(6),
      new Date(6),
      new Date(6),
    ]);
    expect(obj.getQuotedAssetVolumes()).toEqual([7, 7, 7]);
    expect(obj.getTrades()).toEqual([8, 8, 8]);
    expect(obj.getTakerBuyBaseAssetVolumes()).toEqual([9, 9, 9]);
    expect(obj.getTakerBuyQuoteAssetVolumes()).toEqual([10, 10, 10]);
  });

  it("It must load data from multimensional array.", () => {
    const obj = new Klines(500);
    obj.addKlinesFromArray(Kline500);
    expect(obj.getCloses().length).toEqual(500);
  });

  
  it("It must return the last Milisseconds ID.", () => {
    const obj = new Klines(500);
    obj.addKlinesFromArray(Kline500);
    expect(obj.getId()).toEqual(1680320700000);
  });
});
