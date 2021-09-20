import { Component, OnInit } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import {InformacionQRService} from 'src/app/core/informacionQR/informacion-qr.service';
@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQRPage implements OnInit {
  barcodeScannerOptions: BarcodeScannerOptions;
  scannedData: {};
  QRInformacion:string ="";
  constructor(private barcodeScanner: BarcodeScanner,
    private serviceQR:InformacionQRService) { }

  ngOnInit() {
  }

  leerCodigo(){
    // Pedir permiso de utilizar la camara
    this.barcodeScanner
    .scan()
    .then(barcodeData => {
      //alert("Barcode data " + JSON.stringify(barcodeData));
      //this.traerInformacionQR(scannedData);
      this.scannedData = barcodeData;
      this.traerInformacionQR(barcodeData.text,this);
    })
    .catch(err => {
      console.log("Error", err);
    });
  
    }

    async traerInformacionQR(barcodeData:string,objectthis:any){
      var informacion ;
      await this.serviceQR.ObtenerInformacionQR(barcodeData).then(function(value){
        objectthis.QRInformacion= value.value[0].rows[0][0];
      });
    }
}
