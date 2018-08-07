import { Component, OnInit } from '@angular/core';
import { Hero } from "../../entity/hero";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.pug',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  private heroes: Hero[] = [];

  constructor() { }

  ngOnInit() {}

}
