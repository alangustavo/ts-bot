import Log from "../src/lib/Log";
import fs from 'fs';

describe("Log Tests", () => {
  it("Should Write a Log File", () => {
    const obj = new Log('test-log.log');
    obj.write('Log Teste');
    expect(fs.existsSync('./logs/test-log.log')).toBe(true);
  });

});