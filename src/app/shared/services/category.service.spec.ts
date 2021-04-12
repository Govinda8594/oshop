import { TestBed } from '@angular/core/testing';

import { CategoryService } from '../../shopping/components/shared/services/category.service';

describe('CategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });
});
