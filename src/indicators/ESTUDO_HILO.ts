import { BinanceInterval } from "binance-historical/build/types";
import Indicator from "../lib/Indicator";
import Klines from "../lib/Klines";
import TechnicalIndicators from "../lib/TechnicalIndicators";
import { Signal } from "../lib/IStrategy";

export default class ESTUDO_HILO extends Indicator {
    EMA_MIN3!: number;
    SMA_MIN27!: number;
    SMA_MAX27!: number;
    OBV!: number;
    EMA20OBBV!: number;
    EMA10OBBV!: number;
    OBV_OBV20: boolean = false;
    OBV_OBV10: boolean = false;
    OBV20_OBV10: boolean = false;
    MIN3_MAX27: boolean = false;
    MIN3_MAX27_0975: boolean = false;
    MIN3_MAX27_1002: boolean = false;
    EMA_480!: number;
    TEMA499!: number;
    ADOSC!: number;
    EMA20ADOSC!: number;
    EMA10ADOSC!: number;
    AVGTIRSI!: number;
    WILLR!: number;
    SRSI_D!: number;
    SRSI_K!: number;
    AVGSRSI!: number;
    EMA_240!: number;
    RSI10!: number;
    RSI20!: number;
    RSI240!: number;
    MFI!: number;
    STOCH_K!: number;
    STOCH_D!: number;
    // HT_TRENDLINE!: number;
    HT_SINE!: number;
    // HT_TRENDMODE!: number;
    // HT_PHASOR!: number;
    // HT_DCPHASE!: number;
    // HT_DCPERIOD!: number;


    calculate(k: Klines): Signal {
        const t = new TechnicalIndicators();
        let closes = k.getCloses();
        let highs = k.getHighs();
        let lows = k.getLows();
        let volumes = k.getVolumes();
        let i = closes.length - 1;

        this.EMA_MIN3 = t.ema(lows, 3, -1);
        this.SMA_MAX27 = t.sma(highs, 27, -1);
        this.EMA_480 = t.ema(closes, 480);
        this.EMA_240 = t.ema(closes, 240);


        this.OBV = t.obv(closes, volumes);
        let obv = t.OBV(closes, volumes);
        this.EMA20OBBV = t.ema(obv, 20);
        this.EMA10OBBV = t.ema(obv, 10);

        this.ADOSC = t.adosc(highs, lows, closes, volumes, 3, 10);
        let adosc = t.ADOSC(highs, lows, closes, volumes, 3, 10);
        this.EMA20ADOSC = t.ema(adosc, 20);
        this.EMA10ADOSC = t.ema(adosc, 10);

        let srsi = t.stochrsi(closes, 14, 14, 3, 3);

        this.SRSI_D = srsi.D;
        this.SRSI_K = srsi.K;
        this.AVGSRSI = (this.SRSI_K + this.SRSI_D) / 2;

        this.RSI10 = t.rsi(closes, 10);
        this.RSI20 = t.rsi(closes, 20);
        this.RSI240 = t.rsi(closes, 240);

        this.MFI = t.mfi(highs, lows, closes, volumes);

        let stoch = t.stoch(highs, lows, closes);
        this.STOCH_K = stoch.K;
        this.STOCH_D = stoch.D;

        this.WILLR = t.willr(highs, lows, closes);

        this.OBV_OBV20 = this.OBV > this.EMA20OBBV;
        this.OBV_OBV10 = this.OBV > this.EMA10OBBV;
        this.OBV20_OBV10 = this.EMA20OBBV > this.EMA10OBBV;
        this.MIN3_MAX27 = this.EMA_MIN3 > this.SMA_MAX27;
        this.MIN3_MAX27_0975 = (this.EMA_MIN3 / this.SMA_MAX27) < 0.975;
        this.MIN3_MAX27_1002 = (this.EMA_MIN3 / this.SMA_MAX27) > 1.002;

        // this.HT_TRENDLINE = t.ht_trendline(closes);
        this.HT_SINE = t.ht_sine(closes, 499);


        // this.HT_TRENDMODE = t.ht_trendmode(closes);
        // this.HT_PHASOR = t.ht_phasor(closes);
        // this.HT_DCPHASE = t.ht_dcphase(closes);
        // this.HT_DCPERIOD = t.ht_dcperiod(closes);

        let buy = !this.OBV_OBV20 && !this.OBV_OBV10 && this.OBV20_OBV10 && !this.MIN3_MAX27 && this.MIN3_MAX27_0975 && this.EMA_480 < closes[i];
        let sell = this.OBV_OBV20 && this.OBV_OBV10 && !this.OBV20_OBV10 && this.MIN3_MAX27 && this.MIN3_MAX27_1002;
        // let buy = !this.N && !this.O && this.P && !this.Q && this.R1;
        // let sell = this.N && this.O && !this.P && this.Q && this.R2;


        // let buy = this.SMA_MAX27 / this.EMA_MIN3 > 1.035 && this.OBV < this.EMA10OBBV && this.OBV < this.EMA20OBBV;
        // let buy = this.SMA_MAX27 / this.EMA_MIN3 > 1.035 && this.OBV < this.EMA10OBBV && this.OBV < this.EMA20OBBV;


        if (buy) {
            return Signal.BUY;
        } else if (sell) {
            return Signal.SELL;
        } else {
            return Signal.WAIT;
        }

    }
}