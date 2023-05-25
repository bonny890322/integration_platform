import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {

  @ViewChild('dt') dt: Table

  tableData: any[]

  tableCols: any[];

  addDialog: boolean = false

  Choose: string = 'Choose'

  constructor(
  ) {
    this.tableCols = [
      { field: 'no', header: '' },
      { field: 'name', header: '名稱' },
      { field: 'description', header: '描述' },
    ];


  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.showTable()
  }

  showTable() {
    this.tableData = [
      { no: 1, name: '品質預測模型', description: '21個input,3個output' },
      { no: 2, name: '品質預測模型2', description: '21個input,3個output' }
    ];
    console.log(this.tableData)
  }

  hideDialog() {
    this.addDialog = false;
  }

  addModel() {
    this.addDialog = false;
  }

  onModelSelected(event: any): void {
    const file = event.target.files[0];
    const fileName = file.name;

    this.Choose = fileName;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
