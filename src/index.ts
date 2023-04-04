require("dotenv").config();
import RSITISRSIStrategy from "./indicators/RSITISRSIStrategy";
import Bot from "./lib/Bot";
import HistoricalDataSource from "./lib/HistoricalDataSource";
const hds = new HistoricalDataSource(
  "SOLUSDT",
  "15m",
  new Date("2021-01-01 00:00:00"),
  new Date("2022-12-31 23:45:00")
);

const strategy = new RSITISRSIStrategy();

const bot = new Bot(hds, strategy);
