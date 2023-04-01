// // import Bot from "../src/lib/Bot";
// import { ComplexIndicator } from "../src/lib/ComplexIndicator";
// // import DataSource from "../src/lib/DataSource";
// import { Signal, Strategy } from "../src/lib/IStrategy";
// import Klines from "../src/lib/Klines";
// class Mock extends Strategy {
//   public getSignal(klines: Klines): Signal {
//     throw new Error("Method not implemented.");
//   }
// }
// class MockIndicator extends ComplexIndicator {
//   public calculate(): void {}
// }

// describe("Bot Tests", () => {
//   it("Should exists", () => {
//     const bot = new Bot(
//       new DataSource("solusdt", "15m", 500),
//       new Mock(new MockIndicator(new Klines(1)))
//     );
//     expect(bot).toBeInstanceOf(Bot);
//   });
// });
