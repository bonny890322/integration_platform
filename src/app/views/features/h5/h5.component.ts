import { Component, ViewChild } from '@angular/core';

import * as tf from '@tensorflow/tfjs';
import { TfService } from 'src/app/_services/tf.service';


@Component({
  selector: 'app-h5',
  templateUrl: './h5.component.html',
  styleUrls: ['./h5.component.scss']
})
export class H5Component {

  @ViewChild('fileUpload') fileUpload: any;

  constructor(
    private tfService: TfService,
  ) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  image: string
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
        const predictions = this.main(img);
        console.log(predictions);
      };
      img.src = e.target.result as string;

      console.log(img)
      this.image = e.target.result as string;
    };

    reader.readAsDataURL(file);

    this.fileUpload.clear() // 清空上傳的檔案

  }

  async main(image: HTMLImageElement) {
    const modelUrl = 'https://dai-integration-platform.s3.ap-northeast-1.amazonaws.com/files/64bit.h5'; // Replace with the actual path

    // 将图像转换为张量并进行預處理
    const tensor = await this.tfService.preprocessImage(image);

    const tensorArray = await tensor.array();
    const inputData = tf.tensor(tensorArray);

    // try {
    const predictions = await this.predictWithH5Model(modelUrl, inputData);
    console.log('Predictions:', predictions);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  }

  async predictWithH5Model(modelUrl: string, inputData): Promise<tf.Tensor> {
    // try {
    const model = await this.loadH5Model(modelUrl);
    console.log('Model loaded:', model);
    const resizedData = tf.image.resizeBilinear(inputData, [64, 64]);
    const predictions = model.predict(resizedData) as tf.Tensor;
    return predictions;
    // } catch (error) {
    //   console.error('Prediction failed:', error);
    //   throw error;
    // }
  }

  async loadH5Model(modelUrl: string): Promise<tf.LayersModel> {
    // try {
    const model = await tf.loadLayersModel(modelUrl);
    return model;
    // } catch (error) {
    //   console.error('Failed to load H5 model:', error);
    //   throw error;
    // }
  }

}
