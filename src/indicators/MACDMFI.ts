import { BinanceInterval } from "binance-historical/build/types";
import Indicator from "../lib/Indicator";
import Klines from "../lib/Klines";
import TechnicalIndicators from "../lib/TechnicalIndicators";
import { Signal } from "../lib/IStrategy";

export default class MACDMFI extends Indicator {
    MFI!: number;
    AVGSRSI!: number;
    SRSI_D!: number;
    SRSI_K!: number;
    MACD_H1!: number;
    MACD_H2!: number;
    MACD_H3!: number;


    calculate(k: Klines): Signal {
        const t = new TechnicalIndicators();
        let price = k.getPrice();
        let srsi = t.stochrsi(k.getCloses(), 14, 14, 3, 3);
        let macd_1 = t.macd(k.getCloses(), 12, 26, 9, -1);
        let macd_2 = t.macd(k.getCloses(), 12, 26, 9, -2);
        let macd_3 = t.macd(k.getCloses(), 12, 26, 9, -3);
        this.MACD_H1 = macd_1.MACDHist;
        this.MACD_H2 = macd_2.MACDHist;
        this.MACD_H3 = macd_3.MACDHist;

        let buySignal = this.MACD_H1 > this.MACD_H2 && this.MACD_H2 > this.MACD_H3;
        let sellSignal = this.MACD_H1 < this.MACD_H2 && this.MACD_H2 < this.MACD_H3;

        this.SRSI_D = srsi.D;
        this.SRSI_K = srsi.K;
        this.MFI = t.mfi(k.getHighs(), k.getLows(), k.getCloses(), k.getVolumes(), 14);

        this.AVGSRSI = (this.SRSI_K + this.SRSI_D) / 2;

        if (this.AVGSRSI < 10 && this.MFI < 20 && buySignal) {
            return Signal.BUY;
        } else if (this.MFI > 80 && sellSignal) {
            return Signal.SELL;
        } else {
            return Signal.WAIT;
        }

    }
}