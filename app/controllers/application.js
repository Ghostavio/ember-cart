import Ember from 'ember';

export default Ember.Controller.extend({
  cartVisible: false,
  prices: Ember.computed('model.products.@each.quantity', function() {
    const arr = [];
    this.get('model').products.map((item) => {
      if (item.get('isAdded')) {
        const val = Number(item.get('price').substr(1).replace(',', ''));
        arr.pushObject(val * item.get('quantity'));
      }
    });
    return arr;
  }),
  total: Ember.computed.sum('prices'),
  actions: {
    showCart() {
      this.toggleProperty('cartVisible');
    },
    hideCart() {
      this.set('cartVisible', false);
    }
  }
});
