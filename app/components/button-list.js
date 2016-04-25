import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  actions: {
    add(item) {
      const page = getOwner(this).lookup('controller:application').currentPath;
      let model;

      if (page === 'product') {
        model = this.model;
      } else {
        model = this.model.products;
      }

      // set `isAdded` boolean to true to hide the "Add to cart" button
      const product = model.store.peekRecord('product', item.get('id'));
      product.set('isAdded', true);
      product.incrementProperty('quantity', 1);


      // if we're at the product page, decrement 1 from the stock
      if (page === 'product') {
        product.set('total', product.get('stock.remaining'));
        product.decrementProperty('stock.remaining', 1);
      }

      // add item to cart
      const cart = model.store.createRecord('cart', {});
      cart.get('product').addObject(product);

      // persists data onto localStorage
      cart.save();
    },
  }
});
