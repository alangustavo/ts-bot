require("dotenv").config();
import Bot from "./lib/Bot";
import ESTUDO_OBV from "./indicators/ESTUDO_OBV";



// const i = new DEMASRSI("SOLUSDT", "15m", 0.97, 1000, 0.009);
const j = new ESTUDO_OBV("SOLUSDT", "15m", 0.98, 2, 0.98);
const b = new Bot(j, new Date('2022-01-01'), new Date('2023-05-31'));
// const b = new Bot(j);

// b.addIndicator(j);

// const b = new Bot(j);