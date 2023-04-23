import { BinanceInterval } from "binance-historical/build/types";
import Indicator from "../lib/Indicator";
import Klines from "../lib/Klines";
import TechnicalIndicators from "../lib/TechnicalIndicators";
import { Signal } from "../lib/IStrategy";

export default class MFIRSI extends Indicator {
    MFI!: number;
    SRSI!: { K: number, D: number; };
    AVGSRSI!: number;

    constructor(symbol: string, interval: BinanceInterval) {
        super(symbol, interval);
    }
    calculate(k: Klines): Signal {
        const t = new TechnicalIndicators();
        const price = k.getPrice();

        this.SRSI = t.stochrsi(k.getHighs(), k.getLows(), k.getCloses(), k.getVolumes(), 6, 21, -1);
        this.MFI = t.mfi(k.getHighs(), k.getLows(), k.getCloses(), 14);
        this.AVGSRSI = (this.SRSI.K + this.SRSI.D) / 2;
        if (this.MFI < 20 && this.AVGSRSI < 10) {
            return Signal.BUY;
        } else if (this.MFI > 80 && this.AVGSRSI > 90) {
            return Signal.SELL;
        } else {
            return Signal.WAIT;
        }
    }
}