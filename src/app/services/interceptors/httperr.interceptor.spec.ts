import { TestBed } from '@angular/core/testing';

import { HttperrInterceptor } from './httperr.interceptor';

describe('HttperrInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttperrInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttperrInterceptor = TestBed.inject(HttperrInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
