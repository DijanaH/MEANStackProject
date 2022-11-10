import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencijaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dohvSveServ() {

    return this.http.get(`${this.uri}/agencije/dohvatiSve`)
  }

  dohvPoNazivuServ(naziv) {
    const podaci = {
      naziv: naziv
    }
    return this.http.post(`${this.uri}/agencije/dohvatiPoNazivu`, podaci)
  }

  dodajServ(naziv, grad, adresa,telefon,pib) {
    const podaci = {
      naziv: naziv,
      grad: grad,
      adresa: adresa,
      telefon:telefon,
      pib:pib
    }
    return this.http.post(`${this.uri}/agencije/dodaj`, podaci)
  }
}
