import app from '../../src/app';

describe('\'channelstatus\' service', () => {
  it('registered the service', () => {
    const service = app.service('channelstatus');
    expect(service).toBeTruthy();
  });
});
