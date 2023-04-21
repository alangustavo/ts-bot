import { BinanceInterval } from "binance-historical/build/types";
import Indicator from "../lib/Indicator";
import Klines from "../lib/Klines";
import TechnicalIndicators from "../lib/TechnicalIndicators";
import { Signal } from "../lib/IStrategy";

export default class MACD12169 extends Indicator {
    MACD!: number;
    MACDSignal!: number;
    MACDHist!: number;
    constructor(symbol: string, interval: BinanceInterval) {
        super(symbol, interval);
    }
    calculate(klines: Klines): Signal {
        const t = new TechnicalIndicators();
        const r = t.macd(klines.getCloses(), 12, 26, 9);
        this.MACD = r.MACD;
        this.MACDSignal = r.MACDSignal;
        this.MACDHist = r.MACDHist;

        if (this.MACDHist > 0) {
            return Signal.BUY;
        } else if (this.MACDHist < 0) {
            return Signal.SELL;
        } else {
            return Signal.WAIT;
        }
    }
}