import { BinanceInterval } from "binance-historical/build/types";
import Indicator from "../lib/Indicator";
import Klines from "../lib/Klines";
import TechnicalIndicators from "../lib/TechnicalIndicators";
import { Signal } from "../lib/IStrategy";

export default class ESTUDO_IA extends Indicator {
    CLOSES!: number;
    HIGHS!: number;
    LOWS!: number;
    VOLUMES!: number;
    MFI!: number;
    OBV!: number;
    ADOSC!: number;
    WILLR!: number;
    MIN9!: number;
    MAX9!: number;
    MIN11!: number;
    MAX11!: number;

    calculate(k: Klines): Signal {
        const t = new TechnicalIndicators();
        let price = k.getPrice();
        let closes = k.getCloses();
        let opens = k.getOpens();
        let highs = k.getHighs();
        let lows = k.getLows();
        let volumes = k.getVolumes();
        let i = closes.length - 1;

        this.CLOSES = closes[i];
        this.HIGHS = highs[i];
        this.LOWS = lows[i];
        this.VOLUMES = volumes[i];

        this.MFI = t.mfi(highs, lows, closes, volumes, 14);
        this.OBV = t.obv(closes, volumes);

        this.ADOSC = t.adosc(highs, lows, closes, volumes, 3, 10);
        this.WILLR = t.willr(highs, lows, closes);

        this.MIN9 = t.sma(lows, 9);
        this.MIN11 = t.sma(lows, 11);
        this.MAX9 = t.sma(lows, 9);
        this.MAX11 = t.sma(lows, 11);

        let greenCandle = opens[i] < closes[i];
        let redCandle = opens[i - 1] > closes[i - 1];
        let sizeRed = opens[i - 1] - closes[i - 1];
        let sizeGreen = closes[i] - opens[i];



        let engolfAlta = greenCandle && redCandle && sizeGreen > sizeRed;
        let engolfBaixa = !greenCandle && !redCandle && sizeGreen < sizeRed;

        if (this.MIN9 < opens[i] && this.MIN9 < closes[i]) {
            return Signal.BUY;
        } else if (engolfBaixa) {
            return Signal.SELL;
        } else {
            return Signal.WAIT;
        }

    }
}