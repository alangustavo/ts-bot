import TechnicalIndicators from "../src/lib/TechnicalIndicators";
import Klines from "../src/lib/Klines";
import Kline500 from "../testdata/data";

const klines = new Klines(500);
klines.addKlinesFromArray(Kline500);
describe("MFI Indicators Tests", () => {
    it("Should return a correct Array Talib Money Flow Indicator (MFI)", () => {
        const obj = new TechnicalIndicators();
        const indicator = obj.MFI(
            klines.getHighs(),
            klines.getLows(),
            klines.getCloses(),
            klines.getVolumes(),
            14
        );
        const i = indicator[indicator.length - 1];
        expect(i).toBeCloseTo(34.09550966, 8);
    });

});