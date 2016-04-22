import Ember from 'ember';

export function toMoney(params) {
  let total;
  if (~navigator.userAgent.indexOf('Safari')) {
    total = `$${Number(params[0]).toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ",")}`;
  } else {
    total = `$${Number(params[0]).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }

  return total;
}

export default Ember.Helper.helper(toMoney);
