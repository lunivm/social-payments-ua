import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProgressBarComponent } from './main-progress-bar.component';

describe('MainProgressBarComponent', () => {
  let component: MainProgressBarComponent;
  let fixture: ComponentFixture<MainProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
