import app from '../../src/app';

describe('\'channelchat\' service', () => {
  it('registered the service', () => {
    const service = app.service('channelchat');
    expect(service).toBeTruthy();
  });
});
