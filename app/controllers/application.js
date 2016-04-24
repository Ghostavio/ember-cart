import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  cartVisible: false,
  prices: computed('model.products.@each.quantity', function() {
    const arr = [];
    this.get('model').products.map((item) => {
      if (item.get('isAdded')) {
        arr.pushObject(item.get('numberPrice') * item.get('quantity'));
      }
    });
    return arr;
  }),
  total: computed.sum('prices'),
  actions: {
    showCart() {
      this.toggleProperty('cartVisible');
    },
    hideCart() {
      this.set('cartVisible', false);
    }
  }
});
