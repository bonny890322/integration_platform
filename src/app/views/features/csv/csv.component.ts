import { Component, ViewChild } from '@angular/core';
import { MatlabModelService } from './../../../_services/matlab-model.service';
import { MessageService } from 'primeng/api';
import { HttpApiService } from 'src/app/_services/http-api.service';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})
export class CsvComponent {

  @ViewChild('fileUpload') fileUpload: any;

  tableData: any[] = [];

  data_chart: any = [];

  selectedModel: any;

  outputData: any = []

  predictionDialog: Boolean = false

  uploadFile: Boolean = false

  constructor(
    private MatlabModelService: MatlabModelService,
    private messageService: MessageService,
    private HttpApi: HttpApiService,
  ) {
  }

  ngOnInit() {

  }

  // 讀取上傳的csv檔案定繪製圖表
  onUpload(event: any) {

    console.log(event)
    const file: File = event.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const csvRows: string[] = data.split('\n');
      this.tableData = csvRows.map(row =>
        row.replace(/\r/g, '') // 清除掉換行\r
          .split(','))
        .filter(row => row.some(cell => cell.trim() !== '') // 跟陣列不可為['']
        );
      console.log(this.tableData)

      this.uploadFile = true // 上傳檔案顯示下拉選單跟按鈕

      const timeCols: string[] = this.tableData.map(row => row[0]); // 讀二微陣列的時間列
      console.log(timeCols)
      const timeValues: any[] = timeCols.slice(1); // 排除時間列的標題
      console.log(timeValues);

      const all: any = []

      this.data_chart = [] // 清空圖表資料

      // 分別繪製每一列的圖表
      for (let i = 1; i < this.tableData[0].length; i++) { // i = 1 從陣列裡的第二行開始，第一列為時間

        const Cols: string[] = this.tableData.map(row => row[i]); // 讀二微陣列的 col
        console.log(Cols)

        let Values: any[] = Cols.slice(1); // 存放每一列的值並排除掉標題行
        console.log(Values);

        this.data_chart.push({
          labels: timeValues, // x軸 (時間)
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
        labels: timeValues, // x軸 (時間)
        datasets: all
      })

      console.log(this.tableData[0].length)
      this.getFile(1, 1000, this.tableData[0].length)

    }

    reader.readAsText(file, 'Big5');

    this.fileUpload.clear() // 清空上傳的檔案

  }

  // 進行預測
  forecasting() {
    console.log(this.tableData.length)
    if (this.tableData.length) {
      // 有資料
      if (this.selectedModel.download_url) {
        this.loadModel()
      } else {
        // 自動跑適合的模型

      }

    } else {
      this.messageService.add({ severity: 'warn', summary: '注意', detail: '無資料' });
    }

  }

  // 載入模型
  async loadModel() {

    console.log(this.selectedModel)

    try {
      const inferenceSession = await this.MatlabModelService.loadONNXModel(this.selectedModel.download_url);

      console.log(inferenceSession)

      const data = this.tableData.slice(1) // 排除 this.tableData 標頭
      console.log(data)

      this.outputData = [] // 清空輸出結果

      for (let i in data) {

        if (data.length) {
          // input
          console.log(data[i])
          const inputData = data[i];
          const inputShape = [1, data[i].length];
          const inputTensor = new onnx.Tensor(inputData, 'float32', inputShape);

          // 輸出所有output
          const outputMap = await inferenceSession.run([inputTensor]);
          const outputTensors = outputMap.values();

          console.log(`------------------ 第 ${i} 筆資料 ------------------`)

          this.outputData.push([`第 ${Number(i) + 1} 筆資料`]) // 有幾筆資料就建立幾個 row

          for (const outputTensor of outputTensors) {
            this.outputData[i].push(outputTensor.data[0])
          }

          console.log('outputData', this.outputData)

        }
      }

      this.predictionDialog = true // 顯示預測視窗
    } catch (error) {
      console.error('發生錯誤:', error);
      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Data format error.' });
    }

  }

  FileData: any = [] // 接資料的表格變數
  // 取得模型檔案
  getFile(page: number, limit: number, input: number): void {
    this.HttpApi.getFileByInputRequest(page, limit, input)
      .subscribe(Request => {
        console.log(Request)
        this.FileData = Request.body.files

        this.FileData.unshift({ // 將自動跑模型插入第一個
          name: '自動'
        })

        console.log("FileData", this.FileData)
      })
  }

}
