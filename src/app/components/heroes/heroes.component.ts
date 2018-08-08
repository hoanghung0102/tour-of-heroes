import { Component, OnInit } from '@angular/core';
import { Hero } from "../../entity/hero";
import {HeroService} from "../../service/hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.pug',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private service: HeroService) {}

  ngOnInit() {
    this.fetchHeroes()
  }

  fetchHeroes() {
    this.service.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
