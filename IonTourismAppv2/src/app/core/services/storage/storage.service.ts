import { Injectable } from '@angular/core';
import { UsuarioApp } from 'src/app/data/models/usuarioapp';

import { Storage } from '@capacitor/storage';


const _keys = {
  token: "4cdbb74b-62bb-49c0-9e7c-e474ad170a07",
  user: "3c3c0859-0cee-41a8-8283-81d3cec8f7fb",
  settings: "3c3c0859-0cee-41a8-8283-81d3cec8f7fd"
};
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setUser(key: string, usuarioApp: UsuarioApp) {
    await Storage.set({ key, value: JSON.stringify(usuarioApp) });
  }

  async getUser(key: string): Promise<{ value: UsuarioApp }> {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  async setIdioma(key: string, Idioma: string) {
    await Storage.set({ key, value: Idioma });
  }

  async getIdioma(key: string): Promise<{ value: string }> {
    const ret = await Storage.get({ key });
    return ret;
  }
}
