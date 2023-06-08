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
  getFileRequest(page: number, limit: number, id: string): Observable<any> {
    const url = `${API_URL}/file?page=${page}&limit=${limit}&order_uuid=${id}`;
    return this.http.get(url);
  }

  // 取得 account 的 file
  getSignFileRequest(page: number, limit: number, id: string): Observable<any> {
    const url = `${API_URL}/file?page=${page}&limit=${limit}&account_id=${id}`;
    return this.http.get(url);
  }

  // 上傳檔案
  postFileRequest(fileRequest: any): Observable<any> {
    const url = `${API_URL}/file`;
    return this.http.post(url, fileRequest);
  }

  // 刪除特定 file
  deleteFileRequest(id: string): Observable<any> {
    const url = `${API_URL}/file/${id}`;
    return this.http.delete(url);
  }

}
