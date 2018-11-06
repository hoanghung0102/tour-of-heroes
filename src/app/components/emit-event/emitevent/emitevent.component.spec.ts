import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiteventComponent } from './emitevent.component';

describe('EmiteventComponent', () => {
  let component: EmiteventComponent;
  let fixture: ComponentFixture<EmiteventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmiteventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
