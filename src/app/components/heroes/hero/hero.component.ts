import {Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {HeroService} from "../../../service/hero.service";
import {Hero} from "../../../entity/hero";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.pug',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  private id: string;

  private hero: Hero;

  constructor(private service: HeroService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    this.service.getHeroById(this.id)
      .subscribe(hero => this.hero = hero);
  }

  public onFormSubmitted(form: NgForm) {
    console.log(form);
  }
}
