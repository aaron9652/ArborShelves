import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCLstPage } from './box-clst.page';

describe('BoxCLstPage', () => {
  let component: BoxCLstPage;
  let fixture: ComponentFixture<BoxCLstPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxCLstPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxCLstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
