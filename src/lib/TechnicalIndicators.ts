import { StochasticRSI } from "technicalindicators";
var talib = require("../../node_modules/talib");

export default class TechnicalIndicators {
  MACD(
    closes: number[],
    fastPeriod: number,
    slowPeriod: number,
    signalPeriod: number
  ): { MACD: number[]; MACDSignal: number[]; MACDHist: number[] } {
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

  macd(
    closes: number[],
    fastPeriod: number,
    slowPeriod: number,
    signalPeriod: number,
    index: number = -1
  ): { MACD: number; MACDSignal: number; MACDHist: number } {
    let i = this.MACD(closes, fastPeriod, slowPeriod, signalPeriod);
    if (index < 0) {
      index += i.MACD.length;
    }
    return { MACD: i.MACD[index], MACDHist: i.MACDHist[index], MACDSignal: i.MACDSignal[index] };
  }

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
  sma(closes: number[], period: number = 14, index: number = -1): number {
    let i = this.SMA(closes, period);
    if (index < 0) {
      index += i.length;
    }
    return i[index];
  }

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
  ema(closes: number[], period: number, index: number = -1): number {
    let i = this.EMA(closes, period);
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
  ): { K: number[]; D: number[]; stochRSI: number[] } {
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
  ): { K: number[]; D: number[] } {
    const rsi = this.RSI(closes, lengthRSI);
    return this.STOCH(rsi, rsi, rsi, lengthStock, smoothK, smoothD, 0, 0);
  }

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
    slowKPeriod: number = 14,
    slowDPeriod: number = 3,
    slowK_MAType = 3,
    slowD_MAType = 3
  ): { K: number[]; D: number[] } {
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

}
