import MACD12169 from "../../src/indicators/MACD12169"
import Klines from "../../src/lib/Klines";
import Kline500 from "../../testdata/data";
const klines = new Klines(500);
klines.addKlinesFromArray(Kline500);
describe("MACD12169 Tests", () => {
    it("Should exists", () => {
        const obj = new MACD12169("SOLUSDT", "15m");
        expect(obj).toBeInstanceOf(MACD12169);
    });

    it("Should create a Table and Data", () => {
        const obj = new MACD12169("SOLUSDT", "15m");
        obj.update(klines);
    });
});