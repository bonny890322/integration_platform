import { Component } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  constructor(

  ) {
  }

  ngOnInit() {

  }

  image: string;
  // 讀取上傳的檔案
  onUpload(event: any) {

    console.log(event)
    const file: File = event.files[0];
    const reader: FileReader = new FileReader();
    console.log(reader)

    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = function () {
        // 將圖像數據傳送到CNN模型進行預測
        const predictions = predictWithCNN(img);
        console.log(predictions);
      };
      img.src = e.target.result as string;

      console.log(img)
      this.image = e.target.result as string;
    };

    reader.readAsDataURL(file);
    console.log(reader)

  }
}

function predictWithCNN(image: HTMLImageElement) {
  // 在這裡執行CNN模型預測

  // throw new Error('Function not implemented.');
}

