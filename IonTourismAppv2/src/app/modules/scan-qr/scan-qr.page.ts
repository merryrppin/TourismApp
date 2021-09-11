import { Component, OnInit } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner";
@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQRPage implements OnInit {
  barcodeScannerOptions: BarcodeScannerOptions;
  scannedData: {};
  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  leerCodigo(){
    // Pedir permiso de utilizar la camara
    this.barcodeScanner
    .scan()
    .then(barcodeData => {
      //alert("Barcode data " + JSON.stringify(barcodeData));
      this.scannedData = barcodeData;
    })
    .catch(err => {
      console.log("Error", err);
    });
  
    }
}
