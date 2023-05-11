import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})
export class CsvComponent {

  @ViewChild('fileUpload') fileUpload: any;

  tableData: any[] = [];

  data_chart: any = [];

  cities: any[];

  selectedCity: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.cities = [
      { name: '--模型選擇--' },
      { name: '品質預測模型' }
    ];
  }

  onUpload(event: any) {
    console.log(event)
    const file: File = event.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const csvRows: string[] = data.split('\n');
      this.tableData = csvRows.map(row => row.split(','));
      console.log(this.tableData)
      const timeCols: string[] = this.tableData.map(row => row[0]); // 只取每個陣列裡的第一個
      console.log(timeCols)
      const timeValues: any[] = timeCols.slice(1); // 排除第一列標題
      console.log(timeValues);

      const all: any = []

      for (let i = 1; i < this.tableData[0].length - 1; i++) {
        const Cols: string[] = this.tableData.map(row => row[i]); // 只取每個陣列裡的第二個
        console.log(Cols)
        const Values: any[] = Cols.slice(1); // 排除第一列標題
        console.log(Values);

        this.data_chart.push({
          labels: timeValues, // x軸
          datasets: [
            {
              label: Cols[0], // 名稱
              data: Values
            }
          ]
        })

        all.push({
          label: Cols[0], // 名稱
          data: Values
        })
      }

      this.data_chart.unshift({ // 將彙總圖標插入第一個
        labels: timeValues, // x軸
        datasets: all
      })

    }

    reader.readAsText(file, 'Big5');

    this.fileUpload.clear()


  }

}
