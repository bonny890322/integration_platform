import { Component, ViewChild } from '@angular/core';

import { H5Service } from './../../../_services/model/h5.service';
import { TfService } from './../../../_services/tf.service';
import * as tf from '@tensorflow/tfjs';

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
    try {
      console.log(image)

      // Load the model
      const modelUrl = 'https://dai-integration-platform.s3.ap-northeast-1.amazonaws.com/files/model.json';
      const model = await this.tfService.loadModel(modelUrl);
      console.log(model)

      // 将图像转换为张量并进行預處理
      const tensor = await this.tfService.preprocessImage(image);

      // 使用模型进行推斷
      const predictions = await this.tfService.predict(model, tensor);

      // Log the predictions
      console.log(predictions);
      console.log(predictions.arraySync());

      // 將張量轉換為圖片並顯示
      const imgElement = await this.tensorToImage(predictions);

      console.log(imgElement)

      // 將圖片元素添加到網頁
      // document.body.appendChild(imgElement);

      // 返回預測結果
      return predictions;
    } catch (error) {
      // 在這裡處理錯誤情况
      console.error('發生錯誤:', error);
    }

  }

  img: string;
  async tensorToImage(tensor) {
    console.log(tensor)

    // Convert tensor to pixel data
    const pixels = await tf.browser.toPixels(tensor);

    // Create a new ImageData with the pixel data
    const width = tensor.shape[1]; // Width of the tensor
    const height = tensor.shape[0]; // Height of the tensor
    console.log(pixels, width, height)
    const imageData = new ImageData(pixels, width, height);
    // const imageData = new ImageData(new Uint8ClampedArray(pixels), width, height);

    // Create a canvas and draw the ImageData on it
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);

    // Create a new Image element
    const img = new Image();

    // Set the src attribute to the canvas data URL
    img.src = canvas.toDataURL();
    this.img = canvas.toDataURL();
    console.log(img.src)

    // Append the Image element to the document body
    this.img = img.src
    // document.body.appendChild(img);
  }

}


