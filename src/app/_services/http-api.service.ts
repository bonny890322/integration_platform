import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(
    private http: HttpClient,
  ) { }


  // ----------------------------------------------------------- file -----------------------------------------------------------

  /**
 * @brief 取得檔案
 *
 * @param page 頁數(第幾頁的資料)
 * @param limit 個數(一頁有幾筆資料)
 * @return 回傳檔案資料
 */
  getFileRequest(page: number, limit: number): Observable<any> {
    const url = `${API_URL}/file?page=${page}&limit=${limit}`;
    return this.http.get(url);
  }

  getFileByInputRequest(page: number, limit: number, input: number, mold_id: string, machine_id: string): Observable<any> {
    let url
    if (mold_id && machine_id) {
      url = `${API_URL}/file?page=${page}&limit=${limit}&input=${input}&mold_id=${mold_id}&machine_id=${machine_id}`;
    } else if (mold_id) {
      url = `${API_URL}/file?page=${page}&limit=${limit}&input=${input}&mold_id=${mold_id}`;
    } else if (machine_id) {
      url = `${API_URL}/file?page=${page}&limit=${limit}&input=${input}&machine_id=${machine_id}`;
    } else {
      url = `${API_URL}/file?page=${page}&limit=${limit}`;
    }
    console.log(url)
    return this.http.get(url);
  }

  // 上傳檔案
  postFileRequest(fileRequest: any): Observable<any> {
    const url = `${API_URL}/file`;
    return this.http.post(url, fileRequest);
  }

  //修改檔案
  patchFileRequest(id: string, fileRequest: any): Observable<any> {
    const url = `${API_URL}/file/${id}`;
    return this.http.patch(url, fileRequest);
  }

  // 刪除檔案
  deleteFileRequest(id: string): Observable<any> {
    const url = `${API_URL}/file/${id}`;
    return this.http.delete(url);
  }

  // ----------------------------------------------------------- mold -----------------------------------------------------------

  /**
 * @brief 取得模具
 *
 * @param page 頁數(第幾頁的資料)
 * @param limit 個數(一頁有幾筆資料)
 * @return 回傳檔案資料
 */
  getMoldRequest(page: number, limit: number): Observable<any> {
    const url = `${API_URL}/mold?page=${page}&limit=${limit}`;
    return this.http.get(url);
  }

  // 上傳檔案
  postMoldRequest(moldRequest: any): Observable<any> {
    const url = `${API_URL}/mold`;
    return this.http.post(url, moldRequest);
  }

  //修改模具
  patchMoldRequest(id: string, moldRequest: any): Observable<any> {
    const url = `${API_URL}/mold/${id}`;
    return this.http.patch(url, moldRequest);
  }

  // 刪除檔案
  deleteMoldRequest(id: string): Observable<any> {
    const url = `${API_URL}/mold/${id}`;
    return this.http.delete(url);
  }

  // ----------------------------------------------------------- machine -----------------------------------------------------------

  /**
 * @brief 取得機台
 *
 * @param page 頁數(第幾頁的資料)
 * @param limit 個數(一頁有幾筆資料)
 * @return 回傳檔案資料
 */
  getMachineRequest(page: number, limit: number): Observable<any> {
    const url = `${API_URL}/machine?page=${page}&limit=${limit}`;
    return this.http.get(url);
  }

  // 上傳檔案
  postMachineRequest(moldRequest: any): Observable<any> {
    const url = `${API_URL}/machine`;
    return this.http.post(url, moldRequest);
  }

  //修改機台
  patchMachineRequest(id: string, MachineRequest: any): Observable<any> {
    const url = `${API_URL}/machine/${id}`;
    return this.http.patch(url, MachineRequest);
  }

  // 刪除檔案
  deleteMachineRequest(id: string): Observable<any> {
    const url = `${API_URL}/machine/${id}`;
    return this.http.delete(url);
  }

}
