import { StochasticRSI } from "technicalindicators";
var talib = require("../../node_modules/talib");

export default class TechnicalIndicators {
  /**
   * 
   * @param closes 
   * @param fastPeriod 
   * @param slowPeriod 
   * @param signalPeriod 
   * @returns { MACD: number[]; MACDSignal: number[]; MACDHist: number[]; }
   */
  MACD(
    closes: number[],
    fastPeriod: number,
    slowPeriod: number,
    signalPeriod: number
  ): { MACD: number[]; MACDSignal: number[]; MACDHist: number[]; } {
    const calc = talib.execute({
      name: "MACD",
      inReal: closes,
      startIdx: 0,
      endIdx: closes.length - 1,
      optInFastPeriod: fastPeriod,
      optInSlowPeriod: slowPeriod,
      optInSignalPeriod: signalPeriod,
    });
    return {
      MACD: calc.result.outMACD,
      MACDSignal: calc.result.outMACDSignal,
      MACDHist: calc.result.outMACDHist,
    };
  }
  /**
   * 
   * @param closes 
   * @param fastPeriod 
   * @param slowPeriod 
   * @param signalPeriod 
   * @param index 
   * @returns { MACD: number; MACDSignal: number; MACDHist: number; }
   */
  macd(
    closes: number[],
    fastPeriod: number,
    slowPeriod: number,
    signalPeriod: number,
    index: number = -1
  ): { MACD: number; MACDSignal: number; MACDHist: number; } {
    let i = this.MACD(closes, fastPeriod, slowPeriod, signalPeriod);
    if (index < 0) {
      index += i.MACD.length;
    }
    return { MACD: i.MACD[index], MACDHist: i.MACDHist[index], MACDSignal: i.MACDSignal[index] };
  }

  /**
   * 
   * @param highs 
   * @param lows 
   * @param closes 
   * @param period 
   * @returns number[]
   */
  WILLR(
    highs: number[],
    lows: number[],
    closes: number[],
    period: number = 14
  ): number[] {
    const calc = talib.execute({
      name: "WILLR",
      high: highs,
      low: lows,
      close: closes,
      startIdx: 0,
      endIdx: highs.length - 1,
      optInTimePeriod: period,
    });
    // console.log();
    return calc.result.outReal;
  }
  /**
   * 
   * @param highs 
   * @param lows 
   * @param closes 
   * @param period 
   * @param index 
   * @returns number
   */
  willr(highs: number[],
    lows: number[],
    closes: number[],
    period: number = 14, index: number = -1): number {
    let i = this.WILLR(highs, lows, closes, period);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }
  /**
   * 
   * @param closes 
   * @param period 
   * @returns 
   */
  SMA(closes: number[], period: number = 14): number[] {
    const calc = talib.execute({
      name: "SMA",
      inReal: closes,
      startIdx: 0,
      endIdx: closes.length - 1,
      optInTimePeriod: period,
    });
    return calc.result.outReal;
  }
  /**
   * 
   * @param closes 
   * @param period 
   * @param index 
   * @returns 
   */
  sma(closes: number[], period: number = 14, index: number = -1): number {
    let i = this.SMA(closes, period);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }
  /**
   * 
   * @param closes 
   * @param period 
   * @returns number[]
   */
  EMA(closes: number[], period: number = 14): number[] {
    const calc = talib.execute({
      name: "EMA",
      inReal: closes,
      startIdx: 0,
      endIdx: closes.length - 1,
      optInTimePeriod: period,
    });
    return calc.result.outReal;
  }
  /**
   * 
   * @param closes 
   * @param period 
   * @param index
   * @returns number
   */
  ema(closes: number[], period: number, index: number = -1): number {
    let i = this.EMA(closes, period);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }
  /**
   * 
   * @param closes 
   * @param period 
   * @returns 
   */
  DEMA(closes: number[], period: number = 14): number[] {
    const calc = talib.execute({
      name: "DEMA",
      inReal: closes,
      startIdx: 0,
      endIdx: closes.length - 1,
      optInTimePeriod: period,
    });
    return calc.result.outReal;
  }
  /**
   * 
   * @param closes 
   * @param period 
   * @param index 
   * @returns 
   */
  dema(closes: number[], period: number, index: number = -1): number {
    let i = this.DEMA(closes, period);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }

