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

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
