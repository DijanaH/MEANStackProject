import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OmiljenaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dodaj(idKupca,idOgll) {

    let idOgl = String(idOgll);
      
    const podaci = {
      idKupca:idKupca,
      idOgl:idOgl
    }
    
    return this.http.post(`${this.uri}/omiljene/dodaj`, podaci);
  }

  dohvati(idKupca){
    let podaci = {
      idKupca:idKupca
    }
    return this.http.post(`${this.uri}/omiljene/dohvati`, podaci);

  }


  ukloni(idKupca:number,idOgll:number){

    let idOgl = String(idOgll)

    const podaci={
      idKupca:idKupca,
      idOgl:idOgl

    }
    
    return this.http.post(`${this.uri}/omiljene/ukloni`, podaci);
  }



}