  /**
   * 
   * @param closes 
   * @param period 
   * @returns 
   */

  TEMA(closes: number[], period: number = 14): number[] {
    const calc = talib.execute({
      name: "TEMA",
      inReal: closes,
      startIdx: 0,
      endIdx: closes.length - 1,
      optInTimePeriod: period,
    });
    return calc.result.outReal;
  }

  /**
   * 
   * @param closes 
   * @param period 
   * @param index 
   * @returns 
   */
  tema(closes: number[], period: number, index: number = -1): number {
    let i = this.TEMA(closes, period);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }

  /**
   * Calculate a Talib Relative Strength Indicator - (Binance Like)
   * @param closes Closes Prices Array
   * @param period 14 is default
   * @returns Array numbers
   */
  RSI(closes: number[], period: number = 14): number[] {
    const calc = talib.execute({
      name: "RSI",
      inReal: closes,
      startIdx: 0,
      endIdx: closes.length - 1,
      optInTimePeriod: period,
    });
    return calc.result.outReal;
  }

  rsi(closes: number[], period: number, index: number = -1): number {
    let i = this.RSI(closes, period);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }

  /**
   * Calculate a technicalindicators library Stochastic Relative Strength Indicator (Diferent from Binance)
   * @param closes Closes Prices Array
   * @param rsiPeriod 14 is default
   * @param stochasticPeriod 14 is default
   * @param kPeriod 3 default
   * @param dPeriod 3 default
   * @returns K Array number, D Array number, stochRSI Array number
   */
  TISRSI(
    closes: number[],
    rsiPeriod = 14,
    stochasticPeriod = 14,
    kPeriod = 3,
    dPeriod = 3
  ): { K: number[]; D: number[]; stochRSI: number[]; } {
    let inputSRSI = {
      values: closes,
      rsiPeriod: rsiPeriod,
      stochasticPeriod: stochasticPeriod,
      kPeriod: kPeriod,
      dPeriod: dPeriod,
    };
    const result = StochasticRSI.calculate(inputSRSI);
    const k = result.map((values) => values.k);
    const d = result.map((values) => values.d);
    const s = result.map((values) => values.stochRSI);
    return { K: k, D: d, stochRSI: s };
  }


  /**
   * 
   * @param closes 
   * @param rsiPeriod 
   * @param stochasticPeriod 
   * @param kPeriod 
   * @param dPeriod 
   * @param index 
   * @returns 
   */
  tisrsi(closes: number[],
    rsiPeriod = 14,
    stochasticPeriod = 14,
    kPeriod = 3,
    dPeriod = 3,
    index: number = -1): { K: number, D: number, stochRSI: number; } {
    let i = this.TISRSI(closes, rsiPeriod, stochasticPeriod, kPeriod, dPeriod);
    if (index < 0) {
      index += i.D.length;
    }
    return { K: i.K[index], D: i.D[index], stochRSI: i.stochRSI[index] };
  };
  /**
   * Calculate a Talib Stochastic Relative Strength Indicator - (Binance Like)
   * @param closes Closes Prices Array
   * @param lengthRSI default 14
   * @param lengthStock default 14
   * @param smoothK default 3
   * @param smoothD default 3
   * @returns K Array number, D Array number
   */
  STOCHRSI(
    closes: number[],
    lengthRSI: number = 14,
    lengthStock: number = 14,
    smoothK: number = 3,
    smoothD: number = 3
  ): { K: number[]; D: number[]; } {
    const rsi = this.RSI(closes, lengthRSI);
    return this.STOCH(rsi, rsi, rsi, lengthStock, smoothK, smoothD, 0, 0);
  }

  stochrsi(
    closes: number[],
    lengthRSI: number = 14,
    lengthStock: number = 14,
    smoothK: number = 3,
    smoothD: number = 3,
    index: number = -1): { K: number, D: number; } {
    let i = this.STOCHRSI(closes, lengthRSI, lengthStock, smoothK, smoothD);
    if (index < 0) {
      index += i.D.length;
    }
    return { K: i.K[index], D: i.D[index] };
  };

