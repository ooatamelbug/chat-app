import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import { softDelete } from 'feathers-hooks-common';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt'), softDelete() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
