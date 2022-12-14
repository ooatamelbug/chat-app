import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import afterMessage from '../../hooks/after-message';
import populateMessage from '../../hooks/populate-message';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populateMessage()],
    get: [populateMessage()],
    create: [],
    update: [afterMessage()],
    patch: [afterMessage()],
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
