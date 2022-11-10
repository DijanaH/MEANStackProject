import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencijaService } from '../agencija.service';
import { KorisnikService } from '../korisnik.service';
import { Agencija } from '../models/agencija';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korisnikServ: KorisnikService, private router: Router, private agencijaServ: AgencijaService) { }

  sveagencije: Agencija[];


  ime: string;
  prezime: string;
  kor_ime: string;
  lozinka: string;
  potvrda_lozinke: string;
  grad: string;
  datum_rodjenja: string;
  slika: string;
  telefon: string;
  mejl: string;
  agencija: string;
  br_licence: string;
  tip: string;
  oglasivactip: string;

  foto: string;

  cap: string;
  //message: string;
  notrobot: string;

  poruka: string;

  ngOnInit(): void {
    this.postavisvenanull();
    this.cap = this.generisiCaptcha();
    this.agencijaServ.dohvSveServ().subscribe((agencije: Agencija[]) => {
      this.sveagencije = agencije;
    })
  }


  generisiCaptcha(): string {
    var x = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var a = x[Math.floor(Math.random() * x.length)];
    var b = x[Math.floor(Math.random() * x.length)];
    var c = x[Math.floor(Math.random() * x.length)];
    var d = x[Math.floor(Math.random() * x.length)];
    var e = x[Math.floor(Math.random() * x.length)];
    var f = x[Math.floor(Math.random() * x.length)];

    return a + b + c + d + e + f;

  }

  reloadCaptcha() {
    this.cap = this.generisiCaptcha();

  }

  areyouRobot() {
    if (this.cap == this.notrobot)
      return false;
    else
      return true;
  }


  registracija() {

    if (!this.foto || !this.ime || !this.prezime || !this.kor_ime || !this.lozinka || !this.potvrda_lozinke || !this.grad || !this.datum_rodjenja || !this.telefon || !this.mejl || !this.tip) {
      this.poruka = "! Popunite sva polja";
      return;
    }

    if (this.tip == "oglasivac") {
      if (!this.oglasivactip) {
        this.poruka = "! Popunite sva polja";
        return;
      }
      else {
        if (this.oglasivactip == "agent") {
          if (!this.agencija || !this.br_licence) {
            this.poruka = "! Popunite sva polja";
            return;
          }
        }
      }
    }




    if (this.lozinka != this.potvrda_lozinke) {
      this.poruka = "! Lozinka i potvrda lozinke se ne podudaraju"
      return;
    }

    if (this.areyouRobot()) {
      this.poruka = "Neuspesna robot verifikacija";
      return;
    }


    let fileinput = <HTMLInputElement>document.getElementById("idfoto");
    let file = fileinput.files;

    if (file.length != 1) {
      this.poruka = "! Dozvoljena je jedna fotografija"
      return;
    } else {
      this.slika = file.item(0).name;
    }

    let nijejedinstveno = false;
    this.korisnikServ.dohvatiSveService().subscribe((svikorisnici: Korisnik[]) => {

      for (var n in svikorisnici) {
        if (svikorisnici[n].kor_ime == this.kor_ime) {
          this.poruka = "! Korisnicko ime vec postoji";
          nijejedinstveno = true;
        }

      }
      if (!nijejedinstveno) {


        this.korisnikServ.jedinstvenMejlServ(this.mejl).subscribe((res) => {
          if (res['message'] == "jeste") {

            if (this.tip == "administrator") {
              this.korisnikServ.registracijaService(this.slika, this.ime, this.prezime, this.kor_ime, this.lozinka, this.tip, this.grad, new Date(this.datum_rodjenja), parseInt(this.telefon), this.mejl, this.oglasivactip, this.agencija, parseInt(this.br_licence)).subscribe((res) => {
                if (res['message'] == 'korisnik registrovan') {
                  alert('Uspesno ste registrovani kao administrator');
                  localStorage.clear();
                  this.router.navigate(['prijava'])


                } else alert('Greska pri registraciji')
              })
            } else {
              this.korisnikServ.dodajZahtevRegistracije(this.slika, this.ime, this.prezime, this.kor_ime, this.lozinka, this.tip, this.grad, new Date(this.datum_rodjenja), parseInt(this.telefon), this.mejl, this.oglasivactip, this.agencija, parseInt(this.br_licence)).subscribe(res => {
                if (res['message'] == 'zahtev dodat') {
                  alert('Zahtev za registraciju je poslat');
                  this.postavisvenanull();
                  localStorage.clear();
                  this.router.navigate(['prijava'])

                } else alert('Greska pri slanju zahteva za registraciju')
              })

            }

          }
          else {
            this.poruka = "! Mejl vec postoji"
            return;
          }
        })



      }

    })


  }


  nazad() {
    localStorage.clear;
    this.router.navigate(['/prijava']);
  }


  postavisvenanull() {
    this.ime = null;
    this.prezime = null;
    this.kor_ime = null;
    this.lozinka = null;
    this.potvrda_lozinke = null;
    this.grad = null;
    this.datum_rodjenja = null;
    this.slika = null;
    this.telefon = null;
    this.mejl = null;
    this.agencija = null;
    this.br_licence = null;
    this.tip = null;
    this.oglasivactip = null;

    this.foto = null;
  }
}
