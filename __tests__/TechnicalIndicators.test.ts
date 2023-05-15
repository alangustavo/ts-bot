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

  it("Should return a correct array of Talib WILLR - William %R", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.WILLR(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      14
    );
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(-73.80952381);
  });
  it("Should return a correct value of Talib WILLR William %R", () => {

    const obj = new TechnicalIndicators();
    let indicator = obj.willr(klines.getHighs(), klines.getLows(), klines.getCloses(), 99);
    // Tests Are From SOLUSDT 15m Last OpenDate: 1 April 2023 03:45:00 <<<<<
    expect(indicator).toBeCloseTo(-31.72413793);
    indicator = obj.willr(klines.getHighs(), klines.getLows(), klines.getCloses(), 99, -2);
    expect(indicator).toBeCloseTo(-31.03448276);
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

  it("Should return a correct Talib StochRSI (STOCHRSI)", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.STOCHRSI(klines.getCloses(), 14, 14, 3, 3);
    const k = indicator.K[indicator.K.length - 1];
    const d = indicator.D[indicator.D.length - 1];
    expect(k).toBeCloseTo(28.43996423, 8);
    expect(d).toBeCloseTo(25.13260365, 8);
  });

  it("Should return a correct value of Talib Stochastic RSI (STOCHRSI)", () => {
    const obj = new TechnicalIndicators();
    let indicator = obj.stochrsi(
      klines.getCloses(),
      14,
      14,
      3,
      3,
      -1
    );
    /* foud a little difference from Binance */
    expect(indicator.K).toBeCloseTo(28.4400, 4);
    expect(indicator.D).toBeCloseTo(25.1326, 4);

    indicator = obj.stochrsi(
      klines.getCloses(),
      29,
      29,
      7,
      7,
      -2
    );
    /* foud a little difference from Binance */
    expect(indicator.K).toBeCloseTo(8.3627, 4);
    expect(indicator.D).toBeCloseTo(10.3954, 4);

  });


  it("Should return a correct Stochastic Relative Strength Indicator(Diferent from Binance - Other Library)", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.TISRSI(klines.getCloses(), 29, 29, 7, 7);
    const k = indicator.K[indicator.K.length - 1];
    const d = indicator.D[indicator.D.length - 1];
    expect(k).toBeCloseTo(7.8948, 4);
    expect(d).toBeCloseTo(9.4131, 4);
  });

  it("Should return a correct value of Talib Stochastic RSI (STOCHRSI)", () => {
    const obj = new TechnicalIndicators();
    let indicator = obj.tisrsi(
      klines.getCloses(),
      14,
      14,
      3,
      3,
      -1
    );
    /* foud a little difference from Binance */
    expect(indicator.K).toBeCloseTo(28.4326, 4);
    expect(indicator.D).toBeCloseTo(25.1277, 4);

    indicator = obj.tisrsi(
      klines.getCloses(),
      29,
      29,
      7,
      7,
      -2
    );
    /* foud a little difference from Binance */
    expect(indicator.K).toBeCloseTo(8.3483, 4);
    expect(indicator.D).toBeCloseTo(10.3859, 4);

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


  it("Should return a correct Array Stochastic (STOCH)", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.STOCH(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      14,
      1,
      3
    );
    const k = indicator.K[indicator.K.length - 1];
    const d = indicator.D[indicator.D.length - 1];
    expect(k).toBeCloseTo(26.19047619, 8);
    expect(d).toBeCloseTo(26.98412698, 8);
  });
  it("Should return a correct value of Talib Stochastic (STOCH)", () => {
    const obj = new TechnicalIndicators();
    let indicator = obj.stoch(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      29,
      3,
      5,
      -1
    );
    expect(indicator.K).toBeCloseTo(30.80808081, 8);
    expect(indicator.D).toBeCloseTo(28.44715815, 8);
    indicator = obj.stoch(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      29,
      3,
      5,
      -3
    );
    expect(indicator.K).toBeCloseTo(28.78787879, 8);
    expect(indicator.D).toBeCloseTo(32.99610292, 8);
  });

  it("Should return a correct Array Talib Money Flow Indicator (MFI)", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.MFI(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      klines.getVolumes(),
      14
    );
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(34.09550966, 8);
  });

  it("Should return a correct value of Talib Money Flow Indicator (MFI)", () => {
    const obj = new TechnicalIndicators();
    let indicator = obj.mfi(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      klines.getVolumes(),
      19, -1
    );
    expect(indicator).toBeCloseTo(34.89029944, 8);
    indicator = obj.mfi(
      klines.getHighs(),
      klines.getLows(),
      klines.getCloses(),
      klines.getVolumes(),
      19, -2
    );
    expect(indicator).toBeCloseTo(31.12091625, 8);

  });

  it("Should return a correct Array Talib On Balance Volume (OBV)", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.OBV(
      klines.getCloses(),
      klines.getVolumes()
    );
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(-149644.1799999973, 8);
  });

  it("Should return a correct value of Talib On Balance Volume (OBV)", () => {
    const obj = new TechnicalIndicators();
    let indicator = obj.obv(
      klines.getCloses(),
      klines.getVolumes(),
      -3
    );
    expect(indicator).toBeCloseTo(-151550.66, 8);
    indicator = obj.obv(
      klines.getCloses(),
      klines.getVolumes(),
      -2
    );
    expect(indicator).toBeCloseTo(-143764.66, 8);

  });
  it("Should return a correct Array Talib HT_SINE (HT_SINE)", () => {
    const obj = new TechnicalIndicators();
    const indicator = obj.HT_SINE(klines.getCloses(), 499);
    console.log(indicator);
    const i = indicator[indicator.length - 1];
    expect(i).toBeCloseTo(30, 8);
  });

});
