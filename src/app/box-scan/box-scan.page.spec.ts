import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxScanPage } from './box-scan.page';

describe('BoxScanPage', () => {
  let component: BoxScanPage;
  let fixture: ComponentFixture<BoxScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxScanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
