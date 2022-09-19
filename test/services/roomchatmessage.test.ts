import app from '../../src/app';

describe('\'roomchatmessage\' service', () => {
  it('registered the service', () => {
    const service = app.service('roomchatmessage');
    expect(service).toBeTruthy();
  });
});
