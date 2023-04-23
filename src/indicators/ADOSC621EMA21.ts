import { BinanceInterval } from "binance-historical/build/types";
import Indicator from "../lib/Indicator";
import Klines from "../lib/Klines";
import TechnicalIndicators from "../lib/TechnicalIndicators";
import { Signal } from "../lib/IStrategy";

export default class ADOSC621EMA21 extends Indicator {
    ADOSC!: number;
    PREV_ADOSC!: number;
    EMA21!: number;
    PREV_EMA21!: number;

    constructor(symbol: string, interval: BinanceInterval) {
        super(symbol, interval);
    }
    calculate(k: Klines): Signal {
        const t = new TechnicalIndicators();
        const price = k.getPrice();
        this.EMA21 = t.ema(k.getCloses(), 21, -1);
        this.PREV_EMA21 = t.ema(k.getCloses(), 21, -2);
        this.ADOSC = t.adosc(k.getHighs(), k.getLows(), k.getCloses(), k.getVolumes(), 6, 21, -1);
        this.PREV_ADOSC = t.adosc(k.getHighs(), k.getLows(), k.getCloses(), k.getVolumes(), 6, 21, -1);

        if (this.ADOSC > 0 && this.PREV_ADOSC <= 0 && this.EMA21 < price) {
            return Signal.BUY;
        } else if (this.ADOSC < 0 && this.PREV_ADOSC >= 0 && this.EMA21 >= price) {
            return Signal.SELL;

        } else {
            return Signal.WAIT;
        }
    }
}

/**
 * $ema = trader_ema($opens, 21);
 * $adosc = trader_adosc($highs, $lows, $opens, $volumes, 6, 21);
 * $ind_adosc_actual = array_pop($adosc);
 * $ind_adosc_previus = array_pop($adosc);
 * $ind_ema = array_pop($ema);
 * $price = $close;
 * if ($ind_adosc_actual > 0 and $ind_adosc_previus <= 0 and $ind_ema < $price) {
 *     $preco_compra = $price * 0.998;
 * } else {
 *     $preco_compra = 0;
 * }
 */