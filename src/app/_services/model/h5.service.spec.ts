import { TestBed } from '@angular/core/testing';

import { H5Service } from './h5.service';

describe('H5Service', () => {
  let service: H5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(H5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
