import { Component, OnInit } from '@angular/core';
import { AgencijaService } from '../agencija.service';

@Component({
  selector: 'app-dodavanje-agencije',
  templateUrl: './dodavanje-agencije.component.html',
  styleUrls: ['./dodavanje-agencije.component.css']
})
export class DodavanjeAgencijeComponent implements OnInit {

  constructor(private agencijaServ: AgencijaService) { }

  naziv:string;
  grad:string;
  adresa:string;
  telefon:string;
  pib:string;

  ngOnInit(): void {
  }


  dodaj(){
    this.agencijaServ.dodajServ(this.naziv,this.grad,this.adresa,parseInt(this.telefon),parseInt(this.pib)).subscribe((mess:string)=>{
      if(mess= "agencija dodata") alert ("OK")
    })
  }

}
