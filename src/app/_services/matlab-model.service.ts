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

  async loadONNXModel(url: any): Promise<onnx.InferenceSession> {
    // const modelUrl = 'https://raw.githubusercontent.com/bonny890322/model_onnx/master/onnxnet.onnx';
    // const modelUrl = 'https://dai-integration-platform.s3.ap-northeast-1.amazonaws.com/files/%E5%93%81%E8%B3%AA%E9%A0%90%E6%B8%AC%E6%A8%A1%E5%9E%8B.onnx'
    const modelUrl = url;
    const session = new onnx.InferenceSession();
    await session.loadModel(modelUrl);
    return session; // 回傳模型
  }

  // async loadONNXModel(base64: any): Promise<onnx.InferenceSession> {
  //   // const modelUrl = 'https://dai-integration-platform.s3.ap-northeast-1.amazonaws.com/files/%E5%93%81%E8%B3%AA%E9%A0%90%E6%B8%AC%E6%A8%A1%E5%9E%8B.onnx';
  //   // const response = await fetch('/api/load-model'); // 向后端发送请求获取模型文件

  //   // Decode the base64 string
  //   const modelData = window.atob(base64)

  //   // Convert the model data to an ArrayBuffer
  //   const buffer = new ArrayBuffer(modelData.length);
  //   const view = new Uint8Array(buffer);
  //   for (let i = 0; i < modelData.length; i++) {
  //     view[i] = modelData.charCodeAt(i);
  //   }

  //   const session = new onnx.InferenceSession();
  //   await session.loadModel(buffer); // 加载模型文件的二进制数据
  //   return session; // 返回模型
  // }


}
