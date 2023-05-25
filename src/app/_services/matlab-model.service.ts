import { Injectable } from '@angular/core';

import * as onnx from 'onnxjs'; // 使用 ONNX.js

@Injectable({
  providedIn: 'root'
})
export class MatlabModelService {

  constructor() {
    // 初始化
  }

  async loadONNXModel(): Promise<onnx.InferenceSession> {
    const modelUrl = 'https://raw.githubusercontent.com/bonny890322/model_onnx/master/onnxnet.onnx';
    const session = new onnx.InferenceSession();
    await session.loadModel(modelUrl);
    return session; // 回傳模型
  }

}
