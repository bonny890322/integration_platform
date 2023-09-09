import { Injectable } from '@angular/core';

import * as tf from '@tensorflow/tfjs';
// import * as fs from "fs";

@Injectable({
  providedIn: 'root'
})
export class TfService {

  constructor() {

  }

  async loadModel(modelUrl: string) {
    // console.log(modelUrl)

    const model = await tf.loadLayersModel(modelUrl);
    return model;
  }

  // Read the model JSON data from the given URL.
  async readModelFromUrl(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (err) {
      console.error('Failed to read model data:', err);
      throw err;
    }
  }

  // async predict(model: tf.LayersModel, inputData): Promise<tf.Tensor> {
  async predict(model: tf.LayersModel, inputData) {
    try {

      const predictions = model.predict(inputData) as tf.Tensor;

      console.log(predictions)

      let class_names = ['glass bottle', 'plastic bottle'] // 可能的分類類別

      // const predictedLabels = await predictions.argMax().data();


      // 尋找機率最大的值 所在的陣列位置
      const predictionsArray = await predictions.array();
      console.log(predictionsArray)
      const maxIndex = predictionsArray[0].indexOf(Math.max(...predictionsArray[0]));

      const accuracies = await predictions.max(1).data(); // 獲得預測準確度的數組

      console.log(maxIndex, accuracies)

      const predictedLabels = `Predicted Label: ${class_names[maxIndex]} \n Accuracies: ${accuracies[0].toFixed(4)}%`

      // return predictions;
      return predictedLabels;
    } catch (error) {
      console.error('Prediction failed:', error);
      throw error;
    }
  }

  async preprocessImage(image: HTMLImageElement): Promise<tf.Tensor> {
    // 将图像转换为张量并进行预处理
    const tensor = tf.browser.fromPixels(image)
      .toFloat()
      .resizeNearestNeighbor([64, 64]) // 调整图像大小
      .div(255)
      .expandDims();

    return tensor;
  }


}
