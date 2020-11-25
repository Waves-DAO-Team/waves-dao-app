import { TestBed } from '@angular/core/testing';

import { LinkContentService } from './link-content.service';

describe('LinkContentService', () => {
  let service: LinkContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
