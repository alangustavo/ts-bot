import { BinanceInterval } from "binance-historical/build/types";
import Indicator from "../lib/Indicator";
import Klines from "../lib/Klines";
import TechnicalIndicators from "../lib/TechnicalIndicators";
import { Signal } from "../lib/IStrategy";

export default class ESTUDO_ALL extends Indicator {
    MFI!: number;
    AVGSRSI!: number;
    SRSI_D!: number;
    SRSI_K!: number;
    OBV!: number;
    MACD4_CRESCENTE: boolean = false;
    MACD3_DECRESCENTE: boolean = false;
    DEMA99!: number;
    DEMA10!: number;
    DEMA20!: number;
    TEMA99!: number;
    TEMA10!: number;
    TEMA20!: number;
    EMA10CLOSES!: number;
    EMA20CLOSES!: number;
    EMA20OBBV!: number;
    EMA10OBBV!: number;
    ADOSC!: number;
    EMA20ADOSC!: number;
    EMA10ADOSC!: number;
    WILLR!: number;
    OBVEMA10!: number;
    OBVEMA20!: number;
    AVGTIRSI!: number;


    calculate(k: Klines): Signal {
        const t = new TechnicalIndicators();
        let price = k.getPrice();
        let closes = k.getCloses();
        let highs = k.getHighs();
        let lows = k.getLows();
        let volumes = k.getVolumes();

        let srsi = t.stochrsi(closes, 14, 14, 3, 3);

        this.SRSI_D = srsi.D;
        this.SRSI_K = srsi.K;
        this.AVGSRSI = (this.SRSI_K + this.SRSI_D) / 2;

        this.DEMA99 = t.dema(closes, 99);
        this.DEMA10 = t.dema(closes, 10);
        this.DEMA20 = t.dema(closes, 20);

        this.TEMA99 = t.tema(closes, 99);
        this.TEMA10 = t.tema(closes, 10);
        this.TEMA20 = t.tema(closes, 20);


        this.MFI = t.mfi(highs, lows, closes, volumes, 14);

        this.EMA10CLOSES = t.ema(closes, 10);
        this.EMA20CLOSES = t.ema(closes, 20);

        this.OBV = t.obv(closes, volumes);
        let obv = t.OBV(closes, volumes);
        this.EMA20OBBV = t.ema(obv, 20);
        this.EMA10OBBV = t.ema(obv, 10);


        this.ADOSC = t.adosc(highs, lows, closes, volumes, 3, 10);
        let adosc = t.ADOSC(highs, lows, closes, volumes, 3, 10);
        this.EMA20ADOSC = t.ema(adosc, 20);
        this.EMA10ADOSC = t.ema(adosc, 10);

        let tirsi = t.tisrsi(closes, 14, 14, 3, 3);
        this.AVGTIRSI = (tirsi.D + tirsi.K) / 2;

        this.WILLR = t.willr(highs, lows, closes);

        let macd_1 = t.macd(closes, 12, 26, 9, -1);
        let macd_2 = t.macd(closes, 12, 26, 9, -2);
        let macd_3 = t.macd(closes, 12, 26, 9, -3);
        let macd_4 = t.macd(closes, 12, 26, 9, -4);

        let MACD_H1 = macd_1.MACDHist;
        let MACD_H2 = macd_2.MACDHist;
        let MACD_H3 = macd_3.MACDHist;
        let MACD_H4 = macd_4.MACDHist;

        this.MACD4_CRESCENTE = MACD_H1 > MACD_H2 && MACD_H2 > MACD_H3 && MACD_H3 > MACD_H4;
        this.MACD3_DECRESCENTE = MACD_H1 < MACD_H2 && MACD_H2 < MACD_H3;


        if (this.DEMA10 < this.DEMA20 && this.OBV < this.EMA10OBBV && this.OBV < this.EMA20OBBV && this.EMA10CLOSES > this.EMA20CLOSES) {
            return Signal.BUY;
        } else if (this.DEMA10 > this.DEMA20 && this.EMA10OBBV > this.EMA20OBBV && this.OBV > this.EMA20OBBV) {
            return Signal.SELL;
        } else {
            return Signal.WAIT;
        }

    }
}