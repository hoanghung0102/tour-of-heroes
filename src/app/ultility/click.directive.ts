import { Directive, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { contains } from '@shared/util/DOM';

/**
 Emit an object with 2 properties
 - isOutside: boolean
 - event: MouseEvent
 */
@Directive({
  selector: '[appClick]'
})
export class ClickDirective implements OnInit {
  @Output('appClick')
  public clickOutside = new EventEmitter<ClickEvent>();

  constructor(private _elRef: ElementRef,
              private _renderer: Renderer2) {
  }

  ngOnInit(): void {
    this._renderer.listen('document', 'click', event => this.clickOutside.emit({
      isOutside: !contains(this._elRef, event.target),
      event
    }));
  }
}

interface ClickEvent {
  isOutside: boolean;
  event: MouseEvent;
}
