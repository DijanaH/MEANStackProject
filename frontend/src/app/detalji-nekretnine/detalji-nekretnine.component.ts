import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencijaService } from '../agencija.service';
import { DetaljiNekretnineService } from '../detalji-nekretnine.service';
import { KarakteristikaService } from '../karakteristika.service';
import { KorisnikService } from '../korisnik.service';
import { Agencija } from '../models/agencija';
import { Detalji } from '../models/detaljinekretnine';
import { Karakteristika } from '../models/karakteristika';
import { Korisnik } from '../models/korisnik';
import { Oglas } from '../models/oglas';
import { Omiljena } from '../models/omiljena';
import { OglasService } from '../oglas.service';
import { OmiljenaService } from '../omiljena.service';

@Component({
  selector: 'app-detalji-nekretnine',
  templateUrl: './detalji-nekretnine.component.html',
  styleUrls: ['./detalji-nekretnine.component.css']
})
export class DetaljiNekretnineComponent implements OnInit {

  constructor(private ruta: ActivatedRoute, private oglasServ: OglasService, private korServ: KorisnikService,
    private agencijaServ: AgencijaService, private ruter: Router, private karakServ: KarakteristikaService,
    private detaljServ: DetaljiNekretnineService, private omiljeneServ: OmiljenaService) { }


  oglas: Oglas;
  oglasivac: Korisnik;
  agencija: Agencija;
  telefon: boolean;
  show: boolean;

  grad: string;
  opstina: string;
  mikrolokacija: string;
  cenaoglasapokvadratu: number;

  prosecnacena: number;
  trenutnaslika: string;

  karakteristika: Karakteristika;
  detalji: Detalji;

  ngOnInit(): void {

    this.karakteristika = new Karakteristika();

    let id = this.ruta.snapshot.paramMap.get('id');
    localStorage.setItem("id", JSON.parse(id));
    this.oglasServ.dohvOglasPoIdService(id).subscribe((oglas: Oglas) => {
      this.oglas = oglas;

      this.grad = oglas.lokacija.split(" - ")[0];
      this.opstina = oglas.lokacija.split(" - ")[1];
      this.mikrolokacija = oglas.lokacija.split(" - ")[2];
      this.cenaoglasapokvadratu = oglas.cena / oglas.kvadratura;

      this.trenutnaslika = oglas.fotografije[oglas.fotografije.length - 1];

      this.karakServ.dohvatipoIdOglasServ(oglas.id).subscribe((karakteristika: Karakteristika) => {
        this.karakteristika = karakteristika;
      })

      this.detaljServ.dohvatipoIdOglasServ(oglas.id).subscribe((detaljnek: Detalji) => {
        this.detalji = detaljnek;
      })

      this.korServ.dohvatiPoIdServ(oglas.oglasio).subscribe((kor: Korisnik) => {
        this.oglasivac = kor;
        this.agencijaServ.dohvPoNazivuServ(kor.agencija).subscribe((ag: Agencija) => {
          this.agencija = ag;
        })
      })
      this.prosecnacenaML(oglas.lokacija.split('-')[3] + oglas.lokacija.split('-')[4]);

    })


  }

  prikazitelefon() {
    this.telefon = !(this.telefon);
  }

  prosecnacenaML(mikrolokacija: String) {
    this.oglasServ.dohvatiSveServ().subscribe((svioglasi: Oglas[]) => {
      if (svioglasi) {

        let cena = 0;
        let i = 0;
        for (var n in svioglasi) {


          if ((svioglasi[n].lokacija.split('-')[3] + svioglasi[n].lokacija.split('-')[4]) == mikrolokacija) {
            cena += svioglasi[n].cena;
            i++;
          }

        }


        this.prosecnacena = cena / i;
      }
    })
  }

  dodajOmiljenu() {
    let message: string;
    let omiljene = new Oglas();
    omiljene = this.oglas;
    let vecdodata = false;

    let korpa: Oglas[] = [];
    if (localStorage.getItem('korpa') != null) {
      korpa = JSON.parse(localStorage.getItem('korpa'));
    }

    for (var n in korpa) {
      if (korpa[n].id == this.oglas.id) {
        vecdodata = true
        message = "Vec je dodato u omiljene"
      }
    }

    if (korpa.length >= 5) {
      message = "Preko 5"
    }

    if (!vecdodata && korpa.length < 5) {
      korpa.push(omiljene);
    }
    else alert(message)
    localStorage.setItem('korpa', JSON.stringify(korpa));

  }


  dodajO() {
    let kor = JSON.parse(localStorage.getItem('ulogovan'));
    let idKupca = kor.id;
    let idOglas = this.ruta.snapshot.paramMap.get('id');

    this.omiljeneServ.dohvati(idKupca).subscribe((omlj: Omiljena) => {

      if (omlj) {
        if (omlj.idOglasa.length >= 5) {
          alert('Ne moze preko 5 omiljenih!');
          return;
        }

        for (var n in omlj.idOglasa) {
          let k = omlj.idOglasa[n].oglas;
          if (k == idOglas) {
            alert("vec je dodata u omiljene");
            return;
          }
        }
      }


      this.omiljeneServ.dodaj(idKupca, idOglas).subscribe((res) => {
        if (res['message'] == "dodata") alert("Dodata u omiljene");
      })

    })






  }



  pregledajomiljene() {
    this.ruter.navigate(['/omiljene'])
  }

  nazad() {
    this.ruter.navigate(['/pretrazivanje_oglasa'])
  }



  izaberisliku(i) {
    this.trenutnaslika = this.oglas.fotografije[i];
  }

}
