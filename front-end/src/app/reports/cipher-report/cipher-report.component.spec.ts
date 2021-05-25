import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CipherReportComponent } from './cipher-report.component';

describe('CipherReportComponent', () => {
  let component: CipherReportComponent;
  let fixture: ComponentFixture<CipherReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CipherReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CipherReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
