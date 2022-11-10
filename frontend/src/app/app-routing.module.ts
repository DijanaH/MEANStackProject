import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { DetaljiNekretnineComponent } from './detalji-nekretnine/detalji-nekretnine.component';
import { DodavanjeAgencijeComponent } from './dodavanje-agencije/dodavanje-agencije.component';
import { DodavanjeMikrolokacijeComponent } from './dodavanje-mikrolokacije/dodavanje-mikrolokacije.component';
import { IzmenaKorisnikaComponent } from './izmena-korisnika/izmena-korisnika.component';
import { KupacComponent } from './kupac/kupac.component';
import { LicniPodaciComponent } from './licni-podaci/licni-podaci.component';
import { NaprednoPretrazivanjeComponent } from './napredno-pretrazivanje/napredno-pretrazivanje.component';
import { OglasivacNekretnineComponent } from './oglasivac-nekretnine/oglasivac-nekretnine.component';
import { OglasivacComponent } from './oglasivac/oglasivac.component';
import { OmiljeneNekretnineComponent } from './omiljene-nekretnine/omiljene-nekretnine.component';
import { PretrazivanjeOglasaComponent } from './pretrazivanje-oglasa/pretrazivanje-oglasa.component';
import { PrihvatanjeKorisnikaComponent } from './prihvatanje-korisnika/prihvatanje-korisnika.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { UnosNekretnineComponent } from './unos-nekretnine/unos-nekretnine.component';



const routes: Routes = [
  {path:"", component:PrijavaComponent},
  {path:"prijava",component:PrijavaComponent},
  {path:"kupac", component:KupacComponent},
  {path:"oglasivac",component:OglasivacComponent},
  {path:"registracija", component:RegistracijaComponent},
  {path:"administrator", component: AdministratorComponent},
  {path:"prihvatanje_korisnika", component: PrihvatanjeKorisnikaComponent},
  {path:"izmena_korisnika", component: IzmenaKorisnikaComponent},
  {path:"dodavanje_agencije", component: DodavanjeAgencijeComponent},
  {path:"dodavanje_mikrolokacije", component: DodavanjeMikrolokacijeComponent},
  {path:"detalji_nekretnine/:id", component:DetaljiNekretnineComponent},
  {path:"omiljene", component:OmiljeneNekretnineComponent},
  {path:"unos_nekretnine", component:UnosNekretnineComponent},
  {path:"promena_lozinke", component:PromenaLozinkeComponent},
  {path:"pretrazivanje_oglasa", component:PretrazivanjeOglasaComponent},
  {path:"oglasivac_nekretnine", component:OglasivacNekretnineComponent},
  {path:"napredno_pretrazivanje", component:NaprednoPretrazivanjeComponent},
  {path:"licni_podaci", component:LicniPodaciComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
