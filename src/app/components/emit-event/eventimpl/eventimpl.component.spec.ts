import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventimplComponent } from './eventimpl.component';

describe('EventimplComponent', () => {
  let component: EventimplComponent;
  let fixture: ComponentFixture<EventimplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventimplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventimplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
