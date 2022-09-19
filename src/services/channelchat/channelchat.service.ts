// Initializes the `channelchat` service on path `/channelchat`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Channelchat } from './channelchat.class';
import createModel from '../../models/channelchat.model';
import hooks from './channelchat.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'channelchat': Channelchat & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/channelchat', new Channelchat(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('channelchat');

  service.hooks(hooks);
}
