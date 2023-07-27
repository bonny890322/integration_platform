import { Component, ViewChild } from '@angular/core';

import { H5Service } from './../../../_services/model/h5.service';
import { TfService } from './../../../_services/tf.service';
// import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  @ViewChild('fileUpload') fileUpload: any;

  constructor(
    private h5Service: H5Service,
    private tfService: TfService,
  ) {
    // Example: Call the readH5File method with a file path
    // const h5FilePath = 'path/to/your/file.h5';
    // this.h5Service.readH5File(h5FilePath);
  }

  ngOnInit() {

  }

  image: string;
  // 讀取上傳的照片
  onUpload(event: any) {

    console.log(event)
    const file: File = event.files[0];
    const reader: FileReader = new FileReader();
    console.log(reader)

    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = (e: any) => {
        // 將圖像數據傳送到CNN模型進行預測
        const predictions = this.predictWithCNN(img);
        console.log(predictions);
      };
      img.src = e.target.result as string;

      console.log(img)
      this.image = e.target.result as string;
    };

    reader.readAsDataURL(file);

    this.fileUpload.clear() // 清空上傳的檔案

  }

  async predictWithCNN(image: HTMLImageElement) {
    // // 在這裡執行CNN模型預測
    // const model = await tf.loadLayersModel('https://dai-integration-platform.s3.ap-northeast-1.amazonaws.com/files/64bit.h5');

    // // 將圖像轉換為張量並進行預處理
    // const tensor = tf.browser.fromPixels(image)
    //   .resizeNearestNeighbor([224, 224]) // 調整圖像大小
    //   .toFloat()
    //   .div(tf.scalar(255))
    //   .expandDims();

    // // 使用模型進行推論
    // const predictions = await model.predict(tensor);
    // console.log(predictions)

    // // 返回預測結果
    // return predictions;
    try {
      // Load the model
      const modelUrl = 'https://dai-integration-platform.s3.ap-northeast-1.amazonaws.com/files/model.json';
      const model = await this.tfService.loadModel(modelUrl);

      // 将图像转换为张量并进行預處理
      const tensor = await this.tfService.preprocessImage(image);

      // 使用模型进行推斷
      const predictions = await this.tfService.predict(model, tensor);

      // Log the predictions
      console.log(predictions.arraySync());

      // 返回預測結果
      return predictions;
    } catch (error) {
      // 在這裡處理錯誤情况
      console.error('發生錯誤:', error);
    }

  }
}


