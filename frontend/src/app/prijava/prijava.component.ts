import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Oglas } from '../models/oglas';
import { OglasService } from '../oglas.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private korService: KorisnikService, private router: Router, private oglasServ: OglasService) { }

  kor_ime: string;
  lozinka: string;
  poruka: string;

  poslednjihpet: Oglas[];


  ngOnInit(): void {
    this.oglasServ.dohvatiPoslednjihPetServ().subscribe((oglasi: Oglas[]) => {
      this.poslednjihpet = oglasi;

      for (var n in oglasi) {
        let rand = Math.floor(Math.random() * oglasi[n].fotografije.length);
        this.poslednjihpet[n].random_slika = oglasi[n].fotografije[rand];
      }

    })
  }

  prijava() {
    
    if (!this.kor_ime && !this.lozinka) {
      this.poruka = "Unesi podatke";
      return;
    }
    else if (!this.kor_ime) { this.poruka = "Unesi korisnicko ime"; return; }
    if (!this.lozinka) { this.poruka = "Unesi lozinku"; return; }

    this.korService.dohvatiRegistracijuPoKorLoz(this.kor_ime, this.lozinka).subscribe((kor: Korisnik) => {
      if (kor) {
        this.poruka = "Vas zahtev jos nije prihvacen";
        return;
      }
      else {

        this.korService.prijavaService(this.kor_ime, this.lozinka).subscribe((kor: Korisnik) => {
          if (kor) {
            localStorage.setItem('ulogovan', JSON.stringify(kor));
            switch (kor.tip) {
              case ("kupac"): {
                this.router.navigate(['pretrazivanje_oglasa']);
                break;
              }
              case ("administrator"): {
                this.router.navigate(["administrator"]);
                break;
              }
              case ("oglasivac"): {
                this.router.navigate(["oglasivac_nekretnine"]);
                break;
              }
              default: {
                this.router.navigate(['prijava'])
              }
            }
          }
          else {
            this.poruka = "Pogresno uneto korisnicko ime ili lozinka"
            this.router.navigate(['prijava'])
          }
    
        })

      }
    })

   

  }

}
