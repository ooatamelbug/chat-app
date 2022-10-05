// Initializes the `notemessage` service on path `/notemessage`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Notemessage } from './notemessage.class';
import createModel from '../../models/notemessage.model';
import hooks from './notemessage.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'notemessage': Notemessage & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    lean: true,
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/notemessage', new Notemessage(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('notemessage');

  service.hooks(hooks);
}
