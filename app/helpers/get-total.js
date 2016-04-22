import Ember from 'ember';

export function getTotal(params) {
  const calc = Number(params[0].substr(1).replace(',', '')) * Number(params[1]);
  return `$${calc.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

export default Ember.Helper.helper(getTotal);
