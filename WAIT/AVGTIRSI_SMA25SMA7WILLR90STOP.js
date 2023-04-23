"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IStrategy_1 = require("../lib/IStrategy");
class AVGTIRSI_SMA25SMA7WILLR90STOP extends IStrategy_1.Strategy {
    getHeader() {
        this.csvFile.addRow(`${this.symbol}_${this.interval} BUY: avgTIRSI <= 10 && sma25 > sma7 && rsi < 32 && WILLR > -90| SELL: avgTIRSI >= 90 && sma25 < sma7 | STOPLOSS -0.05`);
        this.csvFile.addRow("DATE;HOUR;PRICE;WILLR;SMA99;SMA25;SMA7;RSI;AVGTISRI;STOCHRSID;STOCHRSIK;STOCHD;STOCHK;ADOSC;ACTION;P/L;RESULT");
    }
    update(klines) {
        const openTime = klines.getOpenTimes();
        const close = klines.getCloses();
        let ot = openTime[openTime.length - 1].toISOString();
        ot = ot.replace("T", ";");
        ot = ot.replace(".000Z", ";");
        this.price = close[close.length - 1];
        let pl = 0;
        let signal = IStrategy_1.Signal.WAITBUY;
        if (!this.inPosition) {
            signal = this.getBuySignal(klines);
            if (signal == "BUY") {
                this.buyPrice = this.price;
                this.inPosition = true;
            }
        }
        else {
            signal = this.getSellSignal(klines);
            pl = this.price / this.buyPrice;
            if (signal == IStrategy_1.Signal.SELL || signal === IStrategy_1.Signal.STOPLOSS) {
                this.inPosition = false;
                let pl = this.price / this.buyPrice;
                this.result = this.result * pl;
                this.buyPrice = 0;
            }
        }
        // "AVGTISRI;STOCHRSID;STOCHRSIK;STOCHD;STOCHK;ADOSC;ACTION;P/L;RESULT"
        this.csvFile.addRow(`${ot}${this.price};${this.willr};${this.sma99};${this.sma25};${this.sma7};${this.rsi};${this.avgTIRSI};${this.stochRSID};${this.stochRSIK};${this.stochD};${this.stochK};${this.adosc};${signal};${pl - 1};${this.result}`);
    }
    calculate(k) {
        const WILLR = this.indicator.WILLR(k.getHighs(), k.getLows(), k.getCloses(), 14);
        this.willr = WILLR[WILLR.length - 1];
        const SMA99 = this.indicator.SMA(k.getCloses(), 99);
        this.sma99 = SMA99[SMA99.length - 1];
        const SMA25 = this.indicator.SMA(k.getCloses(), 25);
        this.sma25 = SMA25[SMA25.length - 1];
        const SMA7 = this.indicator.SMA(k.getCloses(), 7);
        this.sma7 = SMA7[SMA7.length - 1];
        const RSI = this.indicator.RSI(k.getCloses(), 11);
        this.rsi = RSI[RSI.length - 1];
        const TIRSI = this.indicator.TISRSI(k.getCloses(), 14, 14, 3, 3);
        let i = TIRSI.K.length - 1;
        this.avgTIRSI = (TIRSI.K[i] + TIRSI.D[i] + TIRSI.stochRSI[i]) / 3;
        const STOCHRSI = this.indicator.STOCHRSI(k.getCloses(), 14, 14, 3, 3);
        this.stochRSID = STOCHRSI.D[STOCHRSI.D.length - 1];
        this.stochRSIK = STOCHRSI.K[STOCHRSI.K.length - 1];
        const STOCH = this.indicator.STOCH(k.getHighs(), k.getLows(), k.getCloses(), 14, 3);
        this.stochD = STOCH.D[STOCH.D.length - 1];
        this.stochK = STOCH.K[STOCH.K.length - 1];
        const ADOSC = this.indicator.ADOSC(k.getHighs(), k.getLows(), k.getCloses(), k.getVolumes(), 3, 10);
        this.adosc = ADOSC[ADOSC.length - 1];
    }
    getBuySignal(klines) {
        this.calculate(klines);
        // WILLR <= -99.99 && sma25 > sma7;
        if (this.avgTIRSI <= 10 &&
            this.sma25 > this.sma7 &&
            this.rsi < 32 &&
            this.willr < -90) {
            return IStrategy_1.Signal.BUY;
        }
        else {
            return IStrategy_1.Signal.WAITBUY;
        }
    }
    getSellSignal(klines) {
        // SELL: WILLR >= -9.99 && sma25 < sma7;
        this.calculate(klines);
        if (this.price / this.buyPrice - 1 < -0.05) {
            return IStrategy_1.Signal.STOPLOSS;
        }
        if (this.avgTIRSI >= 85 && this.sma25 < this.sma7) {
            return IStrategy_1.Signal.SELL;
        }
        else {
            return IStrategy_1.Signal.WAITSELL;
        }
    }
}
exports.default = AVGTIRSI_SMA25SMA7WILLR90STOP;
