import Ember from 'ember';
import Model from 'ember-data/model';
import attr from "ember-data/attr";
import { belongsTo } from "ember-data/relationships";

const { computed } = Ember;

export default Model.extend({
  description : attr('string'),
  color       : attr('string'),
  image       : attr('string'),
  price       : attr('string'),
  stock       : attr(),
  total       : computed(function() {
    return this.get('stock.remaining');
  }),
  numberPrice : computed(function() {
    return Number(this.get('price').substr(1).replace(',', ''));
  }),
  product     : belongsTo('cart'),
  isAdded     : attr('boolean', { defaultValue: false }),
  quantity    : attr('number') //workaround for the cart loop issue
});
