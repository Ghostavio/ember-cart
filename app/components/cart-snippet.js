import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['list-item'],
  actions: {
    update(item) {
      const product = this.model.products.store.peekRecord('product', item);
      const cartID = product.get('product').get('id');
      const cart = this.model.cart.store.peekRecord('cart', cartID);

      product.set('quantity', this.quantity);
      product.set('stock.remaining', product.get('total') - this.quantity);
      cart.set('quantity', this.quantity);
      cart.save();
    },
    remove(id) {
      const product = this.model.products.store.peekRecord('product', id);
      const cartID = product.get('product').get('id');
      const item = this.model.cart.store.peekRecord('cart', cartID);

      product.set('stock.remaining', product.get('total'));
      product.set('isAdded', false);
      product.set('quantity', undefined);

      item.deleteRecord();
      item.save();
    }
  }
});
