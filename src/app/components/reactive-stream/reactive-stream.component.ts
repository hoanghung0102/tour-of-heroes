import { Component, OnInit } from '@angular/core';
import {Hero} from "../../entity/hero";
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: 'app-reactive-stream',
  templateUrl: './reactive-stream.component.pug',
  styleUrls: ['./reactive-stream.component.scss']
})
export class ReactiveStreamComponent implements OnInit {

  private hero: Hero;

  private followHeroChgn: any;

  constructor(hero: Hero) {
    this.hero.name = "hung";
    this.followHeroChgn = new Observable<Hero>();
    this.followHeroChgn.sub;
  }

  ngOnInit() {
  }

}
