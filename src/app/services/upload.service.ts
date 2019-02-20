import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly baseUrl = "http://localhost:8080";
  constructor(private http: HttpClient) {}

  public uploadFile(url: string, file: File): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file, file.name);
     
    const req = new HttpRequest('POST', this.baseUrl + url, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }
}
