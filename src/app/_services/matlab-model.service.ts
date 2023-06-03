import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as onnx from 'onnxjs'; // 使用 ONNX.js

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class MatlabModelService {

  constructor() {
    // 初始化
    console.log(API_URL)
  }

  async loadONNXModel(): Promise<onnx.InferenceSession> {
    const modelUrl = 'https://raw.githubusercontent.com/bonny890322/model_onnx/master/onnxnet.onnx';
    const session = new onnx.InferenceSession();
    await session.loadModel(modelUrl);
    return session; // 回傳模型
  }

}
