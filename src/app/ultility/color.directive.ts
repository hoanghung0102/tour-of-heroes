import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnInit {
  @Input("appColor") color = "while";

  constructor(private renderer: Renderer2,
              private elElement: ElementRef) {}

  ngOnInit() {
    this.renderer.setStyle(this.elElement.nativeElement, 'background-color', this.color);
    console.log('directive work')
  }
}
