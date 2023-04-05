import { getKline, Kline as HistoricalKline } from "binance-historical";
import { BinanceInterval } from "binance-historical/build/types";
import db from "./db";
import KlineTable from "./KlineTable";

export default class HistoricalKlines {
  symbol: string;
  interval: BinanceInterval;
  ini: Date;
  end: Date;
  table: string;
  limit: number;
  constructor(
    symbol: string,
    interval: BinanceInterval,
    ini: Date,
    end: Date,
    limit = 500
  ) {
    this.symbol = symbol;
    this.interval = interval;
    this.ini = ini;
    this.end = end;
    this.table = `${symbol}_${interval}`;
    this.limit = limit;
    new KlineTable(this.table);
    this.getHistoricalKlinesFromBinance();
  }

  async start() {
    const ini = this.ini.getTime();
    const end = this.end.getTime();
    const sql = `SELECT * FROM ${this.table} WHERE openTime >= ${ini} AND openTime <= ${end} ORDER BY openTime;`;
    const stmt = db.prepare(sql);
    return stmt;
  }

  /* Istanbul ignore next */ async /* Istanbul ignore next */ getHistoricalKlinesFromBinance /* Istanbul ignore next */() /* Istanbul ignore next */ {
    const ini = this.ini.getTime();
    const end = this.end.getTime();
    const stmt = db.prepare(
      `SELECT COUNT(*) AS "count" FROM ${this.table}
      WHERE openTime = ${ini} OR openTime = ${end};`
    );
    const count = stmt.get();
    if (count.count != 2) {
      /* Istanbul ignore next */
      console.log("Get Historical Data From Binance...");
      /* Istanbul ignore next */
      const klines: Array<HistoricalKline> = await getKline(
        this.symbol,
        this.interval,
        this.ini,
        this.end
      );

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
      db.exec(sql);
      console.log("The data has been saved in the database!");
    }
  }
}
