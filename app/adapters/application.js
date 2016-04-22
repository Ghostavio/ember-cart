import RESTAdapter from 'ember-data/adapters/rest';

export default RESTAdapter.extend({
  // well we can use `host` because ember-data would add /products to
  // the end of the url, so we did a little workaround with buildURL :)
  // host: 'http://beta.json-generator.com/api/json/get/4kiDK7gxZ',
  buildURL: () => {
    return 'http://beta.json-generator.com/api/json/get/4kiDK7gxZ';
  }
});
