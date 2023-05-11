import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaqComponent } from './daq.component';

describe('DaqComponent', () => {
  let component: DaqComponent;
  let fixture: ComponentFixture<DaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaqComponent]
    });
    fixture = TestBed.createComponent(DaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
