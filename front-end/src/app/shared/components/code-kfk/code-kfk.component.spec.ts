import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeKFKComponent } from './code-kfk.component';

describe('CodeKFKComponent', () => {
  let component: CodeKFKComponent;
  let fixture: ComponentFixture<CodeKFKComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeKFKComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeKFKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
