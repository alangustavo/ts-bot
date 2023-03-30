import { StochasticRSI } from "technicalindicators";
import { SMA } from "technicalindicators";
import { ComplexIndicator } from "../lib/ComplexIndicator";
import Klines from "../lib/Klines";
import { StochasticRSIOutput } from "technicalindicators/declarations/momentum/StochasticRSI";

export default class RSIIndicator extends ComplexIndicator {
  public mediaSRSI!: number;
  public srsi!: StochasticRSIOutput;
  public sma99!: number;
  public sma25!: number;
  constructor() {
    super();
  }

  public calculate(klines: Klines): void {
    this.srsi = this.getSRSI(klines.getCloses(), 14, 14, 3, 3)[-1];
    this.sma99 = this.getSMA(klines.getCloses(), 99)[-1];
    this.sma25 = this.getSMA(klines.getCloses(), 25)[-1];
    this.mediaSRSI = this.getMediaSRSI(klines);
  }

  private getMediaSRSI(k: Klines): number {
    const i = this.srsi;
    return (i.d + i.k + i.stochRSI) / 3;
  }

  private getSMA(closes: number[], period = 14) {
    var inputSMA = {
      values: closes,
      period: period,
    };
    return SMA.calculate(inputSMA);
  }
  private getSRSI(
    closes: number[],
    rsiPeriod = 14,
    stochasticPeriod = 14,
    kPeriod = 3,
    dPeriod = 3
  ): StochasticRSIOutput[] {
    var inputSRSI = {
      values: closes,
      rsiPeriod: rsiPeriod,
      stochasticPeriod: stochasticPeriod,
      kPeriod: kPeriod,
      dPeriod: dPeriod,
    };

    return StochasticRSI.calculate(inputSRSI);
  }
}
