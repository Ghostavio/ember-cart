import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      products : this.store.findAll('product'),
      cart     : this.store.findAll('cart'),
      sold     : this.store.findAll('sold')
    });
  },
  afterModel(model) {
    const getProduct = function(item) {
      const product = item.get('product');
      const id = product.content.currentState[0].id;
      const record = model.products.store.peekRecord('product', id);

      return record;
    };

    // here we set the `isAdded` boolean to true for the items already in the cart
    this.store.findAll('cart').then((data) => {
      data.map((item) => {
        const record = getProduct(item);
        record.set('isAdded', true);
        record.incrementProperty('quantity', item.get('quantity'));
      });
    });

    this.store.findAll('sold').then((data) => {
      data.map((item) => {
        const record = getProduct(item);
        const total = record.get('total') - item.get('quantity');

        record.setProperties({
          'stock.remaining' : total,
          'total'           : total,
          'outOfStock'      : total === 0,
          'isSold'          : true
        });
      });
    });
  },
  actions: {
    checkout() {
      // clear the cart
      this.store.findAll('cart').then((data) => {
        data.map((item) => {
          const id = item.get('product').content.currentState[0].id;
          const product = this.store.peekRecord('product', id);
          const total = product.get('total') - product.get('quantity');
          let sold;

          if (product.get('isSold')) {
            const soldID = product.get('sold').get('id');
            sold = this.store.peekRecord('sold', soldID);
          } else {
            sold = this.store.createRecord('sold', {});
          }

          sold.get('product').addObject(product);
          sold.incrementProperty('quantity', Number(product.get('quantity')));
          sold.save();

          product.setProperties({
            'isAdded'         : false,
            'isSold'          : true,
            'quantity'        : undefined,
            'stock.remaining' : total,
            'total'           : total,
            'outOfStock'      : total === 0,
          });

          item.deleteRecord();
          item.save();
        });

        alert('You checked out successfully :)');
      });
    }
  }
});
