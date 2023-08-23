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
    // try {
    const model = await tf.loadLayersModel(modelUrl);
    // console.log(model.summary());
    // console.log(model.inputs);
    // console.log(model.outputs);

    // const weightsUrl = 'https://dai-integration-platform.s3.ap-northeast-1.amazonaws.com/files/group1-shard1of1.bin';

    // Load the weights from the .bin file
    // const weightsResponse = await fetch(weightsUrl);
    // const weightsBuffer = await weightsResponse.arrayBuffer();
    // await model.setWeights([tf.tensor(new Float32Array(weightsBuffer))]);

    return model;
    // } catch (error) {
    //   console.error('Error loading model:', error);
    //   throw error;
    // }

    // try {
    //   const modelJSON = await this.readModelFromUrl(modelUrl);
    //   const jsonString = JSON.stringify(modelJSON);
    //   const file = new File([jsonString], 'model.json');
    //   const model = await tf.loadLayersModel(tf.io.browserFiles([file]));
    //   return model;
    // } catch (error) {
    //   console.error('Failed to load the model:', error);
    //   throw error;
    // }
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

      const predictedLabels = await predictions.argMax().data();
      const accuracies = await predictions.max(1).data(); // 獲得預測準確度的數組

      console.log(predictedLabels, accuracies)

      console.log(`Predicted Label: ${class_names[predictedLabels[0]]}\nAccuracies: ${accuracies[0].toFixed(4)}%`);



      // return predictions;
      return `Predicted Label: ${class_names[predictedLabels[0]]}\nAccuracies: ${accuracies[0].toFixed(4)}%`;
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
