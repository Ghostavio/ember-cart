import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  sortProps: ['id'],
  sortedProducts: computed.sort('model.products', 'sortProps'),
  actions: {
    sortBy(val) {
      const { sortProps } = this;
      const first = sortProps.get('firstObject');
      sortProps.popObject(first);
      sortProps.pushObject(val);
    }
  }
});
