"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IStrategy_1 = require("../lib/IStrategy");
class AvgTIRSIM25M7 extends IStrategy_1.Strategy {
    getHeader() {
        this.csvFile.addRow(`${this.symbol}_${this.interval} BUY: avgTIRSI < 10 && sma25 > sma7 | SELL: avgTIRSI > 85 && sm25 < sma7`);
        this.csvFile.addRow("DATE;HOUR;PRICE;avgTIRSI;sma25;sma7;ACTION;P/L;RESULT");
    }
    update(klines) {
        const openTime = klines.getOpenTimes();
        const close = klines.getCloses();
        let ot = openTime[openTime.length - 1].toISOString();
        ot = ot.replace("T", ";");
        ot = ot.replace(".000Z", ";");
        const price = close[close.length - 1];
        let pl = 0;
        let signal = this.getBuySignal(klines);
        if (!this.inPosition) {
            if (signal == "BUY") {
                this.buyPrice = price;
                this.inPosition = true;
            }
        }
        else {
            pl = price / this.buyPrice;
            if (signal == "SELL") {
                this.inPosition = false;
                let pl = price / this.buyPrice;
                this.result = this.result * pl;
                this.buyPrice = 0;
            }
        }
        this.csvFile.addRow(`${ot}${price};${this.avgTIRSI};${this.sma25};${this.sma7};${signal};${pl - 1};${this.result}`);
    }
    calculate(k) {
        let tisrsi = this.indicator.TISRSI(k.getCloses(), 14, 14, 3, 3);
        let i = tisrsi.K.length - 1;
        this.avgTIRSI = (tisrsi.K[i] + tisrsi.D[i] + tisrsi.stochRSI[i]) / 3;
        let sma25 = this.indicator.SMA(k.getCloses(), 25);
        let sma7 = this.indicator.SMA(k.getCloses(), 7);
        this.sma25 = sma25[sma25.length - 1];
        this.sma7 = sma7[sma7.length - 1];
    }
    getBuySignal(klines) {
        this.calculate(klines);
        if (this.avgTIRSI < 10 && this.sma25 > this.sma7) {
            return IStrategy_1.Signal.BUY;
        }
        else {
            return IStrategy_1.Signal.WAITBUY;
        }
    }
    getSellSignal(klines) {
        this.calculate(klines);
        if (this.avgTIRSI > 85 && this.sma25 < this.sma7) {
            return IStrategy_1.Signal.SELL;
        }
        else {
            return IStrategy_1.Signal.WAITSELL;
        }
    }
}
exports.default = AvgTIRSIM25M7;
