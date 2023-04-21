import DataSource from "./DataSource";
import Klines from "./Klines";

export default class MockDataSource extends DataSource {

    klines!: Klines;

    update(klines: Klines): void {
        this.klines = klines;
    }
}