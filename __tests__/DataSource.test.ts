import DataSource from "../src/lib/DataSource";
import MockDataSource from "../src/lib/MockDataSource";

describe("DataSource Tests", () => {
  it("Should exists", () => {
    const obj = new DataSource("SOLUSDT", "15m");
    expect(obj).toBeInstanceOf(DataSource);
  });
  it("Should not include an existing observer", () => {
    const obj = new DataSource("SOLUSDT", "15m");
    const mock = new MockDataSource("SOLUSDT", "15m");
    const mock2 = new MockDataSource("SOLUSDT", "15m");
    expect(obj.attach(mock)).toBe(true);
    expect(obj.observers.length).toBe(1);
    expect(obj.attach(mock)).toBe(false);
    expect(obj.observers.length).toBe(1);
    expect(obj.attach(mock2)).toBe(true);
    expect(obj.observers.length).toBe(2);
  });
  it("Should remove an existing observer", () => {
    const obj = new DataSource("SOLUSDT", "15m", 500);
    const mock = new MockDataSource("SOLUSDT", "15m");
    const mock2 = new MockDataSource("SOLUSDT", "15m");
    obj.attach(mock);
    obj.attach(mock2);
    expect(obj.observers.length).toBe(2);
    expect(obj.detach(mock)).toBe(true);
    expect(obj.detach(mock)).toBe(false);
    expect(obj.observers.length).toBe(1);
    expect(obj.detach(mock2)).toBe(true);
    expect(obj.observers.length).toBe(0);
  });

  it("Should notify observers", () => {
    const obj = new DataSource("SOLUSDT", "15m", 500);
    const mock = new MockDataSource("SOLUSDT", "15m");
    const mock2 = new MockDataSource("SOLUSDT", "15m");
    obj.attach(mock);
    obj.attach(mock2);
    expect(mock.klines).toBeFalsy;
    expect(mock2.klines).toBeFalsy;
    obj.notify();
    expect(mock.klines).toBeTruthy;
    expect(mock2.klines).toBeTruthy;
  });
});
