// import Database from "better-sqlite3";

import sqlite from "better-sqlite3";
const db = sqlite("./data/ts-bot.db");
// const db = new Database("./data/ts-bot.db");
db.pragma("journal_mode = WAL");
export default db;
