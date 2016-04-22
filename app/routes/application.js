import Ember from 'ember';

export default Ember.Route.extend({
  tracking: Ember.inject.service(),
  model() {
    return Ember.RSVP.hash({
      products : this.store.findAll('product'),
      cart     : this.store.findAll('cart')
    });
  },
  afterModel(model) {
    // here we set the `isAdded` boolean to true for the items already in the cart
    this.store.findAll('cart').then((data) => {
      data.map((item) => {
        const product = item.get('product');
        const id = product.content.currentState[0].id;
        const record = model.products.store.peekRecord('product', id);
        record.set('isAdded', true);
        record.incrementProperty('quantity', item.get('quantity'));
      });
    });
  },
  actions: {
    add(item) {
      // set `isAdded` boolean to true to hide the "Add to cart" button
      const product = this.store.peekRecord('product', item.get('id'));
      product.set('isAdded', true);
      product.incrementProperty('quantity', 1);

      // if we're at the product page, decrement 1 from the stock
      if (this.router.currentRouteName === 'product') {
        product.set('total', product.get('stock.remaining'));
        product.decrementProperty('stock.remaining', 1);
      }

      // add item to cart
      const cart = this.store.createRecord('cart', {});
      cart.get('product').addObject(product);

      // persists data onto localStorage
      cart.save();
    },
    checkout() {
      // clear the cart
      this.store.findAll('cart').then((data) => {
        data.map((item) => {
          const id = item.get('product').content.currentState[0].id;
          const product = this.store.peekRecord('product', id);

          product.set('isAdded', false);
          product.set('stock.remaining', product.get('total'));
          product.set('quantity', undefined);

          item.deleteRecord();
          item.save();
        });

        alert('You checked out successfully :)');
      });
    },
    error(error) {
      if (error) {
        return this.transitionTo('application-error');
      }
    }
  }
});
