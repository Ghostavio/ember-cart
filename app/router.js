import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  metrics: Ember.inject.service(),
  afterModel() {
    const metrics = Ember.get(this, 'metrics');

    metrics.activateAdapters([
      {
        name: 'GoogleAnalytics',
        environments: ['all'],
        config: {
          id: 'UA-52169675-4'
        }
      }
    ]);
  },

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('product', { path: '/product/:id' });
});

export default Router;
