import Ember from 'ember';

export function toMoney(params) {
  return `$${Number(params[0]).toLocaleString()}`;
}

export default Ember.Helper.helper(toMoney);
