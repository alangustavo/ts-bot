import { existsSync } from "fs";
import CSVFile from "../src/lib/CSVFile";
describe("CSVFile Tests", () => {
  it("Should exists", () => {
    const obj = new CSVFile("TEST", "15m", "TESTS");
    expect(obj).toBeInstanceOf(CSVFile);
  });

  it("Should get a File Name", () => {
    const obj = new CSVFile("TEST", "15m", "TEST_STRATEGY");
    expect(obj.getFileName(new Date("2023-04-02 14:21:00"))).toBe(
      "./csv/2023_04_02_14_21_TEST_15m_TEST_STRATEGY.csv"
    );
  });

  it("Should create a csv file", () => {
    const obj = new CSVFile("TEST", "15m", "TEST_STRATEGY");
    obj.addRow("FIELD1;FIELD2;FIELD3");
    expect(existsSync(obj.getFileName())).toBe(true);
  });
});
