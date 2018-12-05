import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngFormComponent } from './ang-form.component';

describe('AngFormComponent', () => {
  let component: AngFormComponent;
  let fixture: ComponentFixture<AngFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
