import Ember from 'ember';

export function toMoney(params) {
  return `$${Number(params[0]).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

export default Ember.Helper.helper(toMoney);
