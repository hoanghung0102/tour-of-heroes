import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PagesComponent } from './pages/pages.component';
import { HeroComponent } from './components/heroes/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    FooterComponent,
    HeaderComponent,
    PagesComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
