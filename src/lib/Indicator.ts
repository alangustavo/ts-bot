import { BinanceInterval } from "binance-historical/build/types";
import sqlite from "better-sqlite3";
import Observer from "./IObserver";
import Klines from "./Klines";
import { Signal } from "./IStrategy";
const db = sqlite("./data/indicators.db");

export default abstract class Indicator implements Observer {
    private _interval: string;
    private _symbol: string;
    private _tableCreated = false;
    private id!: number;
    private _signal!: Signal;

    constructor(symbol: string, interval: BinanceInterval) {
        this._symbol = symbol;
        this._interval = interval;
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
            sql = "CREATE TABLE " + this.getTableName() + " (signal, " + fields.join(" FLOAT,") + " FLOAT)";
            db.prepare(sql).run();
            this._tableCreated = true;
        }
    }
    update(klines: Klines): void {
        this._signal = this.calculate(klines);
        this.id = klines.getId();
        if (!this._tableCreated) {
            this.createTable();
            this._tableCreated = true;
        }
        this.save();
    }
    save(): void {
        let data = this.getData();
        let fields = Object.keys(data);
        let values = Object.values(data);
        let sql = "INSERT INTO " + this.getTableName() + " (signal, " + fields.join(",") + ") VALUES ('" + this._signal + "', " + values.join(",") + ")";
        db.prepare(sql).run();
    }

    abstract calculate(klines: Klines): Signal;


}