import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public currentLanguage: string = "ESP";//TODO: Valor por defecto, al cambiar se debe mantener en el storage de la aplicación y cargar desde ahí

  constructor() { }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  setCurrentLanguage(language:string) {
    this.currentLanguage = language;
  }
}
