import app from '../../src/app';

describe('\'waiting\' service', () => {
  it('registered the service', () => {
    const service = app.service('waiting');
    expect(service).toBeTruthy();
  });
});
