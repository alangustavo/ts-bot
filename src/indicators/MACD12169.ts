import { BinanceInterval } from "binance-historical/build/types";
import Indicator from "../lib/Indicator";
import Klines from "../lib/Klines";
import TechnicalIndicators from "../lib/TechnicalIndicators";

export default class MACD12169 extends Indicator {
    MACD!: number;
    MACDSignal!: number;
    MACDHist!: number;
    constructor(symbol: string, interval: BinanceInterval) {
        super(symbol, interval);
    }

    calculate(klines: Klines){
        const t = new TechnicalIndicators();
        const r = t.macd(klines.getCloses(), 12, 26, 9);
        this.MACD = r.MACD;
        this.MACDSignal = r.MACDSignal;
        this.MACDHist = r.MACDHist;
    }

    
}