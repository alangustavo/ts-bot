import { BinanceInterval } from "binance-historical/build/types";
import sqlite from "better-sqlite3";
import Observer from "./IObserver";
import Klines from "./Klines";

const db = sqlite("./data/indicators.db");
enum Signal {
    BUY = "BUY",
    SELL = "SELL",
    WAIT = "WAIT",
    WAITBUY = "WAIT BUY",
    WAITSELL = "WAIT SELL",
    STOPGAIN = "STOP GAIN",
    STOPLOSS = "STOP LOSS",
    TRAILINGSTOP = "TRAILING STOP",
}

export default abstract class Indicator implements Observer {
    private _interval: BinanceInterval;
    private _symbol: string;
    private _tableCreated = false;
    private _wait: number = 0;
    private id!: number;
    private BUY_PRICE: number = 0;
    private SELL_PRICE: number = 0;
    private PL: number = 0;
    private CLOSE_PRICE: number = 0;
    private RESULT: number = 1;
    private _signal!: Signal;
    private _stopLoss: number;
    private _stopGain: number;
    private _trailingStop: number = 0;
    private TRAILING_STOP: number = 0;

    constructor(symbol: string, interval: BinanceInterval, stopLoss = 0, stopGain = 1000, trailingStop = 0) {
        this._symbol = symbol;
        this._interval = interval;
        this._stopLoss = stopLoss;
        this._stopGain = stopGain;
        this._trailingStop = trailingStop;

    }

    getTableName(): string {
        return `${this.constructor.name}_${this._symbol}_${this._interval}`;
    }

    getData(): any {
        let n: any = {};
        for (const [key, value] of Object.entries(this)) {
            if (typeof key == "string" && key[0] != "_") {
                n[key] = value;
            }
        }
        return n;
    }

    createTable(): void {
        if (!this._tableCreated) {
            let data = this.getData();
            let fields = Object.keys(data);
            let sql = "DROP TABLE IF EXISTS " + this.getTableName();
            db.prepare(sql).run();
            sql = "CREATE TABLE " + this.getTableName() + " (signal TEXT,  " + fields.join(" FLOAT,") + " INT)";
            db.prepare(sql).run();
            this._tableCreated = true;
        }
    }
    update(klines: Klines): void {
        this._signal = this.calculate(klines);
        this.CLOSE_PRICE = klines.getPrice();
        this.processSignal();
        this.id = klines.getId();
        if (!this._tableCreated) {
            this.createTable();
            this._tableCreated = true;
        }
        this.save();
    }

    processSignal() {
        let inPosition = this.BUY_PRICE != 0;
        this._wait--;
        if (!inPosition) {
            this.PL = 0;
            this.SELL_PRICE = 0;
            this.TRAILING_STOP = 0;
            if (this._signal == Signal.BUY && this._wait <= 0) {
                this.BUY_PRICE = this.CLOSE_PRICE;
                this.TRAILING_STOP = this.BUY_PRICE * this._stopLoss;
            } else {
                this._signal = Signal.WAITBUY;
            }
        } else {
            this.PL = this.CLOSE_PRICE / this.BUY_PRICE;
            let trailing_price = this.CLOSE_PRICE - (this.CLOSE_PRICE * this._trailingStop);
            // Ajusto o TrailingStop
            if (trailing_price > this.TRAILING_STOP) {
                this.TRAILING_STOP = trailing_price;
            }
            // Se recebo o sinal de venda e o PL é maior que as taxas...
            if (this._signal == Signal.SELL && this.PL > 1.0025) {
                this.closePostion();
                this._signal = Signal.SELL;
                return;
            }
            if (this.PL > this._stopGain) {
                this._signal = Signal.STOPGAIN;
                this.closePostion();
                return;
            }
            if (this.PL < this._stopLoss) {
                this._signal = Signal.STOPLOSS;
                this.closePostion();
                // this._wait = 20;
                return;
            }
            if (this.CLOSE_PRICE < this.TRAILING_STOP && this.PL > 1.0021) {
                this._signal = Signal.TRAILINGSTOP;
                this.closePostion();
                return;
            }

            this._signal = Signal.WAITSELL;
        }
    }

    private closePostion(): void {
        this.SELL_PRICE = this.CLOSE_PRICE;
        this.RESULT *= (this.SELL_PRICE / this.BUY_PRICE);
        this.BUY_PRICE = 0;
        this.TRAILING_STOP = 0;
    }

    save(): void {
        let data = this.getData();
        let fields = Object.keys(data);
        let values = Object.values(data);
        let sql = "INSERT INTO " + this.getTableName() + " (signal, " + fields.join(",") + ") VALUES ('" + this._signal + "', " + values.join(",") + ")";
        db.prepare(sql).run();
    }

    getSymbol(): string {
        return this._symbol;
    }

    getInterval(): BinanceInterval {
        return this._interval;
    }
    abstract calculate(klines: Klines): Signal;
}