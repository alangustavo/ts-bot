import { Signal, Strategy } from "../lib/IStrategy";
import Klines from "../lib/Klines";

export default class AvgTIRSIM25M7W11 extends Strategy {
  w11!: number[];
  update(klines: Klines): void {
    let signal = Signal.WAIT;
    const closeTime = klines.getOpenTimes();
    const close = klines.getCloses();
    let ct = closeTime[closeTime.length - 1].toISOString();
    ct = ct.replace("T", ";");
    ct = ct.replace(".000Z", "");
    const c = close[close.length - 1];

    if (!this.inPosition) {
      signal = this.getBuySignal(klines);
      if (signal == 0) {
        console.log(`${ct};${c};BUY;1;${this.result}`);
        this.buyPrice = c;
        this.inPosition = true;
      } else {
        console.log(`${ct};${c};WAITING BUY;0;${this.result}`);
      }
    } else {
      signal = this.getSellSignal(klines);
      let pl = c / this.buyPrice;
      if (signal == 1) {
        this.inPosition = false;
        let pl = c / this.buyPrice;
        this.result = this.result * pl;
        this.buyPrice = 0;
        console.log(`${ct};${c};SELL;${pl - 1};${this.result}`);
      } else {
        console.log(`${ct};${c};WAITING SELL;${pl - 1};${this.result}`);
      }
    }
  }
  private avgTIRSI!: number;
  // private srsi!: { K: number[]; D: number[] };
  private tisrsi!: { K: number[]; D: number[]; stochRSI: number[] };
  private sma25!: number[];
  private sma7!: number[];
  // private sma71!: number[];
  private rsi!: number[];
  public calculate(k: Klines): void {
    this.tisrsi = this.indicator.TISRSI(k.getCloses(), 14, 14, 3, 3);
    this.sma25 = this.indicator.SMA(k.getCloses(), 25);
    this.sma7 = this.indicator.SMA(k.getCloses(), 7);
    this.w11 = this.indicator.WILLR(
      k.getHighs(),
      k.getLows(),
      k.getCloses(),
      11
    );

    let i = this.tisrsi.K.length - 1;
    this.avgTIRSI =
      (this.tisrsi.K[i] + this.tisrsi.D[i] + this.tisrsi.stochRSI[i]) / 3;
  }
  public getBuySignal(klines: Klines): Signal {
    this.calculate(klines);
    if (
      this.avgTIRSI < 10 &&
      this.sma25[this.sma25.length - 1] > this.sma7[this.sma7.length - 1] &&
      this.w11[this.w11.length - 1] < -90
    ) {
      return Signal.BUY;
    } else {
      return Signal.WAIT;
    }
  }
  public getSellSignal(klines: Klines): Signal {
    this.calculate(klines);

    if (this.avgTIRSI > 85 && this.w11[this.w11.length - 1] > -10) {
      return Signal.SELL;
    } else {
      return Signal.WAIT;
    }
  }
}
