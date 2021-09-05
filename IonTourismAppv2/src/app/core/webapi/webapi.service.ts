import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { GeneralService } from '../General/general.service';

export interface IGet {
  Uri: string;
  controller: string;
  action: string;
  params?: HttpParams;
  headers?: HttpHeaders;
}

export interface IPost extends IGet {
  body: any;
}

@Injectable({
  providedIn: 'root'
})

export class WebapiService {

  constructor(private http: HttpClient, private general: GeneralService) { }

  async get<T>(optionsGet: IGet, showError: boolean = true) {
    const defaultHeader = this.buildHeader(optionsGet.headers);
    const Uri = this.buildUrl(optionsGet.Uri, optionsGet.controller, optionsGet.action);
    let options: { headers: HttpHeaders; params?: HttpParams } = {
      headers: defaultHeader
    };
    if (optionsGet.params) options.params = optionsGet.params;

    return this.http.get<T>(Uri, options).pipe(map(resp => { return resp; }),
      catchError((err, ob) => {
        this.errorHandler<T>(err, showError);
        return ob;
      })
    )
      .toPromise();
  }

  async post<T>(optionsPost: IPost, showError: boolean = true) {
    const defaultHeader = this.buildHeader(optionsPost.headers);
    console.log("Post header =>", defaultHeader.get("Content-Type"))

    const Uri = this.buildUrl(optionsPost.Uri, optionsPost.controller, optionsPost.action);
    let options: { headers: HttpHeaders; params?: HttpParams } = {
      headers: defaultHeader
    };


    if (optionsPost.params) options.params = optionsPost.params;

    return this.http
      .post<T>(Uri, optionsPost.body, options)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError((err, ob) => {
          this.errorHandler<T>(err, showError);
          return ob;
        })
      )
      .toPromise();
  }

  async postboolean<T>(optionsPost: IPost, showError: boolean = true) {
    const defaultHeader = this.buildHeader(optionsPost.headers);
    console.log("Post header =>", defaultHeader.get("Content-Type"))

    const Uri = this.buildUrl(optionsPost.Uri, optionsPost.controller, optionsPost.action);
    let options: { headers: HttpHeaders; params?: HttpParams } = {
      headers: defaultHeader
    };


    if (optionsPost.params) options.params = optionsPost.params;

    return this.http
      .post<boolean>(Uri, optionsPost.body, options)
      .pipe(
        map(resp => {
          return resp;
        }),
        catchError((err, ob) => {
          this.errorHandler<T>(err);
          return ob;
        })
      )
      .toPromise();
  }

  private buildUrl(Url: string, controller: string, action: string): string {
    let Uri: string = Url;
    if (controller)
      Uri = !Uri.endsWith("/") ? `${Uri}/` : Uri;
    Uri = `${Uri}${controller}`;
    Uri = action ? `${Uri}/${action}` : Uri;
    return Uri;
  }

  private buildHeader(headers?: HttpHeaders): HttpHeaders {
    let defaultHeader = this.getDefaultHeader();
    if (headers)
      headers.keys().forEach(key => {
        defaultHeader = defaultHeader.set(key, headers.get(key));
      });
    return defaultHeader;
  }

  private getDefaultHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    return headers;
  }

  private errorHandler = <T>(e: HttpErrorResponse, showError: boolean = true): T => {
    if (showError && e.status != 401)
      console.info(`${e.statusText} ${e.message}`);
    // this.general.showErrorMessage(`${e.statusText} ${e.message}`);
    throw e;
  };
}
