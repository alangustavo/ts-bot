"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IStrategy_1 = require("../lib/IStrategy");
class AvgTIRSIM25M7W11 extends IStrategy_1.Strategy {
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
        this.tisrsi = this.indicator.TISRSI(k.getCloses(), 14, 14, 3, 3);
        this.sma25 = this.indicator.SMA(k.getCloses(), 25);
        this.sma7 = this.indicator.SMA(k.getCloses(), 7);
        this.w11 = this.indicator.WILLR(k.getHighs(), k.getLows(), k.getCloses(), 11);
        let i = this.tisrsi.K.length - 1;
        this.avgTIRSI =
            (this.tisrsi.K[i] + this.tisrsi.D[i] + this.tisrsi.stochRSI[i]) / 3;
    }
    getBuySignal(klines) {
        this.calculate(klines);
        if (this.avgTIRSI < 10 &&
            this.sma25[this.sma25.length - 1] > this.sma7[this.sma7.length - 1] &&
            this.w11[this.w11.length - 1] < -90) {
            return IStrategy_1.Signal.BUY;
        }
        else {
            return IStrategy_1.Signal.WAIT;
        }
    }
    getSellSignal(klines) {
        this.calculate(klines);
        if (this.avgTIRSI > 85 && this.w11[this.w11.length - 1] > -10) {
            return IStrategy_1.Signal.SELL;
        }
        else {
            return IStrategy_1.Signal.WAIT;
        }
    }
}
exports.default = AvgTIRSIM25M7W11;
