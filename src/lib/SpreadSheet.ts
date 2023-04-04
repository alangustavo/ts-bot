const xl = require("excel4node");
export default class SpreadSheet {
  wb: any;
  ws: any;
  columns!: string[];
  constructor(symbol: string, interval: string, strategyName: string) {
    this.wb = new xl.Workbook();
    this.ws = this.wb.addWorksheet(`${symbol}_${interval}_${strategyName}`);
  }

  addColumns(columns: string[]) {
    let headingColumnIndex = 1; //diz que começará na primeira linha
    this.columns = columns;
    columns.forEach((heading) => {
      this.ws.cell(1, headingColumnIndex++).string(heading);
    });
  }

  addRows(rows: {key:string, value:any}[]) : void{
    let rowIndex = 2; //começa na linha 2
    rows.forEach((record) => {
      //passa por cada item do data
      let columnIndex = 1; //diz para começar na primeira coluna
      //transforma cada objeto em um array onde cada posição contém as chaves do objeto (name, email, cellphone)
      Object.keys(rows).forEach((this.columns) => {
        //cria uma coluna do tipo string para cada item
        this.ws.cell(rowIndex, columnIndex++).string(record[columnName]);
      });
      rowIndex++; //incrementa o contador para ir para a próxima linha
    });
  }
}
