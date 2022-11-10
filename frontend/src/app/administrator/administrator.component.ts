import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

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
