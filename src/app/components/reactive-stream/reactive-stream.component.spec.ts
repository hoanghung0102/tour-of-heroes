import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveStreamComponent } from './reactive-stream.component';

describe('ReactiveStreamComponent', () => {
  let component: ReactiveStreamComponent;
  let fixture: ComponentFixture<ReactiveStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
