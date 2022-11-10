import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KupacComponent } from './kupac/kupac.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { PrihvatanjeKorisnikaComponent } from './prihvatanje-korisnika/prihvatanje-korisnika.component';
import { IzmenaKorisnikaComponent } from './izmena-korisnika/izmena-korisnika.component';
import { DodavanjeAgencijeComponent } from './dodavanje-agencije/dodavanje-agencije.component';
import { DodavanjeMikrolokacijeComponent } from './dodavanje-mikrolokacije/dodavanje-mikrolokacije.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DetaljiNekretnineComponent } from './detalji-nekretnine/detalji-nekretnine.component';
import { OmiljeneNekretnineComponent } from './omiljene-nekretnine/omiljene-nekretnine.component';
import { OglasivacComponent } from './oglasivac/oglasivac.component';
import { UnosNekretnineComponent } from './unos-nekretnine/unos-nekretnine.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { PretrazivanjeOglasaComponent } from './pretrazivanje-oglasa/pretrazivanje-oglasa.component';
import { OglasivacNekretnineComponent } from './oglasivac-nekretnine/oglasivac-nekretnine.component';
import { NaprednoPretrazivanjeComponent } from './napredno-pretrazivanje/napredno-pretrazivanje.component';
import { LicniPodaciComponent } from './licni-podaci/licni-podaci.component';



@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    RegistracijaComponent,
    KupacComponent,
    AdministratorComponent,
    PrihvatanjeKorisnikaComponent,
    IzmenaKorisnikaComponent,
    DodavanjeAgencijeComponent,
    DodavanjeMikrolokacijeComponent,
    DetaljiNekretnineComponent,
    OmiljeneNekretnineComponent,
    OglasivacComponent,
    UnosNekretnineComponent,
    PromenaLozinkeComponent,
    PretrazivanjeOglasaComponent,
    OglasivacNekretnineComponent,
    NaprednoPretrazivanjeComponent,
    LicniPodaciComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
