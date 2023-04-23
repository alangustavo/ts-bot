"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IStrategy_1 = require("../lib/IStrategy");
class RSITISRSIStrategy extends IStrategy_1.Strategy {
    getDescription() {
        throw new Error("Method not implemented.");
    }
    update(klines) {
        let signal = IStrategy_1.Signal.WAIT;
        const closeTime = klines.getOpenTimes();
        const close = klines.getCloses();
        let ct = closeTime[closeTime.length - 1].toISOString();
        ct = ct.replace("T", ";");
        ct = ct.replace(".000Z", "");
        const c = close[close.length - 1];
        if (!this.inPosition) {
            signal = this.getBuySignal(klines);
            if (signal == 0) {
                console.log(`${ct};${c};BUY;1;${this.result}`);
                this.buyPrice = c;
                this.inPosition = true;
            }
            else {
                console.log(`${ct};${c};WAITING BUY;0;${this.result}`);
            }
        }
        else {
            signal = this.getSellSignal(klines);
            let pl = c / this.buyPrice;
            if (signal == 1) {
                this.inPosition = false;
                let pl = c / this.buyPrice;
                this.result = this.result * pl;
                this.buyPrice = 0;
                console.log(`${ct};${c};SELL;${pl - 1};${this.result}`);
            }
            else {
                console.log(`${ct};${c};WAITING SELL;${pl - 1};${this.result}`);
            }
        }
    }
    calculate(k) {
        // this.srsi = this.indicator.STOCHRSI(k.getCloses(), 14, 14, 3, 3);
        this.rsi = this.indicator.RSI(k.getCloses(), 25);
        this.tisrsi = this.indicator.TISRSI(k.getCloses(), 14, 14, 3, 3);
        let i = this.tisrsi.K.length - 1;
        this.avgTIRSI =
            (this.tisrsi.K[i] + this.tisrsi.D[i] + this.tisrsi.stochRSI[i]) / 3;
        this.sma99 = this.indicator.SMA(k.getCloses(), 99);
        this.sma71 = this.indicator.SMA(k.getCloses(), 71);
        this.sma25 = this.indicator.SMA(k.getCloses(), 25);
    }
    getBuySignal(klines) {
        this.calculate(klines);
        let i = this.rsi.length - 1;
        let rsi = this.rsi[i];
        if (this.avgTIRSI < 10 && rsi < 45) {
            return IStrategy_1.Signal.BUY;
        }
        else {
            return IStrategy_1.Signal.WAIT;
        }
    }
    getSellSignal(klines) {
        this.calculate(klines);
        let i = this.tisrsi.K.length - 1;
        i = this.rsi.length - 1;
        let rsi = this.rsi[i];
        if (this.avgTIRSI > 85 && rsi > 60) {
            return IStrategy_1.Signal.SELL;
        }
        else {
            return IStrategy_1.Signal.WAIT;
        }
    }
}
exports.default = RSITISRSIStrategy;
