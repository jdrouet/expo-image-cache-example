import { createAction } from 'redux-actions';

export const constants = {
  start: 'status.start',
};

export const actions = {
  start: createAction(constants.start),
};
