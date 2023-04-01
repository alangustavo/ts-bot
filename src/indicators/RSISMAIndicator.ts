import { ComplexIndicator, StochasticOutput } from "../lib/ComplexIndicator";
import { StochasticRSIOutput } from "technicalindicators/declarations/momentum/StochasticRSI";

export default class RSISMAIndicator extends ComplexIndicator {
  private mediaSRSI!: number;
  private srsi!: StochasticRSIOutput[];
  private sma99!: number[];
  private sma25!: number[];
  private sma71!: number[];
  private rsi!: number[];
  private crsi!: StochasticOutput[];

  public calculate(): void {
    console.log("Calculando...");
    const k = this.klines;
    this.srsi = this.calculateSRSI(k.getCloses(), 14, 14, 3, 3);
    this.rsi = this.calculateRSI(k.getCloses(), 14);
    this.crsi = this.calculateCRSI(
      k.getHighs(),
      k.getLows(),
      k.getCloses(),
      3,
      2
    );
    this.sma99 = this.calculateSMA(k.getCloses(), 99);
    this.sma71 = this.calculateSMA(k.getCloses(), 71);
    this.sma25 = this.calculateSMA(k.getCloses(), 25);
    console.log("Calculos Finalizados");
  }

  public getSMA25(index: number = -1): number {
    if (index < 0) {
      return this.sma25[index + this.sma25.length];
    }
    return this.sma25[index];
  }
  public getSMA71(index: number = -1): number {
    if (index < 0) {
      return this.sma71[index + this.sma71.length];
    }
    return this.sma71[index];
  }

  public getSMA99(index: number = -1): number {
    if (index < 0) {
      return this.sma99[index + this.sma99.length];
    }
    return this.sma99[index];
  }

  public getCRSI(index: number = -1): StochasticOutput {
    if (index < 0) {
      return this.crsi[index + this.crsi.length];
    }
    return this.crsi[index];
  }

  public getRSI(index: number = -1): number {
    if (index < 0) {
      return this.rsi[index + this.rsi.length];
    }
    return this.rsi[index];
  }

  public getMediaSRSI(index: number = -1): number {
    const i = this.getSRSI(index);
    return (i.d + i.k + i.stochRSI) / 3;
  }

  public getSRSI(index: number = -1): StochasticRSIOutput {
    if (index < 0) {
      return this.srsi[index + this.srsi.length];
    }
    return this.srsi[index];
  }
}
