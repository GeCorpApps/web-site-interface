import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalservererrorComponent } from './internalservererror.component';

describe('InternalservererrorComponent', () => {
  let component: InternalservererrorComponent;
  let fixture: ComponentFixture<InternalservererrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalservererrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalservererrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
