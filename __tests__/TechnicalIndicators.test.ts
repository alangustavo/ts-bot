import TechnicalIndicators from "../src/lib/TechnicalIndicators";
import Klines from "../src/lib/Klines";
import Kline500 from "../testdata/data";

const klines = new Klines(500);
klines.addKlinesFromArray(Kline500);

// Tests Are From SOLUSDT 15m Last OpenDate: 1 April 2023 03:45:00

describe("Indicators Tests", () => {
  it("Should exists", () => {
    const obj = new TechnicalIndicators();
    expect(obj).toBeInstanceOf(TechnicalIndicators);
  });

  it("Should return a correct Array from Talib MACD - Moving Average Convergence Divergence ", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.MACD(klines.getCloses(), 12, 26, 9);
    expect(obj).toBeInstanceOf(TechnicalIndicators);
    const macd = indicator.MACD[indicator.MACD.length - 1];
    expect(macd).toBeCloseTo(-0.0008123);
    const macdHist = indicator.MACDHist[indicator.MACDHist.length - 1];
    expect(macdHist).toBeCloseTo(-0.02688345);
    const macdSignal = indicator.MACDSignal[indicator.MACDSignal.length - 1];
    expect(macdSignal).toBeCloseTo(0.023075736);
  });
  it("Should return a correct Indicator Talib MACD - Moving Average Convergence Divergence", () => {
    const obj = new TechnicalIndicators();
    // Tests Are From SOLUSDT 15m Last OpenDate: 1 April 2023 03:45:00 <<<<<
    let indicator = obj.macd(klines.getCloses(), 12, 26, 9, -1);
    expect(indicator.MACD).toBeCloseTo(-0.0008123);
    expect(indicator.MACDHist).toBeCloseTo(-0.02688345);
    expect(indicator.MACDSignal).toBeCloseTo(0.023075736);
    // Tests Are From SOLUSDT 15m Last OpenDate: 1 April 2023 03:30:00 <<<<<
    indicator = obj.macd(klines.getCloses(), 12, 26, 9, -2);
    expect(indicator.MACDHist).toBeCloseTo(-0.02688345);
    expect(indicator.MACD).toBeCloseTo(0.00216402);
    expect(indicator.MACDSignal).toBeCloseTo(0.02904747);
  });

  it("Should return a correct Talib WILLR - William %R", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.WILLR(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      14
    );
    const i = indicator[indicator.length - 1];
  });

  it("Should return a correct Talib SMA - Simple Moving Average", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.SMA(klines.getCloses(), 99);
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(20.73292929);
  });
  it("Should return a correct value of Talib SMA - Simple Moving Average (SMA)", () => {

    const obj = new TechnicalIndicators();
    let indicator = obj.sma(klines.getCloses(), 9, -1);
    // Tests Are From SOLUSDT 15m Last OpenDate: 1 April 2023 03:45:00 <<<<<
    expect(indicator).toBeCloseTo(21.05333333);
    indicator = obj.sma(klines.getCloses(), 9, -2);
    expect(indicator).toBeCloseTo(21.0511111);
  });
  it("Should return a correct Talib EMA - Exponencial Moving Average", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.EMA(klines.getCloses(), 99);
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(20.85754898);
  });
  it("Should return a correct value of Talib EMA - Exponencial Moving Average (EMA)", () => {

    const obj = new TechnicalIndicators();
    let indicator = obj.ema(klines.getCloses(), 9, -1);
    // Tests Are From SOLUSDT 15m Last OpenDate: 1 April 2023 03:45:00 <<<<<
    expect(indicator).toBeCloseTo(21.04880765);
    indicator = obj.ema(klines.getCloses(), 9, -2);
    expect(indicator).toBeCloseTo(21.05350956);
  });
  it("Should return a correct Talib DEMA - Double Exponencial Moving Average", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.DEMA(klines.getCloses(), 99);
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(21.01563807);
  });
  it("Should return a correct value of Talib DEMA - Double Exponencial Moving Average (DEMA)", () => {

    const obj = new TechnicalIndicators();
    let indicator = obj.dema(klines.getCloses(), 9, -1);
    // Tests Are From SOLUSDT 15m Last OpenDate: 1 April 2023 03:45:00 <<<<<
    expect(indicator).toBeCloseTo(21.01561029);
    indicator = obj.dema(klines.getCloses(), 9, -2);
    expect(indicator).toBeCloseTo(21.01671477);
  });
  it("Should return a correct Talib TEMA - Triple Exponencial Moving Average", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.TEMA(klines.getCloses(), 99);
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(21.15953758);
  });
  it("Should return a correct value of Talib TEMA - Triple Exponencial Moving Average (DEMA)", () => {
    const obj = new TechnicalIndicators();
    let indicator = obj.tema(klines.getCloses(), 9, -1);
    // Tests Are From SOLUSDT 15m Last OpenDate: 1 April 2023 03:45:00 <<<<<
    expect(indicator).toBeCloseTo(21.01013371);
    indicator = obj.tema(klines.getCloses(), 9, -2);
    expect(indicator).toBeCloseTo(21.00627162);
  });
  it("Should return a correct  Array of Talib RSI", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.RSI(klines.getCloses(), 14);
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(48.08777259);
  });
  it("Should return a correct value Talib RSI", () => {
    const obj = new TechnicalIndicators();
    let indicator = obj.rsi(klines.getCloses(), 9);
    expect(indicator).toBeCloseTo(45.31040163);
    indicator = obj.rsi(klines.getCloses(), 9, -2);
    expect(indicator).toBeCloseTo(46.29715778);
  });
  it("Should return a correct TISRSI - technicalindicator StochasticRSI Stochastic Relative Strength Index", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.TISRSI(klines.getCloses(), 14, 14, 3);
    const k = indicator.K[indicator.K.length - 1];
    const d = indicator.D[indicator.D.length - 1];
    const s = indicator.stochRSI[indicator.stochRSI.length - 1];

    expect(k).toBeCloseTo(28.432631159, 8);
    expect(d).toBeCloseTo(25.127688059, 8);
    expect(s).toBeCloseTo(33.059087509, 8);
  });

  it("Should return a correct Talib StochRSI", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.STOCHRSI(klines.getCloses(), 14, 14, 3, 3);
    const k = indicator.K[indicator.K.length - 1];
    const d = indicator.D[indicator.D.length - 1];
    expect(k).toBeCloseTo(28.43996423, 8);
    expect(d).toBeCloseTo(25.13260365, 8);
  });

  it("Should return a correct Talib Stoch", () => {
    const obj = new TechnicalIndicators();
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

  it("Should return a correct Array Talib Chaikin Oscilator (ADOSC)", () => {
    const obj = new TechnicalIndicators();
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
  });
  it("Should return a correct value of Talib Chaikin Oscilator (ADOSC)", () => {
    const obj = new TechnicalIndicators();
    let indicator = obj.adosc(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      klines.getVolumes(),
      3,
      10, -1
    );
    expect(indicator).toBeCloseTo(-23890.33581591);
    indicator = obj.adosc(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      klines.getVolumes(),
      3,
      10, -2
    );
    expect(indicator).toBeCloseTo(-27881.41588055);
  });
});
