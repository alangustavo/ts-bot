import Klines from "./Klines";

abstract class ComplexIndicator {
  public abstract calculate(klines: Klines): void;
}

export { ComplexIndicator };
