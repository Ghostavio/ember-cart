import Ember from 'ember';
import Model from 'ember-data/model';
import attr from "ember-data/attr";
import { belongsTo } from "ember-data/relationships";

export default Model.extend({
  description : attr('string'),
  color       : attr('string'),
  image       : attr('string'),
  price       : attr('string'),
  stock       : attr(),
  total       : Ember.computed(function() { return this.get('stock.remaining'); }),
  product     : belongsTo('cart'),
  isAdded     : attr('boolean', { defaultValue: false }),
  quantity    : attr('number') //workaround for the cart loop issue
});
