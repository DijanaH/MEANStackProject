import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetaljiNekretnineService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dodaj(oglasivac, godinaizgradnje, stanje, tipgrejanja, trsprat, parking, mesrezije) {

    const podaci = {
      oglasivac: oglasivac,
      godinaizgradnje: godinaizgradnje,
      stanje: stanje,
      tipgrejanja: tipgrejanja,
      trsprat: trsprat,
      parking: parking,
      mesrezije: mesrezije,
    }

    return this.http.post(`${this.uri}/detalji/dodaj`, podaci)
  }

  dohvatipoIdOglasServ(idOglas) {

    const podaci = {
      idOglas: idOglas
    }

    return this.http.post(`${this.uri}/detalji/dohvatipoIdOglas`, podaci)
  }

  naprednopretrServ(godizgradnjeod,godizgradnjedo,oglasivac,stanje,tipgrejanja,spratod,spratdo,mesrezijeod,mesrezijedo) {

    const podaci = {
      godizgradnjeod: godizgradnjeod,
      godizgradnjedo: godizgradnjedo,
      oglasivac: oglasivac,
      stanje: stanje,
      tipgrejanja: tipgrejanja,
      spratod: spratod,
      spratdo: spratdo,
      mesrezijeod: mesrezijeod,
      mesrezijedo: mesrezijedo,
    }

    return this.http.post(`${this.uri}/detalji/pretrazi_napredno`, podaci)
  }













}
