import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input('appTooltip') tooltip: NgbTooltip;
  @Input() onlyEllipsis: boolean;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.tooltip.container = 'body';
    this.tooltip.placement = 'top';
    this.tooltip.tooltipClass = 'prms-tooltip';
    this.tooltip.triggers = 'manual';
    this.adjustDomBehavior();
  }

  adjustDomBehavior(): void {
    const el = this.elementRef.nativeElement;

    this.renderer.setStyle(el, 'overflow', 'hidden');
    this.renderer.setStyle(el, 'text-overflow', 'ellipsis');
    this.renderer.setStyle(el, 'white-space', 'nowrap');
    this.renderer.setStyle(el, 'width', '100%');

    this.renderer.listen(el, 'mouseover', evt => {
      if (!this.onlyEllipsis || (evt.target.scrollWidth > evt.target.offsetWidth)) {
        this.tooltip.open();
      }
    });

    this.renderer.listen(el, 'mouseleave', () => this.tooltip.close());
  }
}
