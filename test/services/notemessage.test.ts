import app from '../../src/app';

describe('\'notemessage\' service', () => {
  it('registered the service', () => {
    const service = app.service('notemessage');
    expect(service).toBeTruthy();
  });
});
