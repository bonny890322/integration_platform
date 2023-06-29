import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  @ViewChild('fileUpload') fileUpload: any;

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

    this.fileUpload.clear() // 清空上傳的檔案

  }
}

function predictWithCNN(image: HTMLImageElement) {
  // 在這裡執行CNN模型預測
  // const model = await tf.loadLayersModel('model.json');

  // 將圖像轉換為張量並進行預處理
  // const tensor = tf.browser.fromPixels(image)
  // .resizeNearestNeighbor([224, 224]) // 調整圖像大小
  // .toFloat()
  // .div(tf.scalar(255))
  // .expandDims();

  // // 使用模型進行推論
  // const predictions = await model.predict(tensor).data();

  // // 返回預測結果
  // return predictions;

  // throw new Error('Function not implemented.');
}

