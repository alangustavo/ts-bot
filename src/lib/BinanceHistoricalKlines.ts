import { getKline, Kline as HistoricalKline } from "binance-historical";
import { BinanceInterval } from "binance-historical/build/types";
import db from "./db";
import KlineTable from "./KlineTable";

export default class BinanceHistoricalKlines {
  symbol: string;
  interval: BinanceInterval;
  ini: Date;
  end: Date;
  table: string;
  limit: number;
  count: number = 0;
  dbpath: string;
  constructor(
    symbol: string,
    interval: BinanceInterval,
    ini: Date,
    end: Date,
    limit = 500,
    dbpath = "./data/ts-bot.db"
  ) {
    this.symbol = symbol;
    this.interval = interval;
    this.ini = ini;
    this.end = end;
    this.table = `${symbol}_${interval}`;
    this.limit = limit;
    this.dbpath = dbpath;
    new KlineTable(this.table);
  }

  async start() {
    await this.getHistoricalKlinesFromBinance();
    const ini = this.ini.getTime();
    const end = this.end.getTime();

    let sql = `SELECT count(*) AS K FROM ${this.table} WHERE openTime >= ${ini} AND openTime < ${end}`;
    let rows: any = db.prepare(sql).get();
    this.count = rows['K'];
    sql = `SELECT * FROM ${this.table} WHERE openTime >= ${ini} AND openTime <= ${end} ORDER BY openTime;`;
    const stmt = db.prepare(sql);
    return stmt;
  }

  private async getHistoricalKlinesFromService() {
    const klines: Array<HistoricalKline> = await getKline(
      this.symbol,
      this.interval,
      this.ini,
      this.end
    );
    if (klines.length > 0) {
      console.log("Saving Data into Database...");
      let sql = `INSERT OR IGNORE INTO ${this.table}
              (openTime, open, high, low, close, closeTime,
                volume, quotedAssetVolume, trades, takerBuyBaseAssetVolume,
                takerBuyQuoteAssetVolume)
              VALUES `;
      klines.forEach((k) => {
        sql += `(${k.openTime}, ${k.open}, ${k.high}, ${k.low}, ${k.close}, ${k.closeTime},
               ${k.volume}, ${k.quoteAssetVolume}, ${k.trades}, ${k.takerBaseAssetVolume},
               ${k.takerQuoteAssetVolume}),`;
      });
      sql = sql.slice(0, -1);
      await db.exec(sql);
      console.log("The data has been saved in the database!");
    } else {
      console.log("No Historical Data From Binance in Period.");
    }

  }

  async getHistoricalKlinesFromBinance() {
    const ini = this.ini.getTime();
    const end = this.end.getTime();
    const stmt = await db.prepare(
      `SELECT * FROM ${this.table}
      WHERE openTime = ${ini} OR openTime = ${end};`
    ).all();

    if (stmt.length != 2) {
      await this.getHistoricalKlinesFromService();
    }
  }
}
