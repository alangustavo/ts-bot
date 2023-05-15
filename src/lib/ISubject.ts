import Observer from "./IObserver";

/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
export default abstract class Subject {
  /**
   * Array of subscribers
   */
  observers!: Observer[];

  /**
   * Attach an observer from subject
   * @param observer 
   * @returns 
   */
  attach(observer: Observer): boolean {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return false;
    }
    this.observers.push(observer);
    return true;
  }

  /**
   * Detach an observer from the subject
   * @param observer 
   * @returns 
   */
  detach(observer: Observer): boolean {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return false;
    }
    this.observers.splice(observerIndex, 1);
    return true;
  }

  /**
   * Trigger an update in each subscriber.
   */
  public notify(message: any): void {
    // console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}
