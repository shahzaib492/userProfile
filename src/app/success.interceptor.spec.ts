import { TestBed } from '@angular/core/testing';

import { SuccessInterceptor } from './success.interceptor';

describe('SuccessInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SuccessInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SuccessInterceptor = TestBed.inject(SuccessInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
