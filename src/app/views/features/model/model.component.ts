import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpApiService } from 'src/app/_services/http-api.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {

  @ViewChild('dt') dt: Table
  @ViewChild('fileUpload') fileUpload: any;

  cols_file: any[];

  modelData: any[]

  addDialog: boolean = false

  editDialog: boolean = false

  Choose: string = 'Choose'

  constructor(
    private HttpApi: HttpApiService,
    private messageService: MessageService,
  ) {
    this.cols_file = [
      { field: 'name', header: '名稱' },
      { field: 'type', header: '模型' },
      { field: 'description', header: '描述' },
    ];

    this.modelData = [
      'Convolutional Neural Network，CNN',
      'Decision Trees',
      'Natural Language Processing，NLP',
      'Random Forests',
      'Support Vector Machines，SVM',
      'Others'
    ]
  }

  ngOnInit(): void {
    this.getFile(1, 1000)
  }

  ngAfterContentInit(): void {
  }

  hideDialog() {
    this.addDialog = false;
    this.editDialog = false;
  }

  addModel() {
    this.addDialog = false;
  }

  saveModel() {
    this.editDialog = false;
  }

  onModelSelected(event: any): void {
    const file = event.target.files[0];
    const fileName = file.name;

    this.Choose = fileName;
  }

  downloadFile(url: any) {
    console.log(url)
    window.location.href = url
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  FileData: any = [] // 接資料的表格變數
  // 取得檔案
  getFile(page: number, limit: number): void {
    this.HttpApi.getFileRequest(page, limit, '00000000-0000-0000-0000-000000000000')
      .subscribe(Request => {
        console.log(Request)
        this.FileData = Request.body.files
        console.log("FileData", this.FileData)
      })
  }

  // 上傳檔案
  postFileRequest(filedata: any) {

    console.log(filedata)
    this.HttpApi.postFileRequest(filedata).subscribe(Request => {
      console.log(Request)

      switch (Request.code) {
        case 200:
          this.messageService.add({ severity: 'success', summary: '成功', detail: '檔案上傳' });
          this.fileUpload.clear()
          this.getFile(1, 1000)

          break;
        case 413:
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '上傳失敗' });

          break;
        default:
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '上傳失敗' });
          break;
      }
    })
  }


  choosedFiles: any[] = []; // 待上傳檔案
  // 上傳檔案
  uploadFile(event: any) {
    console.log(event)

    this.choosedFiles = []

    for (let file of event.files) {
      this.choosedFiles.push(file);
    }

    for (var i = 0; i < this.choosedFiles.length; i++) {
      this.transformFile(this.choosedFiles[i])
      console.log(this.choosedFiles[i])
      console.log('檔案名稱', this.choosedFiles[i].name)
      console.log('檔案大小', this.choosedFiles[i].size)
    }

    console.log(this.choosedFiles);
    console.log(this.choosedFiles[0])

    console.log(this.filedata)

  }

  //轉碼
  filedata: any = {}
  filebytes: any // 檔案大小
  fileBase64: string // 檔案 base64
  fileExtension: string // 檔案格式
  transformFile(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileBase64 = <string>reader.result
      //this.fileBinary = atob(this.fileBase64.substring(this.fileBase64.indexOf(',') + 1))
      console.log(this.fileBase64)
      // console.log(this.fileBinary)

      this.fileExtension = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
      let base64test = this.fileBase64.split(',').pop();
      let filename = file.name.split('.').shift()
      this.filebytes = file.size.toFixed(2)
      this.bytechange(this.filebytes)
      // let filename = getfile.name.slice((getfile.name.lastIndexOf(".") - 1 >>> 0) + 2);
      console.log(filename)
      console.log(this.fileExtension)

      this.filedata['order_uuid'] = '00000000-0000-0000-0000-000000000000'
      this.filedata['name'] = file.name
      this.filedata['extension'] = this.fileExtension
      this.filedata['base64'] = base64test
      // this.filedata['creater'] = this.userJson.account_id
      this.filedata['size'] = this.filebytes
      console.log(this.filedata)

      this.postFileRequest(this.filedata)

    }
  }

  //轉換檔案格式大小
  bytechange(bytes: any): void {
    const sizes = [" Bytes", " KB", " MB", " GB", " TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1000));
    this.filebytes = (bytes / Math.pow(1000, i)).toFixed(2) + sizes[i]
    console.log(this.filebytes)
  }


}
