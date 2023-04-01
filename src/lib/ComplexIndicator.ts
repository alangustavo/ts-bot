// import Indicators from "./Indicators";
// import Klines from "./Klines";

// // import { StochasticOutput } from "technicalindicators/declarations/momentum/Stochastic";
// class StochasticOutput {
//   k!: number;
//   d!: number;
// }
// abstract class ComplexIndicator extends Indicators {
//   protected klines: Klines;
//   constructor(klines: Klines) {
//     this.klines = klines;
//     this.calculate();
//   }
//   public abstract calculate(): void;

//   protected calculateSMA(closes: number[], period = 14): number[] {
//     var inputSMA = {
//       values: closes,
//       period: period,
//     };
//     return SMA.calculate(inputSMA);
//   }
//   protected calculateSRSI(
//     closes: number[],
//     rsiPeriod = 14,
//     stochasticPeriod = 14,
//     kPeriod = 3,
//     dPeriod = 3
//   ): StochasticRSIOutput[] {
//     var inputSRSI = {
//       values: closes,
//       rsiPeriod: rsiPeriod,
//       stochasticPeriod: stochasticPeriod,
//       kPeriod: kPeriod,
//       dPeriod: dPeriod,
//     };

//     return StochasticRSI.calculate(inputSRSI);
//   }
//   calculateCRSI(
//     high: number[],
//     low: number[],
//     close: number[],
//     period: number = 3,
//     signalPeriod: number = 2
//   ): StochasticOutput[] {
//     let inputCRSI = {
//       high: high,
//       low: low,
//       close: close,
//       period: period,
//       signalPeriod: signalPeriod,
//     };
//     return Stochastic.calculate(inputCRSI);
//   }

//   calculateRSI(closes: number[], period = 14): number[] {
//     var inputRSI = {
//       values: closes,
//       period: period,
//     };
//     return RSI.calculate(inputRSI);
//   }
// }

// export { ComplexIndicator, StochasticOutput };
