import { BinanceInterval } from "binance-historical/build/types";
import Indicator from "../lib/Indicator";
import Klines from "../lib/Klines";
import TechnicalIndicators from "../lib/TechnicalIndicators";
import { Signal } from "../lib/IStrategy";

export default class MFIRSI extends Indicator {
    MFI!: number;
    AVGSRSI!: number;
    SRSI_D!: number;
    SRSI_K!: number;
    TEMA56!: number;

    calculate(k: Klines): Signal {
        const t = new TechnicalIndicators();
        let price = k.getPrice();
        let srsi = t.stochrsi(k.getCloses(), 14, 14, 3, 3);
        this.SRSI_D = srsi.D;
        this.SRSI_K = srsi.K;
        this.MFI = t.mfi(k.getHighs(), k.getLows(), k.getCloses(), k.getVolumes(), 14);
        this.TEMA56 = t.tema(k.getCloses(), 56);
        this.AVGSRSI = (this.SRSI_K + this.SRSI_D) / 2;
        if (this.MFI < 20 && this.AVGSRSI < 10 && price > this.TEMA56) {
            return Signal.BUY;
        } else if (this.MFI > 80 && this.AVGSRSI > 90) {
            return Signal.SELL;
        } else {
            return Signal.WAIT;
        }

    }
}