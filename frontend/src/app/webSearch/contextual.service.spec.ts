import {inject, TestBed} from '@angular/core/testing';

import {ContextualService} from './contextual.service';

describe('ContextualService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextualService]
    });
  });

  it('should be created', inject([ContextualService], (service: ContextualService) => {
    expect(service).toBeTruthy();
  }));
});
