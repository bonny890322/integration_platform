import { Injectable } from '@angular/core';

import * as tf from '@tensorflow/tfjs';
// import * as fs from "fs";

@Injectable({
  providedIn: 'root'
})
export class TfService {

  constructor() { }

  async loadModel(modelUrl: string) {
    try {
      const modelJSON = await this.readModelFromUrl(modelUrl);
      const jsonString = JSON.stringify(modelJSON);
      const file = new File([jsonString], 'model.json');
      const model = await tf.loadLayersModel(tf.io.browserFiles([file]));
      return model;
    } catch (error) {
      console.error('Failed to load the model:', error);
      throw error;
    }
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



  async predict(model: tf.LayersModel, inputData): Promise<tf.Tensor> {
    try {
      // Resize the inputData to the desired dimensions (64x64)
      const resizedData = tf.image.resizeBilinear(inputData, [64, 64]);
      // Use the loaded model to make predictions
      const predictions = model.predict(resizedData) as tf.Tensor;
      return predictions;
    } catch (error) {
      console.error('Prediction failed:', error);
      throw error;
    }
  }

  async preprocessImage(image: HTMLImageElement): Promise<tf.Tensor> {
    // 将图像转换为张量并进行预处理
    const tensor = tf.browser.fromPixels(image)
      .resizeNearestNeighbor([224, 224]) // 调整图像大小
      .toFloat()
      .div(tf.scalar(255))
      .expandDims();

    return tensor;
  }

}
