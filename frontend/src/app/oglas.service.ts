import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OglasService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  pretraziService(tip_nekretnine, lokacija, cena_do, kvadratura_od, min_br_soba):Observable<any> {
    const podaci = {
      tip_nekretnine: tip_nekretnine,
      lokacija: lokacija,
      cena_do: cena_do,
      kvadratura_od: kvadratura_od,
      min_br_soba: min_br_soba
    }
    return this.http.post<any>(`${this.uri}/oglasi/pretrazi`, podaci);
  }

  dohvOglasPoIdService(id){
    const podaci = {
      id:id
    }

    return this.http.post(`${this.uri}/oglasi/dohvatiPoId`, podaci)
  }

  dohvatiPoOglasioServ(oglasio){
    const podaci = {
      oglasio:oglasio
    }

    return this.http.post(`${this.uri}/oglasi/dohvatiPoOglasio`, podaci)

  }
  dohvatiSveServ(){   
    return this.http.get(`${this.uri}/oglasi/dohvatiSve`)
  }

  prodatoServ(id){
    const podaci = {
      id:id
    }
    return this.http.post(`${this.uri}/oglasi/prodato`,podaci)
  }

  unosServ(oglasio,naziv,tip_nekretnine,lokacija,cena,kvadratura,broj_soba,spratnost,opis,prosecna_cena,fotografije){
    const podaci = {
      oglasio:oglasio,
      naziv:naziv,
      tip_nekretnine:tip_nekretnine,
      lokacija:lokacija,
      cena:cena,
      kvadratura:kvadratura,
      broj_soba:broj_soba,
      spratnost:spratnost,
      opis:opis,
      prosecna_cena:prosecna_cena,
      prodato:false,
      fotografije:fotografije
    }
    return this.http.post(`${this.uri}/oglasi/unos`,podaci)
  }

  postaviProsecnuCenuServ(lokacija, prosecna_cena){
    const podaci = {
      lokacija:lokacija,
      prosecna_cena:prosecna_cena
    }
    return this.http.post(`${this.uri}/oglasi/postavi_prosecnu_cenu`,podaci)
  }

  dohvatiPoslednjihPetServ(){
    return this.http.get(`${this.uri}/oglasi/dohvati_pet_poslednjih`)
  }

  pretrazinaprednoService(cenaod, cenado,kvadraturaod,kvadraturado,brojsobaod,brojsobado){
    const podaci = {
      cenaod:cenaod,
      cenado:cenado,
      kvadraturaod:kvadraturaod,
      kvadraturado:kvadraturado,
      brojsobaod:brojsobaod,
      brojsobado:brojsobado
    }
    return this.http.post(`${this.uri}/oglasi/pretrazi_napredno`, podaci);
  }

 
}
