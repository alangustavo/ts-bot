import { Signal, Strategy } from "../src/lib/IStrategy";
import Klines from "../src/lib/Klines";

export default class AllStrategy extends Strategy {
  private avgTIRSI!: number;
  private sma25!: number;
  private sma7!: number;
  sma99!: number;
  willr!: number;
  rsi!: number;
  stochRSID!: number;
  stochRSIK!: number;
  stochD!: number;
  stochK!: number;
  adosc!: number;

  public getHeader(): void {
    this.csvFile.addRow(
      `${this.symbol}_${this.interval} BUY: avgTIRSI < 10 | SELL: avgTIRSI > 85`
    );
    this.csvFile.addRow(
      "DATE;HOUR;PRICE;WILLR;SMA99;SMA25;SMA7;RSI;AVGTISRI;STOCHRSID;STOCHRSIK;STOCHD;STOCHK;ADOSC;ACTION;P/L;RESULT"
    );
  }
  update(klines: Klines): void {
    const openTime = klines.getOpenTimes();
    const close = klines.getCloses();
    let ot = openTime[openTime.length - 1].toISOString();
    ot = ot.replace("T", ";");
    ot = ot.replace(".000Z", ";");
    const price = close[close.length - 1];
    let pl = 0;
    let signal = this.getBuySignal(klines);
    if (!this.inPosition) {
      if (signal == "BUY") {
        this.buyPrice = price;
        this.inPosition = true;
      }
    } else {
      signal = this.getSellSignal(klines);
      pl = price / this.buyPrice;
      if (signal == "SELL") {
        this.inPosition = false;
        let pl = price / this.buyPrice;
        this.result = this.result * pl;
        this.buyPrice = 0;
      }
    }
    // "AVGTISRI;STOCHRSID;STOCHRSIK;STOCHD;STOCHK;ADOSC;ACTION;P/L;RESULT"
    this.csvFile.addRow(
      `${ot}${price};${this.willr};${this.sma99};${this.sma25};${this.sma7};${
        this.rsi
      };${this.avgTIRSI};${this.stochRSID};${this.stochRSIK};${this.stochD};${
        this.stochK
      };${this.adosc};${signal};${pl - 1};${this.result}`
    );
  }

  public calculate(k: Klines): void {
    const WILLR = this.indicator.WILLR(
      k.getHighs(),
      k.getLows(),
      k.getCloses(),
      14
    );
    this.willr = WILLR[WILLR.length - 1];
    const SMA99 = this.indicator.SMA(k.getCloses(), 99);
    this.sma99 = SMA99[SMA99.length - 1];
    const SMA25 = this.indicator.SMA(k.getCloses(), 25);
    this.sma25 = SMA25[SMA25.length - 1];
    const SMA7 = this.indicator.SMA(k.getCloses(), 7);
    this.sma7 = SMA7[SMA7.length - 1];
    const RSI = this.indicator.RSI(k.getCloses(), 11);
    this.rsi = RSI[RSI.length - 1];
    const TIRSI = this.indicator.TISRSI(k.getCloses(), 14, 14, 3, 3);
    let i = TIRSI.K.length - 1;
    this.avgTIRSI = (TIRSI.K[i] + TIRSI.D[i] + TIRSI.stochRSI[i]) / 3;
    const STOCHRSI = this.indicator.STOCHRSI(k.getCloses(), 14, 14, 3, 3);
    this.stochRSID = STOCHRSI.D[STOCHRSI.D.length - 1];
    this.stochRSIK = STOCHRSI.K[STOCHRSI.K.length - 1];
    const STOCH = this.indicator.STOCH(
      k.getHighs(),
      k.getLows(),
      k.getCloses(),
      14,
      3
    );
    this.stochD = STOCH.D[STOCH.D.length - 1];
    this.stochK = STOCH.K[STOCH.K.length - 1];

    const ADOSC = this.indicator.ADOSC(
      k.getHighs(),
      k.getLows(),
      k.getCloses(),
      k.getVolumes(),
      3,
      10
    );
    this.adosc = ADOSC[ADOSC.length - 1];
    const MACD = this.indicator.MACD(k.getCloses(), 12, 26, 9);
  }
  public getBuySignal(klines: Klines): Signal {
    this.calculate(klines);
    if (this.avgTIRSI < 10 && this.sma25 > this.sma7) {
      return Signal.BUY;
    } else {
      return Signal.WAITBUY;
    }
  }
  public getSellSignal(klines: Klines): Signal {
    this.calculate(klines);
    if (this.avgTIRSI > 85 && this.sma25 < this.sma7) {
      return Signal.SELL;
    } else {
      return Signal.WAITSELL;
    }
  }
}
