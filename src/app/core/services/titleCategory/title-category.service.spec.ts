import { TestBed } from '@angular/core/testing';

import { TitleCategoryService } from './title-category.service';

describe('TitleCategoryService', () => {
  let service: TitleCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
