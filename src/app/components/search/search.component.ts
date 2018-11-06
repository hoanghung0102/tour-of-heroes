import { Component, OnInit } from '@angular/core';
import {HeroService} from "../../service/hero.service";
import {Hero} from "../../entity/hero";
import {Subject} from "rxjs/internal/Subject";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.pug',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  heroes :  Hero[];

  searchText: string = "";

  searchTerms = new Subject<string>();

  constructor(private service: HeroService) { }

  ngOnInit() {

    this.searchTerms.subscribe(
      () => {
        this.service.searchHeroes(this.searchTerms)
          .subscribe(heroes => {
            this.heroes = heroes
          })
      }
    )
  }

  searchTextChange(term : string) {
      this.searchTerms.next(term);
  }
}
