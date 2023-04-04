import db from "./db";

export default class KlineTable {
  constructor(table: string) {
    const sql = `
    CREATE TABLE IF NOT EXISTS ${table}(
      openTime INT PRIMARY KEY NOT NULL,
      open FLOAT NOT NULL,
      high FLOAT NOT NULL,
      low FLOAT NOT NULL,
      close FLOAT NOT NULL,
      closeTime INT NOT NULL,
      volume FLOAT NOT NULL,
      quotedAssetVolume FLOAT NOT NULL,
      trades INT NOT NULL,
      takerBuyBaseAssetVolume FLOAT NOT NULL,
      takerBuyQuoteAssetVolume FLOAT NOT NULL
    );`;
    db.exec(sql);
  }
}
