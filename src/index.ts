require("dotenv").config();
import AVGTIRSI_SMA25SMA7 from "./indicators/AVGTIRSI_SMA25SMA7";
import AVGTIRSI_SMA25SMA7STOP from "./indicators/AVGTIRSI_SMA25SMA7STOP";
import AVGTIRSI_SMA25SMA7WILLR70STOP from "./indicators/AVGTIRSI_SMA25SMA7WILLR70STOP";
import AVGTIRSI_SMA25SMA7WILLR90STOP from "./indicators/AVGTIRSI_SMA25SMA7WILLR90STOP";
import AllStrategy from "../WAIT/AllStrategy";
import AvgTIRSIM25M7 from "./indicators/AvgTIRSIM25M7";
import AvgTIRSIM25M7W11 from "./indicators/AvgTIRSIM25M7W11";
import AvgTIRSM99 from "./indicators/AvgTIRSM99";
import RSITISRSIStrategy from "./indicators/RSITISRSIStrategy";
import WILLR100_10_PRICE_SMA25 from "./indicators/WILLR100_10_PRICE_SMA25";
import Bot from "./lib/Bot";

const strategy = new AllStrategy("SOLUSDT", "15m");
// const strategy = new AVGTIRSI_SMA25SMA7STOP("SOLUSDT", "15m");
// const b = new Bot(strategy, new Date("2022-11-01"), new Date("2023-04-01"));
const b = new Bot(strategy, new Date("2022-01-01"), new Date("2023-04-01"));
