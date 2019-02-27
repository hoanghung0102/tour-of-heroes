import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DynamicComponentModule } from './dynamic-component/dynamic-component.module';
import { RoutingModule } from './routing/routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PagesComponent } from './pages/pages.component';
import { HeroComponent } from './components/heroes/hero/hero.component';
import { ImMemoryDataService } from './service/im-memory-data.service'
import { TodoStoreService } from './service/todos-store.service';
import { ColorDirective } from './ultility/color.directive';
import { ReactiveFormsModule } from "@angular/forms";
import { SearchComponent } from './components/search/search.component';
import { EmiteventComponent } from './components/emit-event/emitevent/emitevent.component';
import { EventimplComponent } from './components/emit-event/eventimpl/eventimpl.component';
import { ReactiveStreamComponent } from './components/reactive-stream/reactive-stream.component';
import { AngFormComponent } from './components/ang-form/ang-form.component';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    FooterComponent,
    HeaderComponent,
    PagesComponent,
    HeroComponent,
    ColorDirective,
    SearchComponent,
    EmiteventComponent,
    EventimplComponent,
    ReactiveStreamComponent,
    AngFormComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DynamicComponentModule,
    HttpClientInMemoryWebApiModule.forRoot(
      ImMemoryDataService, {passThruUnknownUrl: true, dataEncapsulation: false}
    ),
    NgbModule.forRoot()
  ],
  providers: [TodoStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
