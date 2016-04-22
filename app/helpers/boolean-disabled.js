import Ember from 'ember';

export function booleanDisabled(params) {
  if (params[0]) {
    return null;
  } else {
    return 'disabled';
  }
}

export default Ember.Helper.helper(booleanDisabled);
