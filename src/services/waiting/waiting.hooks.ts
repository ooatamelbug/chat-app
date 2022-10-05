import { HooksObject } from '@feathersjs/feathers';
import * as validate from 'feathers-validate-joi';
import * as authentication from '@feathersjs/authentication';
import afterWaiting from '../../hooks/after-waiting';
import afterUpdateWaiting from '../../hooks/after-update-waiting';
import { createSchema } from './waiting.validation';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [validate.form(createSchema)],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [afterWaiting()],
    update: [afterUpdateWaiting()],
    patch: [afterUpdateWaiting()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
