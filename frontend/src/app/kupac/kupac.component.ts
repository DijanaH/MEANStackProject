import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';





@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {

  
  constructor(private ruter:Router) { }

  ulogovan:Korisnik;
  ngOnInit(): void {
    this.ulogovan =JSON.parse(localStorage.getItem('ulogovan'));
  }


  izlogujSe(){
    localStorage.clear();
    this.ruter.navigate(["/prijava"])
  }

}
