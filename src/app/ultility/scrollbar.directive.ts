import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Directive({
  selector: '[appScrollbar]'
})
export class ScrollbarDirective implements OnDestroy {
  @Input('appScrollbar') options: PerfectScrollbar.Options;
  private changes: MutationObserver;
  private perfectScrollbar: PerfectScrollbar;
  private defaultOptions: PerfectScrollbar.Options = {
    wheelSpeed: 2,
    wheelPropagation: false,
    suppressScrollX: true
  };

  public constructor(private element: ElementRef) {
    const nativeEl = this.element.nativeElement;
    const perfectScrollbarOptions = Object.assign({}, this.defaultOptions, this.options);
    this.changes = new MutationObserver(() => {
      if (this.perfectScrollbar) {
        this.perfectScrollbar.update();
        nativeEl.scrollTop = 0;
      } else {
        this.perfectScrollbar = new PerfectScrollbar(nativeEl, perfectScrollbarOptions);
      }
    });

    this.changes.observe(nativeEl, {childList: true});
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}

