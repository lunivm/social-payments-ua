import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidActionsComponent } from './paid-actions.component';

describe('PaidActionsComponent', () => {
  let component: PaidActionsComponent;
  let fixture: ComponentFixture<PaidActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
