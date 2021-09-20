import { Injectable,NgZone } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { WebapiService } from '../webapi/webapi.service';
import { GeneralService } from '../General/general.service';

export interface IGet {
  controller: string;
  action: string;
  params?: HttpParams;
  headers?: HttpHeaders;
}

export interface IPost extends IGet {
  body: any;
}
export interface IResponse {
  d: string;
}

export interface IResponse {
  f: boolean;
}
export interface IException {
  Data: any;
  Details: string | any;
  InnerException: IException;
  InnerMessages: string;
  Message: string;
  StackTrace: string;
}


export interface IPrinpalResponse {
  Exception: IException;
  MethodName: string;
  RequestID: string;
  ServiceName: string;
  Value: any;
}

@Injectable({
  providedIn: 'root'
})
export class InformacionQRService {
  protected urlApi: string = "https://testappservicewf.azurewebsites.net/api/tourism";
  constructor(private http: WebapiService, private general: GeneralService, private zone: NgZone) { }

  async ObtenerInformacionQR(codigoQR:string) {
    const dataSync = '{"StoredParams":[{"Name":"CodigoQR", "Value":"'+codigoQR+'"}],"StoredProcedureName":"ObtenerInformacionQR"}';
    const sasUriBlob = this.urlApi + "";
    let header = new HttpHeaders();
    header = header.set("Content-Type", "application/json; charset=UTF-8");
    let data = await this.http.post<any>(
      {
        Uri: sasUriBlob,
        controller: "",
        action: "",
        body: dataSync,
        headers: header
      }
    )
    return data;
  }
}