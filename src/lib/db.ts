// import Database from "better-sqlite3";
import sqlite from "better-sqlite3";
const { access, constants, unlink } = require('node:fs/promises');

const ORIGINAL_ENV = process.env;
let filename = "./data/ts-bot.db";
if (ORIGINAL_ENV.NODE_ENV == 'test') {
    filename = "./data/test.db";
    unlink(filename);

}
const db = sqlite(filename);
db.pragma("journal_mode = WAL");
export default db;
