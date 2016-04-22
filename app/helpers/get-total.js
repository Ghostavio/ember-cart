import Ember from 'ember';

export function getTotal(params) {
  const calc = Number(params[0].substr(1).replace(',', '')) * Number(params[1]);
  let total;
  if (~navigator.userAgent.indexOf('Safari')) {
    total = `$${Number(calc).toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ",")}`;
  } else {
    total = `$${Number(calc).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }

  return total;
}

export default Ember.Helper.helper(getTotal);
