import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.peekRecord('product', params.id);
  },
  afterModel(model) {
    const cartID = model.get('product').get('id');

    // here we decrement from the stock the quantity present of this item in the cart (if any)
    if (cartID) {
      this.store.find('cart', cartID).then((item) => {
        const record = model.store.peekRecord('product', model.get('id'));

        record.set('total', record.get('stock.remaining'));
        record.decrementProperty('stock.remaining', item.get('quantity'));
      });
    }
  },
});