  /**
   * Calculate a Talib Stochastic Indicator- (Binance Like)
   * @param highs Highs Prices Array
   * @param lows Lows Prices Array
   * @param closes Closes Prices Array
   * @param fastkPeriod default 14
   * @param slowKPeriod default 14
   * @param slowDPeriod default 3
   * @param slowK_MAType default 3 - MA_Type
   * @param slowD_MAType default 3 - MA_Type
   * @returns
   */
  STOCH(
    highs: number[],
    lows: number[],
    closes: number[],
    fastkPeriod: number = 14,
    slowKPeriod: number = 1,
    slowDPeriod: number = 3,
    slowK_MAType = 0,
    slowD_MAType = 0
  ): { K: number[]; D: number[]; } {
    const calc = talib.execute({
      name: "STOCH",
      high: highs,
      low: lows,
      close: closes,
      startIdx: 0,
      endIdx: closes.length - 1,

      optInFastK_Period: fastkPeriod,
      optInSlowK_Period: slowKPeriod,
      optInSlowK_MAType: slowK_MAType,
      optInSlowD_Period: slowDPeriod,
      optInSlowD_MAType: slowD_MAType,
    });
    return { K: calc.result.outSlowK, D: calc.result.outSlowD };
  }
  stoch(
    highs: number[],
    lows: number[],
    closes: number[],
    fastkPeriod: number = 14,
    slowKPeriod: number = 1,
    slowDPeriod: number = 3,
    index: number = -1): { K: number, D: number; } {
    let i = this.STOCH(highs, lows, closes, fastkPeriod, slowKPeriod, slowDPeriod, 0, 0);
    if (index < 0) {
      index += i.D.length;
    }
    return { K: i.K[index], D: i.D[index] };
  };

  ADOSC(
    highs: number[],
    lows: number[],
    closes: number[],
    volumes: number[],
    short: number,
    long: number
  ): number[] {
    const calc = talib.execute({
      name: "ADOSC",
      high: highs,
      low: lows,
      close: closes,
      volume: volumes,
      startIdx: 0,
      endIdx: highs.length - 1,
      optInFastPeriod: short,
      optInSlowPeriod: long,
    });
    return calc.result.outReal;
  }
  adosc(
    highs: number[],
    lows: number[],
    closes: number[],
    volumes: number[],
    short: number,
    long: number,
    index: number = -1): number {
    let i = this.ADOSC(highs, lows, closes, volumes, short, long);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }

  /**
 * 
 * @param highs 
 * @param lows 
 * @param closes 
 * @param period 
 * @returns number[]
 */
  MFI(
    highs: number[],
    lows: number[],
    closes: number[],
    volumes: number[],
    period: number = 14
  ): number[] {
    const calc = talib.execute({
      name: "MFI",
      high: highs,
      low: lows,
      close: closes,
      volume: volumes,
      startIdx: 0,
      endIdx: highs.length - 1,
      optInTimePeriod: period,
    });
    // console.log();
    return calc.result.outReal;
  }
  /**
   * 
   * @param highs 
   * @param lows 
   * @param closes 
   * @param volumes 
   * @param period 
   * @param index 
   * @returns number
   */
  mfi(
    highs: number[],
    lows: number[],
    closes: number[],
    volumes: number[],
    period: number = 14,
    index: number = -1): number {

    let i = this.MFI(highs, lows, closes, volumes, period);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }

  /**
  * 
  * @param closes 
  * @param volumes
  * @param period 
  * @returns number[]
  */
  OBV(
    closes: number[],
    volumes: number[],
    period: number = 14
  ): number[] {
    const calc = talib.execute({
      name: "OBV",
      inReal: closes,
      volume: volumes,
      startIdx: 0,
      endIdx: closes.length - 1
    });
    // console.log();
    return calc.result.outReal;
  }
  /**
   * @param closes 
   * @param volumes 
   * @param period 
   * @param index 
   * @returns number
   */
  obv(
    closes: number[],
    volumes: number[],
    index: number = -1): number {

    let i = this.OBV(closes, volumes);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }

