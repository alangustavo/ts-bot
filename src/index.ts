require("dotenv").config();
import Bot from "./lib/Bot";
import DEMASRSI from "./indicators/DEMASRSI";
import ESTUDO_HILO from "./indicators/ESTUDO_HILO";

// const i = new DEMASRSI("SOLUSDT", "15m", 0.97, 1000, 0.009);
const j = new ESTUDO_HILO("SOLUSDT", "15m", 0.985, 1.05, 0.01);
const b = new Bot(j, new Date("2022-01-01 00:00:00"), new Date("2023-04-01 23:45:00"));
// const b = new Bot(j);

// b.addIndicator(j);

// const b = new Bot(j);