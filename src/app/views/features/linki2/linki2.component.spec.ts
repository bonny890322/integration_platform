import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Linki2Component } from './linki2.component';

describe('Linki2Component', () => {
  let component: Linki2Component;
  let fixture: ComponentFixture<Linki2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Linki2Component]
    });
    fixture = TestBed.createComponent(Linki2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
