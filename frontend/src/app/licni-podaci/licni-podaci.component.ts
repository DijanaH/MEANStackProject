import { Component, OnInit } from '@angular/core';
import { AgencijaService } from '../agencija.service';
import { KorisnikService } from '../korisnik.service';
import { Agencija } from '../models/agencija';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-licni-podaci',
  templateUrl: './licni-podaci.component.html',
  styleUrls: ['./licni-podaci.component.css']
})
export class LicniPodaciComponent implements OnInit {

  ulogovan: Korisnik;

  constructor(private korSer: KorisnikService, private agencijaServ:AgencijaService) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    this.agencijaServ.dohvSveServ().subscribe((agencije: Agencija[]) => {
      this.sveagencije = agencije;
    })
  }

  telefon: number;
  mejl: string;
  agencija: string;
  br_licence:number;

  poruka: string;

  sveagencije:Agencija[];

  izmeni() {
    if (!this.telefon && !this.mejl && !this.agencija) {
      this.poruka = "Nema podataka za izmenu";
      return;
    }

    this.korSer.jedinstvenMejlServ(this.mejl).subscribe((res) => {
      if (res['message'] == 'jeste') {

        this.korSer.izmeniPodatkeServ(this.ulogovan.id, this.telefon, this.mejl, this.agencija,this.br_licence).subscribe((res) => {
          if (res['message'] == "izmenjeno") alert("Uspesno izmenjeni podaci");

          if(this.br_licence){
            this.ulogovan.oglasivactip='agent';
            localStorage.setItem('ulogovan',JSON.stringify(this.ulogovan))
          }
          this.telefon=null;
          this.mejl = null;
          this.agencija=null;
          this.br_licence=null;

          
         // this.korSer.dohvatiPoIdServ(this.ulogovan.id).subscribe((kor:Korisnik)=>{
         //   localStorage.setItem('ulogovan',JSON.stringify(kor));
         // })
         // this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
        })

      }
      else{
        this.poruka="Mejl nije jedinstven na nivou sistema"
        return;
      }
    })



  }

}
