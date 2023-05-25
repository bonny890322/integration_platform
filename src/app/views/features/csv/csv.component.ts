import { Component, ViewChild } from '@angular/core';
import { MatlabModelService } from './../../../_services/matlab-model.service';

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

  constructor(
    private MatlabModelService: MatlabModelService,
  ) {
  }

  ngOnInit() {
    this.cities = [
      { name: '--模型選擇--' },
      { name: '品質預測模型' }
    ];
  }

  // 讀取上傳的檔案定繪製圖表
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

      this.data_chart = [] // 清空圖表資料

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

    this.fileUpload.clear() // 清空上傳的檔案

  }

  // 預測
  forecasting() {
    console.log(this.tableData.length)
    if (this.tableData.length) {
      // 有資料
      console.log('開始預測模型')
      this.loadModel()
    } else {
      // 沒資料
      console.log('無資料')
    }

  }

  async loadModel() {
    const inferenceSession = await this.MatlabModelService.loadONNXModel();

    console.log(inferenceSession)

    const data = this.tableData.slice(1) // 排除 this.tableData 標頭
    console.log(data)

    for (let i in this.tableData) {
      if (this.tableData.length) {
        // input
        console.log(this.tableData[i])
        const inputData = this.tableData[i];
        const inputShape = [1, this.tableData[i].length];
        const inputTensor = new onnx.Tensor(inputData, 'float32', inputShape);

        // 輸出所有output
        const outputMap = await inferenceSession.run([inputTensor]);
        const outputTensors = outputMap.values();

        console.log(`------------------ 第 ${i} 個 output ------------------`)
        for (const outputTensor of outputTensors) {
          const outputData = outputTensor.data;
          console.log(outputData); // output
        }
      }

    }

  }

}
