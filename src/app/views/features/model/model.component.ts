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

  modelData: any[]

  addDialog: boolean = false

  editDialog: boolean = false

  Choose: string = 'Choose'

  constructor(
  ) {
    this.tableCols = [
      { field: 'no', header: '' },
      { field: 'name', header: '名稱' },
      { field: 'model', header: '模型' },
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

  }

  ngAfterContentInit(): void {
    this.showTable()
  }

  showTable() {
    this.tableData = [
      { no: 1, name: '品質預測模型', model: 'Random Forests', description: '21個input,3個output' },
      { no: 2, name: '品質預測模型2', model: 'Others', description: '21個input,3個output' }
    ];
    console.log(this.tableData)
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

  downloadFile() {
    window.location.href = 'https://raw.githubusercontent.com/bonny890322/model_onnx/master/onnxnet.onnx'
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
