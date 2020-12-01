import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMobileManuComponent } from './popup-mobile-manu.component';

describe('PopupMobileManuComponent', () => {
  let component: PopupMobileManuComponent;
  let fixture: ComponentFixture<PopupMobileManuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupMobileManuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMobileManuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
