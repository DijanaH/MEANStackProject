import { Component, OnInit } from '@angular/core';
import { DetaljiNekretnineService } from '../detalji-nekretnine.service';
import { KarakteristikaService } from '../karakteristika.service';
import { Detalji } from '../models/detaljinekretnine';
import { Karakteristika } from '../models/karakteristika';
import { Oglas } from '../models/oglas';
import { OglasService } from '../oglas.service';

@Component({
  selector: 'app-napredno-pretrazivanje',
  templateUrl: './napredno-pretrazivanje.component.html',
  styleUrls: ['./napredno-pretrazivanje.component.css']
})
export class NaprednoPretrazivanjeComponent implements OnInit {

  constructor(private oglasService: OglasService, private detaljServ: DetaljiNekretnineService,
    private karServ: KarakteristikaService) { }

  konacno: Oglas[];

  rezultati: Oglas[];
  detaljirezultati: Detalji[];
  karakteristikerazultati: Karakteristika[];

  cenaod: string;
  cenado: string;
  kvadraturaod: string;
  kvadraturado: string;
  brojsobaod: string;
  brojsobado: string;

  godizgradnjeod: number;
  godizgradnjedo: number;
  oglasivac: string;
  stanje: string;
  tipgrejanja: string;
  spratod: number;
  spratdo: number;
  mesrezijeod: number;
  mesrezijedo: number;

  terasa: boolean;
  podrum: boolean;
  internet: boolean;
  lodja: boolean;
  garaza: boolean;
  interfon: boolean;
  francbalkon: boolean;
  basta: boolean;
  telefon: boolean;
  lift: boolean;
  klima: boolean;

  ngOnInit(): void {
  }


  pretrazi() {

    this.konacno = [];
    if (!this.cenado && !this.cenaod && !this.kvadraturado && !this.kvadraturaod && !this.brojsobado && !this.brojsobaod) {
      this.cenaod = "1";
    }
    if (!this.godizgradnjedo && !this.godizgradnjeod && !this.oglasivac && !this.stanje && !this.tipgrejanja && !this.spratdo && !this.spratod && !this.mesrezijedo && !this.mesrezijeod) {
      this.godizgradnjeod = 1;
    }

    this.oglasService.pretrazinaprednoService(parseInt(this.cenaod), parseInt(this.cenado), parseInt(this.kvadraturaod), parseInt(this.kvadraturado), parseInt(this.brojsobaod), parseInt(this.brojsobado)).subscribe((oglasi: Oglas[]) => {
      this.rezultati = oglasi;

      this.detaljServ.naprednopretrServ(this.godizgradnjeod, this.godizgradnjedo, this.oglasivac, this.stanje, this.tipgrejanja, this.spratod, this.spratdo, this.mesrezijeod, this.mesrezijedo).subscribe((det: Detalji[]) => {
        this.detaljirezultati = det;

        if (!this.terasa && !this.podrum && !this.internet && !this.lodja && !this.garaza && !this.interfon && !this.francbalkon && !this.basta && !this.telefon && !this.lift && !this.klima) {
          this.karServ.dohvatiSve().subscribe((karakteri: Karakteristika[]) => {
            this.karakteristikerazultati = karakteri;

            let d = [];
            for (var n in this.detaljirezultati) {
              d.push(this.detaljirezultati[n].idOglas)
            }

            let k = [];
            for (var n in this.karakteristikerazultati) {
              k.push(this.karakteristikerazultati[n].idOglas)
            }

            for (var n in this.rezultati) {
              if (d.some(x => x == this.rezultati[n].id)) {
                if (k.some(x => x == this.rezultati[n].id)) {
                  this.konacno.push(this.rezultati[n]);
                }

              }
            }

          })
        }
        else{
          this.karServ.pretrazi_naprednoServ(this.terasa, this.podrum, this.internet, this.lodja, this.garaza, this.interfon, this.francbalkon, this.basta, this.telefon, this.lift, this.klima).subscribe((karakteristike: Karakteristika[]) => {
            this.karakteristikerazultati = karakteristike;
  
  
            let d = [];
            for (var n in this.detaljirezultati) {
              d.push(this.detaljirezultati[n].idOglas)
            }
  
            let k = [];
            for (var n in this.karakteristikerazultati) {
              k.push(this.karakteristikerazultati[n].idOglas)
            }
  
  
            for (var n in this.rezultati) {
              if (d.some(x => x == this.rezultati[n].id)) {
                if (k.some(x => x == this.rezultati[n].id)) {
                  this.konacno.push(this.rezultati[n]);
                }
  
              }
            }
  
          })

        }
        

      })

    })
    


  }



  postavisvenanull(){
    
  this.cenaod=null;
  this.cenado=null;
  this.kvadraturaod=null;
  this.kvadraturado=null;
  this.brojsobaod=null;
  this.brojsobado=null;

  this.godizgradnjeod=null;
  this.godizgradnjedo=null;
  this.oglasivac=null;
  this.stanje=null;
  this.tipgrejanja=null;
  this.spratod=null;
  this.spratdo=null;
  this.mesrezijeod=null;
  this.mesrezijedo=null;

  this.terasa=null;
  this.podrum=null;
  this.internet=null;
  this.lodja=null;
  this.garaza=null;
  this.interfon=null;
  this.francbalkon=null;
  this.basta=null;
  this.telefon=null;
  this.lift=null;
  this.klima=null;
  
  }

}
