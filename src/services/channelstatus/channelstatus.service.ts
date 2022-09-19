// Initializes the `channelstatus` service on path `/channelstatus`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Channelstatus } from './channelstatus.class';
import createModel from '../../models/channelstatus.model';
import hooks from './channelstatus.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'channelstatus': Channelstatus & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/channelstatus', new Channelstatus(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('channelstatus');

  service.hooks(hooks);
}
