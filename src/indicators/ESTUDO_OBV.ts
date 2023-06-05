import { BinanceInterval } from "binance-historical/build/types";
import Indicator from "../lib/Indicator";
import Klines from "../lib/Klines";
import TechnicalIndicators from "../lib/TechnicalIndicators";
import { Signal } from "../lib/IStrategy";

export default class ESTUDO_OBV extends Indicator {
    OPEN!: number;
    HIGH!: number;
    LOW!: number;
    CLOSE!: number;
    OBV!: number;
    EMA03OBBV!: number;
    EMA20OBBV!: number;
    EMA10OBBV!: number;
    ADOSC!: number;
    EMA20ADOSC!: number;
    EMA20ADOSC2!: number;
    EMA20ADOSC3!: number;
    RSI10!: number;
    RSI20!: number;




    calculate(k: Klines): Signal {
        const t = new TechnicalIndicators();
        let closes = k.getCloses();
        let opens = k.getOpens();
        let highs = k.getHighs();
        let lows = k.getLows();
        let volumes = k.getVolumes();
        let i = closes.length - 1;

        this.OPEN = opens[i];
        this.HIGH = highs[i];
        this.LOW = lows[i];
        this.CLOSE = closes[i];

        let buy = true;
        let sell = true;

        // this.EMA_MIN3 = t.ema(lows, 3, -1);
        // this.SMA_MAX27 = t.sma(highs, 27, -1);
        // this.EMA_480 = t.ema(closes, 480);
        // this.EMA_240 = t.ema(closes, 240);


        this.OBV = t.obv(closes, volumes);
        let obv = t.OBV(closes, volumes);
        this.EMA03OBBV = t.ema(obv, 3);
        this.EMA20OBBV = t.ema(obv, 20);
        this.EMA10OBBV = t.ema(obv, 10);

        buy = buy && this.OBV < this.EMA03OBBV;
        buy = buy && this.OBV < this.EMA20OBBV;
        buy = buy && this.OBV < this.EMA20OBBV;
        buy = buy && this.EMA20OBBV > this.EMA10OBBV;

        sell = sell && this.OBV > this.EMA03OBBV;
        sell = sell && this.OBV > this.EMA20OBBV;
        sell = sell && this.OBV > this.EMA20OBBV;
        sell = sell && this.EMA20OBBV < this.EMA10OBBV;

        // this.EMA07OBBV = t.ema(obv, 7);
        // this.EMA21OBBV = t.ema(obv, 21);
        // this.EMA42OBBV = t.ema(obv, 42);


        this.ADOSC = t.adosc(highs, lows, closes, volumes, 3, 10);
        let adosc = t.ADOSC(highs, lows, closes, volumes, 3, 10);
        this.EMA20ADOSC = t.ema(adosc, 20);
        this.EMA20ADOSC2 = t.ema(adosc, 20, -2);
        this.EMA20ADOSC3 = t.ema(adosc, 20, -3);
        buy = buy && this.EMA20ADOSC > this.EMA20ADOSC2;
        buy = buy && this.EMA20ADOSC2 < this.EMA20ADOSC3;

        sell = sell && this.EMA20ADOSC > 0;
        sell = sell && this.EMA20ADOSC2 < 0;

        // this.EMA10ADOSC = t.ema(adosc, 10);
        // this.EMA03ADOSC = t.ema(adosc, 3);
        // this.EMA07ADOSC = t.ema(adosc, 7);
        // this.EMA21ADOSC = t.ema(adosc, 21);
        // this.EMA42ADOSC = t.ema(adosc, 42);
        // this.EMA120ADOSC = t.ema(adosc, 120);
        // this.EMA240ADOSC = t.ema(adosc, 240);

        // let srsi = t.stochrsi(closes, 14, 14, 3, 3);

        // this.SRSI_D = srsi.D;
        // this.SRSI_K = srsi.K;
        // this.AVGSRSI = (this.SRSI_K + this.SRSI_D) / 2;

        this.RSI10 = t.rsi(closes, 10);
        this.RSI20 = t.rsi(closes, 20);
        buy = buy && this.RSI10 > this.RSI20;
        sell = sell && this.RSI10 < this.RSI20;
        // this.RSI240 = t.rsi(closes, 240);
        // this.RSI10 = t.rsi(closes, 80);
        // this.RSI10 = t.rsi(closes, 60);
        // this.RSI10 = t.rsi(closes, 30);
        // this.RSI40 = t.rsi(closes, 40);
        // this.RSI10 = t.rsi(closes, 50);

        // this.MFI = t.mfi(highs, lows, closes, volumes);

        // let stoch = t.stoch(highs, lows, closes);
        // this.STOCH_K = stoch.K;
        // this.STOCH_D = stoch.D;

        // this.WILLR = t.willr(highs, lows, closes);


        // this.OBV_OBV03 = this.OBV > this.EMA03OBBV;
        // this.OBV_OBV07 = this.OBV > this.EMA07OBBV;
        // this.OBV_OBV21 = this.OBV > this.EMA21OBBV;
        // this.OBV_OBV42 = this.OBV > this.EMA42OBBV;

        // this.OBV03_OBV07 = this.EMA03OBBV > this.EMA07OBBV;
        // this.OBV03_OBV10 = this.EMA03OBBV > this.EMA10OBBV;
        // this.OBV03_OBV20 = this.EMA03OBBV > this.EMA20OBBV;
        // this.OBV03_OBV21 = this.EMA03OBBV > this.EMA21OBBV;
        // this.OBV03_OBV42 = this.EMA03OBBV > this.EMA42OBBV;


        // this.OBV07_OBV10 = this.EMA07OBBV > this.EMA10OBBV;
        // this.OBV07_OBV20 = this.EMA07OBBV > this.EMA20OBBV;
        // this.OBV07_OBV21 = this.EMA07OBBV > this.EMA21OBBV;
        // this.OBV07_OBV42 = this.EMA07OBBV > this.EMA42OBBV;

        // this.OBV21_OBV10 = this.EMA21OBBV > this.EMA10OBBV;
        // this.OBV21_OBV20 = this.EMA21OBBV > this.EMA20OBBV;
        // this.OBV21_OBV42 = this.EMA21OBBV > this.EMA42OBBV;

        // this.OBV42_OBV10 = this.EMA42OBBV > this.EMA10OBBV;
        // this.OBV42_OBV20 = this.EMA42OBBV > this.EMA20OBBV;
        // this.OBV42_OBV21 = this.EMA42OBBV > this.EMA20OBBV;


        // this.OBV_OBV20 = this.OBV > this.EMA20OBBV;
        // this.OBV_OBV10 = this.OBV > this.EMA10OBBV;
        // this.OBV20_OBV10 = this.EMA20OBBV > this.EMA10OBBV;
        // this.MIN3_MAX27 = this.EMA_MIN3 > this.SMA_MAX27;
        // this.MIN3_MAX27_0975 = (this.EMA_MIN3 / this.SMA_MAX27) < 0.975;
        // this.MIN3_MAX27_1002 = (this.EMA_MIN3 / this.SMA_MAX27) > 1.002;


        // // Fez 50% entre janeiro e maio
        // let buy = !this.OBV_OBV20 && !this.OBV_OBV10 && this.OBV20_OBV10 && !this.MIN3_MAX27 && this.MIN3_MAX27_0975 && this.EMA_480 < closes[i];
        // let sell = this.OBV_OBV20 && this.OBV_OBV10 && !this.OBV20_OBV10 && this.MIN3_MAX27 && this.MIN3_MAX27_1002;

        // Fez 48% entre janeiro e maio e prejuizo de 52% em jan22 a maio
        // let buy = !this.OBV_OBV20 && !this.OBV_OBV10 && this.OBV20_OBV10 && !this.MIN3_MAX27 && this.MIN3_MAX27_0975;
        // let sell = this.OBV_OBV20 && this.OBV_OBV10 && !this.OBV20_OBV10 && this.MIN3_MAX27 && this.MIN3_MAX27_1002;


        // Fez 7% de Janeiro a Maio 
        // let buy = !this.OBV_OBV20 && !this.OBV_OBV10 && this.OBV20_OBV10 && !this.MIN3_MAX27 && this.EMA_480 < closes[i];
        // let sell = this.OBV_OBV20 && this.OBV_OBV10 && !this.OBV20_OBV10 && this.MIN3_MAX27 && this.MIN3_MAX27_1002;
        // Fez 50% entre janeiro e maio



        if (buy) {
            return Signal.BUY;
        } else if (sell) {
            return Signal.SELL;
        } else {
            return Signal.WAIT;
        }

    }
}