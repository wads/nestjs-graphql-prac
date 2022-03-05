import { XsrfTokenInterceptor } from './xsrf-token.interceptor';

describe('XsrfTokenInterceptor', () => {
  it('should be defined', () => {
    expect(new XsrfTokenInterceptor()).toBeDefined();
  });
});
