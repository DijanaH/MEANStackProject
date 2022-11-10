import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { OglasService } from '../oglas.service';

@Component({
  selector: 'app-pretrazivanje-oglasa',
  templateUrl: './pretrazivanje-oglasa.component.html',
  styleUrls: ['./pretrazivanje-oglasa.component.css']
})
export class PretrazivanjeOglasaComponent implements OnInit {


  constructor(private router: Router, private oglasService: OglasService) { }

  korisnik: Korisnik;
  oglasi: Array<any>;

  pretraga_tip_nekretnine: string;
  pretraga_lokacija: string;
  pretraga_cena_do: number;
  pretraga_kvadratura_od: number;
  pretraga_min_br_soba: string;

  totalRecords: Number
  page: Number = 1;

  poruka: string[];

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));


  }

  izlogujSe() {
    localStorage.clear();
    this.router.navigate(["prijava"]);
  }



  pretrazi() {

    this.totalRecords = 0;
    this.oglasi = [];
    this.poruka = [];

    if (!this.pretraga_tip_nekretnine) {
      this.poruka.push("Morate izabrati bar tip nekretnine");
      return;
    }

    let pretr_minbrsoba:number;

    if (this.pretraga_min_br_soba == '5+') pretr_minbrsoba=5.1;
    else  pretr_minbrsoba = parseInt(this.pretraga_min_br_soba);
    

    if (this.pretraga_lokacija) {
      let lokacije = this.pretraga_lokacija.split(",");

      for (var n in lokacije) {
        lokacije[n] = lokacije[n].split('/').join(' - ');
        this.oglasService.pretraziService(this.pretraga_tip_nekretnine, lokacije[n], this.pretraga_cena_do, this.pretraga_kvadratura_od, pretr_minbrsoba).subscribe((data): void => {
          for (var i in data) {
            this.oglasi.push(data[i])
          }
          this.totalRecords += data.length;
        })
      }



    } else {
      this.oglasService.pretraziService(this.pretraga_tip_nekretnine, this.pretraga_lokacija, this.pretraga_cena_do, this.pretraga_kvadratura_od, pretr_minbrsoba).subscribe((data): void => {
        for (var i in data) {
          this.oglasi.push(data[i])
        }
        this.totalRecords += data.length;
      })

    }





  }

}
