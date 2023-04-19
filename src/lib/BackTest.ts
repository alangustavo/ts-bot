import sqlite from "better-sqlite3";
import { BinanceInterval } from "binance-historical/build/types";
const db = sqlite("./data/backtest.db");
db.pragma("journal_mode = WAL");


export default class BackTest {
    symbol: string;
    interval: string;
    table: string;
    constructor(symbol : string, interval: BinanceInterval) {
        this.symbol = symbol;
        this.interval = interval;
        this.table = symbol.toUpperCase() + interval;
        this.createTable();

    }
    createTable() {
        let sql = `CREATE TABLE IF NOT EXISTS ${this.table} (id INTEGER PRIMARY KEY)`
        db.exec(sql);
    }

    addIndicator(indicator):void{

        let sql = `ALTER TABLE ${this.table} ADD COLUMN `;
    }
}