import { Directive, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPlaceHolder]'
})
export class PlaceholderDirective implements OnInit {

  @Output('appPlaceHolder')
  public enableSearch = new EventEmitter<boolean>(true);

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.adjustDomBehavior();
  }

  adjustDomBehavior(): void {
    const el = this.elementRef.nativeElement;

    this.renderer.setStyle(el, 'color', '#999');

    this.renderer.listen(el, 'focus', evt => {
      let value = el.value;
      let placeholder = el.placeholder;

      console.log('Run appPlaceHolder');
      console.log('Input value in Directive', value);

      if (!value || value === '' || value === placeholder) {
        this.renderer.setProperty(el, 'value', placeholder);
      } else {
        this.enableSearch.emit(value);
      }
    });
  }
}
