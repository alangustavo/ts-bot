import Bot from "../src/lib/Bot";
import DataSource from "../src/lib/DataSource";
import Observer from "../src/lib/IObserver";
import Klines from "../src/lib/Klines";

class Mock implements Observer {
  update(klines: Klines): void {
    throw new Error("Method not implemented.");
  }
}
describe("DataSource Tests", () => {
  it("Should exists", () => {
    const obj = new DataSource("SOLUSDT", "15m", 500);
    expect(obj).toBeInstanceOf(DataSource);
  });
  it("Should not include an existing observer", () => {
    const obj = new DataSource("SOLUSDT", "15m", 500);
    const mock = new Mock();
    const mock2 = new Mock();
    obj.attach(mock);
    expect(obj.observers.length).toBe(1);
    obj.attach(mock);
    expect(obj.observers.length).toBe(1);
    obj.attach(mock2);
    expect(obj.observers.length).toBe(2);
  });
});
