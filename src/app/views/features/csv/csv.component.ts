import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})
export class CsvComponent {

  @ViewChild('fileUpload') fileUpload: any;

  tableData: any = [];

  onUpload(event: any) {
    console.log(event)
    const file: File = event.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const csvRows: string[] = data.split('\n');
      // or parse Excel file
      // const workbook = XLSX.read(data, { type: 'binary' });
      // const sheetName: string = workbook.SheetNames[0];
      // const worksheet = workbook.Sheets[sheetName];
      // const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.tableData = csvRows.map(row => row.split(','));
    };

    console.log(reader)
    reader.readAsText(file, 'Big5');
    console.log(this.tableData)

    this.fileUpload.clear()
  }

}
