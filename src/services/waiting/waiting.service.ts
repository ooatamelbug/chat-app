// Initializes the `waiting` service on path `/waiting`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Waiting } from './waiting.class';
import createModel from '../../models/waiting.model';
import hooks from './waiting.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'waiting': Waiting & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    lean: true,
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/waiting', new Waiting(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('waiting');

  service.hooks(hooks);
}
