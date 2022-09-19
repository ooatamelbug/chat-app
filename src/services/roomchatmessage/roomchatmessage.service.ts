// Initializes the `roomchatmessage` service on path `/roomchatmessage`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Roomchatmessage } from './roomchatmessage.class';
import createModel from '../../models/roomchatmessage.model';
import hooks from './roomchatmessage.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'roomchatmessage': Roomchatmessage & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/roomchatmessage', new Roomchatmessage(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('roomchatmessage');

  service.hooks(hooks);
}
