// Initializes the `languagechar` service on path `/languagechar`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Languagechar } from './languagechar.class';
import createModel from '../../models/languagechar.model';
import hooks from './languagechar.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'languagechar': Languagechar & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    lean: true,
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/languagechar', new Languagechar(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('languagechar');

  service.hooks(hooks);
}
