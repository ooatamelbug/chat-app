import app from '../../src/app';

describe('\'languagetype\' service', () => {
  it('registered the service', () => {
    const service = app.service('languagetype');
    expect(service).toBeTruthy();
  });
});
