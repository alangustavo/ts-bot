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
  tirsi(closes: number[],
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
  adosc(highs: number[],
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
    period: number = 14
  ): number[] {
    const calc = talib.execute({
      name: "MFI",
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
  mfi(highs: number[],
    lows: number[],
    closes: number[],
    period: number = 14, index: number = -1): number {
    let i = this.MFI(highs, lows, closes, period);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }
}
