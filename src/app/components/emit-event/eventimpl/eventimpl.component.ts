import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeroService} from "../../../service/hero.service";
import {Hero} from "../../../entity/hero";

@Component({
  selector: 'app-eventimpl',
  templateUrl: './eventimpl.component.pug',
  styleUrls: ['./eventimpl.component.scss']
})
export class EventimplComponent implements OnInit {

  private heroes: Hero[];
  private bgColor: string;

  @ViewChild('container') containerRef: ElementRef;

  /** Just for read-only properties */
  // get bgColor() {
  //   return "#232323";
  // }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getTop5HeroesServet();
    this.bgColor = "#232323";
  }

  private getTop5HeroesServet() {
    this.heroService.getHeroes()
      .subscribe(heroes =>  this.heroes = heroes.slice(0,4));
  }

  adjustedColorHero(obj: Hero) {
    console.log('Passed obj param', obj);
    console.log('Container', this.containerRef);
    console.log('background-color', this.bgColor);
    this.bgColor = '#'+Math.random().toString(16).slice(-6);
  }
}
