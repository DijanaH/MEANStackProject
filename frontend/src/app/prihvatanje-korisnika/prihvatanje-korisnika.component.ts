import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { ZahtevRegKorisnik } from '../models/zahtevReg';

@Component({
  selector: 'app-prihvatanje-korisnika',
  templateUrl: './prihvatanje-korisnika.component.html',
  styleUrls: ['./prihvatanje-korisnika.component.css']
})
export class PrihvatanjeKorisnikaComponent implements OnInit {


  constructor(private ruter: Router, private korServ: KorisnikService, private router: Router) { }

  neodobreni_korisnici: ZahtevRegKorisnik[];
  cekbox: boolean[];


  ngOnInit(): void {
    this.korServ.dohvatiZahteveRegServ().subscribe((neodobreni: ZahtevRegKorisnik[]) => {
      if (neodobreni) {
        this.neodobreni_korisnici = neodobreni;
        //     for(var n in neodobreni){
        //       this.neodobreni_korisnici[n].formatiran_datum = neodobreni[n].datum_rodjenja.toDateString();
        //     }
      }
      else {
        alert("Nema korisnika")
        this.router.navigate([""]);
      }
    })

  }


  prihvati() {
    for (var i in this.neodobreni_korisnici) {
      if (this.neodobreni_korisnici[i].admincekira == true) {
        let kor = this.neodobreni_korisnici[i];
        this.korServ.registracijaService(kor.slika, kor.ime, kor.prezime, kor.kor_ime, kor.lozinka, kor.tip, kor.grad, kor.datum_rodjenja, kor.telefon, kor.mejl, kor.oglasivactip, kor.agencija, kor.br_licence).subscribe((res) => {
          if (res['message'] == "korisnik registrovan") {
            alert("odobreni")
            this.korServ.odbijZahtevRegServ(kor.id).subscribe((response) => {
              if (response['message'] == "greska") alert('greska');
              else {
                this.korServ.dohvatiZahteveRegServ().subscribe((neodobreni: ZahtevRegKorisnik[]) => {
                  if (neodobreni) {
                    this.neodobreni_korisnici = neodobreni;
                  }
                  else {
                    alert("Nema korisnika")
                    this.router.navigate([""]);
                  }
                })
              }
            })
          }
        })
      }
    }
  }


  
  odbij(){
    for(var i in this.neodobreni_korisnici){
      if(this.neodobreni_korisnici[i].admincekira==true){
        let kor = this.neodobreni_korisnici[i];
        this.korServ.odbijZahtevRegServ(kor.id).subscribe((response) => {
          if (response['message'] == "greska") alert('greska');
          else {
            this.korServ.dohvatiZahteveRegServ().subscribe((neodobreni: ZahtevRegKorisnik[]) => {
              if (neodobreni) {
                this.neodobreni_korisnici = neodobreni;
              }
              else {
                alert("Nema korisnika")
                this.router.navigate([""]);
              }
            })
          }
        })
      }
    }
  }



}
