import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Oglas } from '../models/oglas';
import { Omiljena } from '../models/omiljena';
import { OglasService } from '../oglas.service';
import { OmiljenaService } from '../omiljena.service';

@Component({
  selector: 'app-omiljene-nekretnine',
  templateUrl: './omiljene-nekretnine.component.html',
  styleUrls: ['./omiljene-nekretnine.component.css']
})
export class OmiljeneNekretnineComponent implements OnInit {

  constructor(private ruter:Router, private omiljeneServ:OmiljenaService, private oglasServ:OglasService) { }

  ulogovan:Korisnik;

  omiljena:Omiljena;
  omiljenioglasi:Oglas[];



  omiljene:Oglas[];
  ngOnInit(): void {

   // this.omiljene = JSON.parse(localStorage.getItem("korpa"))
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));

    this.omiljenioglasi = [];

    this.omiljeneServ.dohvati(this.ulogovan.id).subscribe((omilj:Omiljena)=>{
      this.omiljena = omilj;

      for(var n in omilj.idOglasa){
        let oglas = parseInt(omilj.idOglasa[n].oglas);
        
        this.oglasServ.dohvOglasPoIdService(oglas).subscribe((ogl:Oglas)=>{
          this.omiljenioglasi.push(ogl);
        })
        
      }

    })

  }

  ukloni(IdOglas){

    this.omiljeneServ.ukloni(this.ulogovan.id,IdOglas).subscribe((res)=>{
      if(res['message']=="uklonjena") alert('uklonjena');
      this.omiljeneServ.dohvati(this.ulogovan.id).subscribe((omlj:Omiljena)=>{
        this.omiljenioglasi=null;
        this.omiljenioglasi=[];
        for(var n in omlj.idOglasa){
          let oglas = parseInt(omlj.idOglasa[n].oglas);
          
          this.oglasServ.dohvOglasPoIdService(oglas).subscribe((ogl:Oglas)=>{
            this.omiljenioglasi.push(ogl);
          })
          
        }
      })

    })



  }




  nazad(){
    let id = JSON.parse(localStorage.getItem("id"));
    let ruta = "/detalji_nekretnine/" + id;
    this.ruter.navigate([ruta])
  }
}
