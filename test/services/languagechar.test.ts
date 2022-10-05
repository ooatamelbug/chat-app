import app from '../../src/app';

describe('\'languagechar\' service', () => {
  it('registered the service', () => {
    const service = app.service('languagechar');
    expect(service).toBeTruthy();
  });
});
