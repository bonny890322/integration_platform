import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpApiService } from 'src/app/_services/http-api.service';

@Component({
  selector: 'app-mold',
  templateUrl: './mold.component.html',
  styleUrls: ['./mold.component.scss']
})
export class MoldComponent {

  @ViewChild('dt') dt: Table

  cols_mold: any[];

  addDialog: boolean = false

  editDialog: boolean = false

  modelForm: FormGroup;

  constructor(
    private HttpApi: HttpApiService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {
    this.cols_mold = [
      { field: 'name', header: '名稱' }
    ];

    this.modelForm = this.fb.group({
      name: ['', [Validators.required]], // 必填
    });
  }

  ngOnInit(): void {
    this.getMold(1, 1000)
  }

  moldData: any = [] // 接資料的表格變數
  // 取得檔案
  getMold(page: number, limit: number): void {
    this.HttpApi.getMoldRequest(page, limit)
      .subscribe(Request => {
        console.log(Request)
        this.moldData = Request.body.molds
        console.log("moldData", this.moldData)
      })
  }

  addModel() {

    console.log(this.modelForm.value)
    if (this.modelForm.valid) {
      this.addDialog = false;
      this.HttpApi.postMoldRequest(this.modelForm.value).subscribe(Request => {
        console.log(Request)

        switch (Request.code) {
          case 200:
            this.messageService.add({ severity: 'success', summary: '成功', detail: '模具新增' });
            this.getMold(1, 1000)

            break;
          case 413:
            this.messageService.add({ severity: 'error', summary: '失敗', detail: '新增失敗' });

            break;
          default:
            this.messageService.add({ severity: 'error', summary: '失敗', detail: '新增失敗' });
            break;
        }
      })

      this.modelForm.reset()
    } else {
      this.modelForm.markAllAsTouched()
    }

  }

  deleteModel(id: any) {
    this.HttpApi.deleteMoldRequest(id).subscribe(Request => {
      console.log(Request)

      switch (Request.code) {
        case 200:
          this.messageService.add({ severity: 'success', summary: '成功', detail: '模具刪除' });
          this.getMold(1, 1000)

          break;
        case 413:
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '刪除失敗' });

          break;
        default:
          this.messageService.add({ severity: 'error', summary: '失敗', detail: '刪除失敗' });
          break;
      }

      this.hideDialog()
    })
  }

  // 搜尋table
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  hideDialog() {
    this.addDialog = false;
    this.editDialog = false;
  }

  editData: any
  editModel(data: any) {
    this.editDialog = true
    this.editData = data
    console.log(this.editData)
  }

  saveModel() {
    console.log(this.editData)
    this.editDialog = false;

    this.HttpApi.patchMoldRequest(this.editData.file_id, this.editData)
      .subscribe(Request => {
        console.log(Request)
        switch (Request.code) {
          case 200:
            this.messageService.add({ severity: 'success', summary: '確認', detail: '修改成功' });
            setTimeout(() => {
              location.reload(); // 重整頁面
            }, 1000);
            break;
          default:
            this.messageService.add({ severity: 'error', summary: '失敗', detail: '修改失敗' });
            break;
        }
      })
  }
}
