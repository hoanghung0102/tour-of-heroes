import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeroService} from "../../../service/hero.service";
import {Hero} from "../../../entity/hero";
import {AfterViewInit} from "@angular/core/src/metadata/lifecycle_hooks";
import {EmiteventComponent} from "../emitevent/emitevent.component";

@Component({
  selector: 'app-eventimpl',
  templateUrl: './eventimpl.component.pug',
  styleUrls: ['./eventimpl.component.scss']
})
export class EventimplComponent implements OnInit, AfterViewInit {

  private heroes: Hero[];
  private bgColor: string;

  @ViewChild('container') containerRef: ElementRef;
  countCpn = new EmiteventComponent;

  /** Just for read-only properties */
  // get bgColor() {
  //   return "#232323";
  // }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getTop5HeroesServlet();
    this.bgColor = "#232323";
    console.log("Render when on init", this);
  }

  ngAfterViewInit() {
    console.log("Render when after viewInit", this);
    console.log("Count component", this.countCpn);
  }

  private getTop5HeroesServlet() {
    this.heroService.getHeroes()
      .subscribe(heroes =>  this.heroes = heroes.slice(0,4));
  }

  adjustedColorHero(obj: Hero) {
    console.log('Passed obj param', obj);
    console.log('Container', this.containerRef);
    console.log('background-color', this.bgColor);
    this.bgColor = '#' + Math.random().toString(16).slice(-6);
  }
}
