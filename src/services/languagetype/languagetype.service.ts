// Initializes the `languagetype` service on path `/languagetype`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Languagetype } from './languagetype.class';
import createModel from '../../models/languagetype.model';
import hooks from './languagetype.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'languagetype': Languagetype & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/languagetype', new Languagetype(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('languagetype');

  service.hooks(hooks);
}
