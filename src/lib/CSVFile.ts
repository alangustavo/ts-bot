import { BinanceInterval } from "binance-historical/build/types";
import { appendFileSync } from "fs";
export default class CSVFile {
  symbol: string;
  interval: BinanceInterval;
  strategyName: string;
  fileName: string;

  constructor(symbol: string, interval: BinanceInterval, strategyName: string) {
    this.symbol = symbol;
    this.interval = interval;
    this.strategyName = strategyName;
    this.fileName = this.getFileName();
  }
  getFileName(date: Date = new Date()) {
    let y = date.getFullYear();
    let m = this.padLeft(date.getMonth() + 1, 2);
    let d = this.padLeft(date.getDate(), 2);
    let h = this.padLeft(date.getHours(), 2);
    let i = this.padLeft(date.getMinutes(), 2);
    return `./csv/${y}_${m}_${d}_${h}_${i}_${this.symbol}_${this.interval}_${this.strategyName}.csv`;
  }
  padLeft = (
    number: number,
    length: number,
    character: string = "0"
  ): string => {
    let result = String(number);
    for (let i = result.length; i < length; ++i) {
      result = character + result;
    }
    return result;
  };
  addRow(csv: string) {
    try {
      appendFileSync(this.fileName, `${csv}\n`);
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }
}
