import { TestBed } from '@angular/core/testing';

import { QuadroCrudService } from './quadro-crud.service';

describe('QuadroCrudService', () => {
  let service: QuadroCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuadroCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
