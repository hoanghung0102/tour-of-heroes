import { Component, OnInit } from '@angular/core';
import {HeroService} from "../../service/hero.service";
import {Hero} from "../../entity/hero";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.pug',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  heroes : Hero[];

  constructor(private service: HeroService) { }

  ngOnInit() {
    this.service.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }
}
