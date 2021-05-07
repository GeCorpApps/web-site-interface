import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent, HttpParams } from '@angular/common/http';
import { Config } from './config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  private lconfig;
  public baseURL: string;

  constructor(private http: HttpClient) {
    const llconfig = new Config();
    this.lconfig = llconfig.get();
  }

  public getToken() {
    const vToken = localStorage.getItem('token');
    return vToken;
  }

  /**
   * uploadPhoto
   */
  public uploadPhoto(pSegment: string, pFormData: any, pOptions: any) {
    return this.http.post<any>(this.lconfig.baseURL + pSegment, pFormData, pOptions).pipe(map((event: any) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  public get(pSegment: string, pHttpRequest:boolean = false): Observable<any> {
    if(pHttpRequest){
      return this.http.get(this.lconfig.baseURL + pSegment);
    }else{
      return this.http.get(pSegment);
    }
    
  }

  public post(pSegment: string, pParams: FormData = new FormData(), pDeprecatedOption: any = {}): Observable<any> {
    return this.http.post(this.lconfig.baseURL + pSegment, pParams);
  }

  public setUserActivate(pUser: any): boolean {
    console.log(pUser);
    return true;
  }

  public static setUserToken(pToken: any) {
    localStorage.setItem('token', pToken);
    return true;
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
  
      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;
  
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
  
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
}
