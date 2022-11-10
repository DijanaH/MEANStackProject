import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetaljiNekretnineService } from '../detalji-nekretnine.service';
import { KarakteristikaService } from '../karakteristika.service';
import { Detalji } from '../models/detaljinekretnine';
import { Karakteristika } from '../models/karakteristika';
import { Korisnik } from '../models/korisnik';
import { Oglas } from '../models/oglas';
import { OglasService } from '../oglas.service';

@Component({
  selector: 'app-unos-nekretnine',
  templateUrl: './unos-nekretnine.component.html',
  styleUrls: ['./unos-nekretnine.component.css']
})
export class UnosNekretnineComponent implements OnInit {

  constructor(private oglasServ: OglasService, private ruter: Router, private karServ:KarakteristikaService,
    private detaljiServ:DetaljiNekretnineService) { }

  ulogovan: Korisnik;
  tip: string;
  naziv: string;
  lokacija: string;
  cena: string;
  kvadratura: string;
  br_soba: string;
  spratnost: string;
  opis: string;
  fotografije: string[];

  grad: string;
  opstina: string;
  mikrolokacija: string;

  poruka: string;


  karakteristika:Karakteristika;
  detaljinek:Detalji;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    this.karakteristika = new Karakteristika();
    this.detaljinek = new Detalji();
  }


  unesi() {

    if (!this.tip || !this.naziv || !this.lokacija || !this.cena || !this.kvadratura || !this.br_soba || !this.spratnost || !this.opis || !this.fotografije) {
      this.poruka = "Popunite sa polja";
      return;
    }

    if(!this.detaljinek.godinaizgradnje || !this.detaljinek.stanje || !this.detaljinek.tipgrejanja || !this.detaljinek.trsprat || !this.detaljinek.mesrezije){
      this.poruka = "Popunite sa polja";
      return;
    }

    if(!this.detaljinek.parking) this.detaljinek.parking = false;
    if(this.ulogovan.oglasivactip=="agent") this.detaljinek.oglasivac="agencija";
    else this.detaljinek.oglasivac="vlasnik";

    let br_reci = this.opis.split(" ");

    if (br_reci.length > 50) {
      this.poruka = "Opis do 50 reci"
      return;
    }

    let gomlokacija = this.lokacija.split('/');
    this.grad = gomlokacija[0];
    this.opstina = gomlokacija[1];
    this.mikrolokacija = gomlokacija[2];

    let bazalok = this.grad + " - " + this.opstina + " - " + this.mikrolokacija;

    let svioglasi: Oglas[];
    this.oglasServ.dohvatiSveServ().subscribe((oglasi: Oglas[]) => {
      svioglasi = oglasi;

      let ukupna_cena = parseInt(this.cena);
      let ukupna_kvadratura = parseInt(this.kvadratura);


      for (var n in svioglasi) {
        let mikrolokacija = svioglasi[n].lokacija.split(" - ")[2];
        if (mikrolokacija == this.mikrolokacija) {
          ukupna_cena += svioglasi[n].cena;
          ukupna_kvadratura += svioglasi[n].kvadratura;
        }
      }
      let prosecna_cena_po_kvadratu = ukupna_cena / ukupna_kvadratura;


      let oglasio = this.ulogovan.id;

      let s = "";
      let fileinput = (<HTMLInputElement>document.getElementById("idfotos"))
      let file = fileinput.files;

      if (file.length < 3) {
        alert("Bar tri slike")
        return;
      } else if (file.length > 6) {
        alert("Do 6 slika je dozvoljeno")
        return;
      }

      for (let k = 0; k < file.length; k++) {

        s += file.item(k).name;

        if (k + 1 < file.length) {
          s += ","
        }
      }

      this.fotografije = [];

      for (var n in s.split(',')) {
        this.fotografije.push(s.split(',')[n]);
      }

      
      let t = this.karakteristika.terasa;

      this.oglasServ.unosServ(oglasio, this.naziv, this.tip, bazalok, parseInt(this.cena), parseInt(this.kvadratura), parseInt(this.br_soba), parseInt(this.spratnost), this.opis, prosecna_cena_po_kvadratu, this.fotografije).subscribe((mess: String) => {
        if (mess = "Nekretnina uneta") {
          alert("Nekretnina je uspesno uneta");
          this.karServ.dodaj(this.karakteristika.terasa,this.karakteristika.podrum,this.karakteristika.internet,this.karakteristika.lodja,this.karakteristika.garaza,this.karakteristika.interfon,this.karakteristika.francbalkon,this.karakteristika.basta,this.karakteristika.telefon,this.karakteristika.lift,this.karakteristika.klima).subscribe((res)=>{
            //if(res["message"]=="dodata") alert('dodata');
          })
          this.detaljiServ.dodaj(this.detaljinek.oglasivac,this.detaljinek.godinaizgradnje,this.detaljinek.stanje,this.detaljinek.tipgrejanja,this.detaljinek.trsprat,this.detaljinek.parking,this.detaljinek.mesrezije).subscribe((res)=>{
            //if(res["message"]=="dodatDetalj") alert("OKDETALJ");
          })
          if(ukupna_cena>parseInt(this.cena)){
            this.oglasServ.postaviProsecnuCenuServ(bazalok,prosecna_cena_po_kvadratu).subscribe((res)=>{
              //if(res["message"]=="postavljena prosecna cena") alert("OK")
            })
          }
          this.tip = null;
          this.naziv = null;
          this.lokacija = null;
          this.cena = null;
          this.kvadratura = null;
          this.br_soba = null;
          this.spratnost = null;
          this.opis = null;
          this.fotografije = null;

          this.grad = null;
          this.opstina = null;
          this.mikrolokacija = null;

          this.poruka = '';

          this.detaljinek=new Detalji();
          this.karakteristika=new Karakteristika();
        }
      })
    })

  }

  nazad() {
    this.ruter.navigate(['/oglasivac'])
  }

}
