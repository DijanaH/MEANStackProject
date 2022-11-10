import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private korServ: KorisnikService, private ruter: Router) { }

  ulogovan: Korisnik;

  staralozinka: string;
  novalozinka: string;
  potvrdanovelozinke: string;

  poruka: string;
  potvrda: string;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
  }

  promeniLozinku() {
    this.potvrda = null;
    if (!this.staralozinka || !this.novalozinka || !this.potvrdanovelozinke) {
      this.poruka = "! Popunite sva polja"
      return;
    }
    if (this.ulogovan.lozinka != this.staralozinka) {
      this.poruka = "! Pogresno uneta stara lozinka";
      return;
    }
    if (this.novalozinka != this.potvrdanovelozinke) {
      this.poruka = "! Lozinka i potvrda lozinke se ne podudaraju";
      return;
    }
    this.korServ.promenaLozinkeServ(this.ulogovan.id, this.novalozinka).subscribe((mess: String) => {
      if (mess = "Uspesno promenja lozinka") {
        //  this.ulogovan.lozinka=this.novalozinka;
        alert("Uspesno ste promenili lozinku");
        this.odjava();
        //this.poruka=null;
        // this.novalozinka=null;
        //this.staralozinka=null;
        // this.potvrdanovelozinke=null; 
      }
      else this.poruka = "Doslo je do greske"
    })
  }

  odjava() {
    localStorage.clear;
    this.ruter.navigate([""]);
  }

}
