import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Hero} from "../../../entity/hero";

@Component({
  selector: 'app-emitevent',
  templateUrl: './emitevent.component.pug',
  styleUrls: ['./emitevent.component.scss']
})
export class EmiteventComponent {

  @Input() hero: Hero;
  @Input() bgColor: string;
  @Output() inactiveRemainHero = new EventEmitter<Hero>();

  constructor() {}

  onmousemoveCursor() {
    this.inactiveRemainHero.emit(this.hero);
  }
}
