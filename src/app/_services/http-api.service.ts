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

  getFileByInputRequest(page: number, limit: number, input: number): Observable<any> {
    const url = `${API_URL}/file?page=${page}&limit=${limit}&input=${input}`;
    return this.http.get(url);
  }

  // 取得檔案
  getSignFileRequest(page: number, limit: number, id: string): Observable<any> {
    const url = `${API_URL}/file?page=${page}&limit=${limit}&account_id=${id}`;
    return this.http.get(url);
  }

  // 上傳檔案
  postFileRequest(fileRequest: any): Observable<any> {
    const url = `${API_URL}/file`;
    return this.http.post(url, fileRequest);
  }

  //修改檔案
  patchFileRequest(id: string, is_deleted: any): Observable<any> {
    const url = `${API_URL}/file/${id}`;
    return this.http.patch(url, is_deleted);
  }

  // 刪除檔案
  deleteFileRequest(id: string): Observable<any> {
    const url = `${API_URL}/file/${id}`;
    return this.http.delete(url);
  }

}
