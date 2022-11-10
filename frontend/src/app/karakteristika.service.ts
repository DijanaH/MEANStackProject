import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KarakteristikaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dodaj(terasa, podrum, internet, lodja, garaza, interfon, francbalkon, basta, telefon, lift, klima) {

    if (!terasa) terasa = false;
    if (!podrum) podrum = false;
    if (!internet) internet = false;
    if (!lodja) lodja = false;
    if (!garaza) garaza = false;
    if (!interfon) interfon = false;
    if (!francbalkon) francbalkon = false;
    if (!basta) basta = false;
    if (!telefon) telefon = false;
    if (!lift) lift = false;
    if (!klima) klima = false;

    const podaci = {
      terasa: terasa,
      podrum: podrum,
      internet: internet,
      lodja: lodja,
      garaza: garaza,
      interfon: interfon,
      francbalkon: francbalkon,
      basta: basta,
      telefon: telefon,
      lift: lift,
      klima: klima
    }

    return this.http.post<any>(`${this.uri}/karakteristike/dodaj`, podaci);
  }

  dohvatipoIdOglasServ(idOglas) {

    const podaci = {
      idOglas: idOglas
    }
    return this.http.post<any>(`${this.uri}/karakteristike/dohvatipoIdOglas`, podaci);
  }

  pretrazi_naprednoServ(terasa, podrum, internet, lodja, garaza, interfon, francbalkon, basta, telefon, lift, klima) {

    const podaci = {
      terasa: terasa,
      podrum: podrum,
      internet: internet,
      lodja: lodja,
      garaza: garaza,
      interfon: interfon,
      francbalkon: francbalkon,
      basta: basta,
      telefon: telefon,
      lift: lift,
      klima: klima,
    }
    return this.http.post(`${this.uri}/karakteristike/pretrazi_napredno`, podaci);
  }

  dohvatiSve() {
    return this.http.get(`${this.uri}/karakteristike/dohvati_sve`);
  }

  


}