  HT_DCPERIOD(closes: number[]): number[] {
    const calc = talib.execute({
      name: "HT_DCPERIOD",
      inReal: closes,
      startIdx: 0,
      endIdx: closes.length - 1
    });
    // console.log();
    return calc.result.outReal;
  }

  ht_dcperiod(closes: number[], index: number = -1): number {
    let i = this.HT_DCPERIOD(closes);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }


  HT_DCPHASE(closes: number[]): number[] {
    const calc = talib.execute({
      name: "HT_DCPHASE",
      inReal: closes,
      startIdx: 0,
      endIdx: closes.length - 1
    });
    // console.log();
    return calc.result.outReal;
  }

  ht_dcphase(closes: number[], index: number = -1): number {
    let i = this.HT_DCPHASE(closes);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }



  HT_PHASOR(closes: number[]): number[] {
    const calc = talib.execute({
      name: "HT_PHASOR",
      inReal: closes,
      startIdx: 0,
      endIdx: closes.length - 1
    });
    // console.log();
    return calc.result.outReal;
  }

  ht_phasor(closes: number[], index: number = -1): number {
    let i = this.HT_PHASOR(closes);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }



  HT_SINE(inputValues: number[], period: number = 3): number[] {
    const out = new Array<number>(inputValues.length);

    let iTrend: number = 0;
    let iPhase: number = 0;
    let i: number = 0;

    const { sin, cos, PI } = Math;

    const degreeToRadian = (deg: number) => deg * (PI / 180);

    const radianToDegree = (rad: number) => rad * (180 / PI);

    const calcEMAFactor = (numPeriods: number) => 2 / (numPeriods + 1);

    const calcEMA = (prevEMA: number, value: number, factor: number) =>
      prevEMA + factor * (value - prevEMA);

    const calcTrend = (value: number, prevTrend: number, prevPhase: number) => {
      const radianPhase = degreeToRadian(prevPhase);
      const quadrature = calcEMA(prevTrend, sin(radianPhase), calcEMAFactor(period));
      const inPhase = calcEMA(prevTrend, cos(radianPhase), calcEMAFactor(period));
      return radianToDegree(Math.atan2(quadrature, inPhase));
    };

    for (i = 0; i < inputValues.length; i++) {
      const currValue = inputValues[i];
      if (i < period) {
        out[i] = -1;
      } else {
        if (i === period) {
          // Initialize iTrend and iPhase with the SMA of the input values
          let sma = 0;
          for (let j = 0; j < period; j++) {
            sma += inputValues[i - j];
          }
          sma /= period;
          iTrend = sma;
          iPhase = sma;
        } else {
          iTrend = calcTrend(currValue, iTrend, iPhase);
          iPhase = calcTrend(currValue, iPhase, iTrend);
        }
        out[i] = iTrend;
      }
    }

    return out;
  }

  ht_sine(closes: number[], period: number, index: number = -1): number {
    let i = this.HT_SINE(closes, period);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }

  HT_TRENDLINE(closes: number[]): number[] {
    const calc = talib.execute({
      name: "HT_TRENDLINE",
      inReal: closes,
      startIdx: 0,
      endIdx: closes.length - 1
    });
    // console.log();
    return calc.result.outReal;
  }

  ht_trendline(closes: number[], index: number = -1): number {
    let i = this.HT_TRENDLINE(closes);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }

  HT_TRENDMODE(closes: number[]): number[] {
    const calc = talib.execute({
      name: "HT_TRENDMODE",
      inReal: closes,
      startIdx: 0,
      endIdx: closes.length - 1
    });
    // console.log();
    return calc.result.outReal;
  }

  ht_trendmode(closes: number[], index: number = -1): number {
    let i = this.HT_TRENDMODE(closes);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }

  fibonacciRetracement(high: number, low: number, levels: number): number[] {
    const retracementLevels = [];
    const range = high - low;
    const levelSize = range / levels;

    for (let i = 0; i <= levels; i++) {
      const level = high - (i * levelSize);
      const retracement = ((high - level) / range) * 100;
      retracementLevels.push(retracement);
    }

    return retracementLevels;
  }

}
