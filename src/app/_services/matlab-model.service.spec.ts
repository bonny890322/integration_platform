import { TestBed } from '@angular/core/testing';

import { MatlabModelService } from './matlab-model.service';

describe('MatlabModelService', () => {
  let service: MatlabModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatlabModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
