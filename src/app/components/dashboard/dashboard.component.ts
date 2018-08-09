import { Component, OnInit} from '@angular/core';
import {HeroService} from "../../service/hero.service";
import {Hero} from "../../entity/hero";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.pug',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getTop5HeroesServet();
  }

  private getTop5HeroesServet() {
    this.heroService.getHeroes()
      .subscribe(heroes =>  this.heroes = heroes.slice(0,4));
  }
}
