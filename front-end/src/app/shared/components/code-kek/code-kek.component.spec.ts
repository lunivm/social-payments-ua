import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeKEKComponent } from './code-kek.component';

describe('CodeKEKComponent', () => {
  let component: CodeKEKComponent;
  let fixture: ComponentFixture<CodeKEKComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeKEKComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeKEKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
