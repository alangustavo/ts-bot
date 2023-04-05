import Indicators from "../src/lib/Indicators";
import Klines from "../src/lib/Klines";
import Kline500 from "../testdata/data";

const klines = new Klines(500);
klines.addKlinesFromArray(Kline500);

// Tests Are From SOLUSDT 15m Last OpenDate: 1 April 2023 03:45:00

describe("Indicators Tests", () => {
  it("Should exists", () => {
    const obj = new Indicators();
    expect(obj).toBeInstanceOf(Indicators);
  });

  it("Should return a correct Talib MACD - Moving Average Convergence Divergence ", () => {
    const obj = new Indicators();
    const indicator = obj.MACD(klines.getCloses(), 12, 26, 9);
    console.log(indicator);
    expect(obj).toBeInstanceOf(Indicators);
    const macd = indicator.MACD[indicator.MACD.length - 1];
    expect(macd).toBeCloseTo(-0.0008123);
    const macdHist = indicator.MACDHist[indicator.MACDHist.length - 1];
    expect(macdHist).toBeCloseTo(-0.02688345);
    const macdSignal = indicator.MACDSignal[indicator.MACDSignal.length - 1];
    expect(macdSignal).toBeCloseTo(0.023075736);
  });
  it("Should return a correct Talib WILLR - William %R", () => {
    const obj = new Indicators();
    const indicator = obj.WILLR(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      14
    );
    const i = indicator[indicator.length - 1];
    console.log(i);
  });

  it("Should return a correct Talib SMA - Simple Moving Average", () => {
    const obj = new Indicators();
    const indicator = obj.SMA(klines.getCloses(), 99);
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(20.73292929);
  });

  it("Should return a correct Talib RSI", () => {
    const obj = new Indicators();
    const indicator = obj.RSI(klines.getCloses(), 14);
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(48.08777259);
  });

  it("Should return a correct TISRSI - technicalindicator StochasticRSI Stochastic Relative Strength Index", () => {
    const obj = new Indicators();
    const indicator = obj.TISRSI(klines.getCloses(), 14, 14, 3);
    const k = indicator.K[indicator.K.length - 1];
    const d = indicator.D[indicator.D.length - 1];
    const s = indicator.stochRSI[indicator.stochRSI.length - 1];

    expect(k).toBeCloseTo(28.432631159, 8);
    expect(d).toBeCloseTo(25.127688059, 8);
    expect(s).toBeCloseTo(33.059087509, 8);
  });

  it("Should return a correct Talib StochRSI", () => {
    const obj = new Indicators();
    const indicator = obj.STOCHRSI(klines.getCloses(), 14, 14, 3, 3);
    const k = indicator.K[indicator.K.length - 1];
    const d = indicator.D[indicator.D.length - 1];
    expect(k).toBeCloseTo(28.43996423, 8);
    expect(d).toBeCloseTo(25.13260365, 8);
  });

  it("Should return a correct Talib Stoch", () => {
    const obj = new Indicators();
    const indicator = obj.STOCH(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      14,
      1,
      3,
      0,
      0
    );
    const k = indicator.K[indicator.K.length - 1];
    const d = indicator.D[indicator.D.length - 1];
    expect(k).toBeCloseTo(26.19047619, 8);
    expect(d).toBeCloseTo(26.98412698, 8);
  });

  it("Should return a correct Talib Chaikin Oscilator (ADOSC)", () => {
    const obj = new Indicators();
    const indicator = obj.ADOSC(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      klines.getVolumes(),
      3,
      10
    );
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(-23890.33581591);
    // const k = indicator.K[indicator.K.length - 1];
    // const d = indicator.D[indicator.D.length - 1];
    // expect(k).toBeCloseTo(26.19047619, 8);
    // expect(d).toBeCloseTo(26.98412698, 8);
  });
});
