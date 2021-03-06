import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {HeroesComponent} from "../components/heroes/heroes.component";
import {HeroComponent} from "../components/heroes/hero/hero.component";
import {PagesComponent} from "../pages/pages.component";
import {EventimplComponent} from "../components/emit-event/eventimpl/eventimpl.component";
import {AngFormComponent} from "../components/ang-form/ang-form.component";

// Create router list
const routers: Routes = [
  {path: '', redirectTo: '/main-page', pathMatch: 'full'},
  {path: 'main-page', component: PagesComponent},
  {path: 'dashboard', component:  DashboardComponent},
  {path: 'heroes', component:  HeroesComponent},
  {path: 'event-emit', component:  EventimplComponent},
  {path: 'hero-profile/:id', component: HeroComponent},
  {path: 'register', component: AngFormComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routers)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
