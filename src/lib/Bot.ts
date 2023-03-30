import DataSource from "./DataSource";
import Klines from "./Klines";
import Observer from "./Observer";
import Subject from "./Subject";

export default class Bot implements Observer {
  dataSource: DataSource;
  inPosition: boolean;
  constructor(dataSource: DataSource) {
    this.inPosition = false;
    this.dataSource = dataSource;
    this.dataSource.attach(this);
  }
  update(klines: Klines): void {
    // Faz alguma coisa
  }
}
