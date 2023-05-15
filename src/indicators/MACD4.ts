import { BinanceInterval } from "binance-historical/build/types";
import Indicator from "../lib/Indicator";
import Klines from "../lib/Klines";
import TechnicalIndicators from "../lib/TechnicalIndicators";
import { Signal } from "../lib/IStrategy";

export default class ALL extends Indicator {
    MFI!: number;
    AVGSRSI!: number;
    SRSI_D!: number;
    SRSI_K!: number;


    calculate(k: Klines): Signal {
        const t = new TechnicalIndicators();
        let price = k.getPrice();
        let srsi = t.stochrsi(k.getCloses(), 14, 14, 3, 3);

        this.SRSI_D = srsi.D;
        this.SRSI_K = srsi.K;
        this.AVGSRSI = (this.SRSI_K + this.SRSI_D) / 2;



        this.MFI = t.mfi(k.getHighs(), k.getLows(), k.getCloses(), k.getVolumes(), 14);


        let obv = t.obv(k.getCloses(), k.getVolumes(), 14);



        let macd_1 = t.macd(k.getCloses(), 12, 26, 9, -1);
        let macd_2 = t.macd(k.getCloses(), 12, 26, 9, -2);
        let macd_3 = t.macd(k.getCloses(), 12, 26, 9, -3);
        let macd_4 = t.macd(k.getCloses(), 12, 26, 9, -4);

        let MACD_H1 = macd_1.MACDHist;
        let MACD_H2 = macd_2.MACDHist;
        let MACD_H3 = macd_3.MACDHist;
        let MACD_H4 = macd_4.MACDHist;

        this.MACD4_CRESCENTE = MACD_H1 > MACD_H2 && MACD_H2 > MACD_H3 && MACD_H3 > MACD_H4;
        this.MACD3_DECRESCENTE = MACD_H1 < MACD_H2 && MACD_H2 < MACD_H3;







        if (buySignal) {
            return Signal.BUY;
        } else if (sellSignal) {
            return Signal.SELL;
        } else {
            return Signal.WAIT;
        }

    }
}