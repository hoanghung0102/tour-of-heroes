import {
  Component,
  ComponentFactoryResolver,
  InjectionToken, Injector,
  Input, OnDestroy, OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-dynamic-instant-component',
  template: `<ng-container #containerRef></ng-container>`
})

export class DynamicComponentFactoryModule implements OnInit, OnDestroy {

  @Input() blockToken: InjectionToken<Type<any>>;
  @Input() entity: Object;
  @ViewChild('containerRef', {read: ViewContainerRef})
  private containerRef: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector) {}

  ngOnInit(): void {
    this.createComponent();
  }

  ngOnDestroy(): void {
    this.containerRef.clear();
  }

  private createComponent() {
    this.containerRef.clear();
    const entryComponent = this.injector.get<Type<any>>(this.blockToken);
    const component = this.resolver.resolveComponentFactory(entryComponent);
    const componentRef = this.containerRef.createComponent(component);
    // Assign data to component
    componentRef.instance.entity = this.entity;
  }
}
