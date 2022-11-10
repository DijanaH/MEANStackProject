import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Oglas } from '../models/oglas';
import { OglasService } from '../oglas.service';

@Component({
  selector: 'app-oglasivac',
  templateUrl: './oglasivac.component.html',
  styleUrls: ['./oglasivac.component.css']
})
export class OglasivacComponent implements OnInit {

  constructor(private oglasServ:OglasService, private ruter:Router) { }

  oglasi:Oglas[];
  ulogovan:Korisnik;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    this.oglasServ.dohvatiPoOglasioServ(this.ulogovan.id).subscribe((oglasi:Oglas[])=>{
      this.oglasi = oglasi;
    })
  }

  prodaj(o){
    o.prodato = true;
    this.oglasServ.prodatoServ(o.id).subscribe((mess:String)=>{
      if(mess = "prodato"){
        alert("Nekretnina je uspesno prodata");
      }
    })
  }

  izlogujSe(){
    localStorage.clear();
    this.ruter.navigate(['prijava']);
  }

}
