import { BinanceInterval } from "binance-historical/build/types";
import sqlite from "better-sqlite3";
const db = sqlite("./data/indicators.db");

export default abstract class Indicator {
    private interval: string;
    private symbol: string;
    private tableCreated = false
    
    constructor(symbol:string, interval: BinanceInterval) {
        this.symbol = symbol;
        this.interval = interval;
    }

    getTableName(): string {
        return `${this.constructor.name}_${this.symbol}_${this.interval}`;
    }

    getFields(): string[] {
        return Object.keys(this);
    }

    getValues(): number[] {
        return Object.values(this);
    }

    createTable(): void {
        if(!this.tableCreated)
        db.prepare("DROP TABLE " + this.getTableName() + "; CREATE TABLE " + this.getTableName() + " (" + this.getFields().join(" FLOAT,") + " FLOAT)").run();
        this.tableCreated = true;
    }

    save(): void {
        db.prepare("INSERT INTO " + this.getTableName() + " (" + this.getFields().join(",") + ") VALUES (" + this.getValues().join(",") + ")").run();
    }   


}