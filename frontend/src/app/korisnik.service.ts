import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Korisnik } from './models/korisnik';


@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  prijavaService(kor_ime, lozinka) {
    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/korisnici/prijava`, data);
  }

  dohvatiSveService() {

    return this.http.get(`${this.uri}/korisnici/dohvatiSve`);

  }

  jedinstvenMejlServ(mejl) {

    const podaci = {
      mejl: mejl
    }
    return this.http.post(`${this.uri}/korisnici/jedinstvenMejl`, podaci);
  }

  registracijaService(slika, ime, prezime, kor_ime, lozinka, tip, grad, datum_rodjenja, telefon, mejl, oglasivactip = null, agencija = null, br_licence = null) {


    const data = {
      slika,
      ime: ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      tip: tip,
      grad: grad,
      datum_rodjenja: datum_rodjenja,
      telefon: telefon,
      mejl: mejl,
      oglasivactip: oglasivactip,
      agencija: agencija,
      br_licence: br_licence,
    }
    return this.http.post(`${this.uri}/korisnici/registracija`, data);

  }

  dodajZahtevRegistracije(slika, ime, prezime, kor_ime, lozinka, tip, grad, datum_rodjenja, telefon, mejl, oglasivactip = null, agencija = null, br_licence = null) {


    const data = {
      slika: slika,
      ime: ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      tip: tip,
      grad: grad,
      datum_rodjenja: datum_rodjenja,
      telefon: telefon,
      mejl: mejl,
      oglasivactip: oglasivactip,
      agencija: agencija,
      br_licence: br_licence,
    }
    return this.http.post(`${this.uri}/zahtevi_registracije/dodaj`, data);

  }

  /*
    dohvatiNeodobreneNeodbijeneKorisnike() {
      return this.http.get(`${this.uri}/korisnici/dohvati_neodobrene_neodbijene`);
    }
  
  */

  dohvatiPoIdServ(id) {
    const podaci = {
      id: id
    }
    return this.http.post(`${this.uri}/korisnici/dohvatiPoId`, podaci);
  }

  /*
  odobriKorServ(id) {
    const podaci = {
      id: id
    }
    return this.http.post(`${this.uri}/korisnici/odobri`, podaci);
  }

  odbijKorServ(id) {
    const podaci = {
      id: id
    }
    return this.http.post(`${this.uri}/korisnici/odbij`, podaci);
  }
*/
  promenaLozinkeServ(id, nova) {
    const podaci = {
      id: id,
      nova: nova
    }
    return this.http.post(`${this.uri}/korisnici/promenaLozinke`, podaci);
  }

  dohvatiZahteveRegServ() {

    return this.http.get(`${this.uri}/zahtevi_registracije/dohvati`);
  }

  odbijZahtevRegServ(id) {
    const podaci = {
      id: id
    }
    return this.http.post(`${this.uri}/zahtevi_registracije/odbij`,podaci);
  }


  dohvatiRegistracijuPoKorLoz(kor_ime, lozinka) {

    const podaci = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/zahtevi_registracije/dohvatiPoKorLoz`, podaci);

  }

  izmeniPodatkeServ(id:number,telefon: number, mejl: string, agencija: string,br_licence:number) {

    const podaci = {
      id:id,
      telefon: telefon,
      mejl: mejl,
      agencija: agencija,
      br_licence:br_licence
    }
    return this.http.post(`${this.uri}/korisnici/izmeniLicnePodatke`,podaci);

  }


}
