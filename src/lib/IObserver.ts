import Klines from "./Klines";

/**
 * The Observer interface declares the update method, used by subjects.
 */
export default interface Observer {
  // Receive update from subject.
  update(klines: Klines): void;
}
