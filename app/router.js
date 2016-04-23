import Ember from 'ember';
import config from './config/environment';
import injectService from 'ember-service/inject';

const { get, run } = Ember;

const Router = Ember.Router.extend({
  location: config.locationType,
  metrics: injectService(),
  fastboot: injectService(),

  didTransition() {
    this._super(...arguments);
    if (!get(this, 'fastboot.isFastBoot')) {
      window.scrollTo(0, 0);
      this._trackPage();
    }
  },

  _trackPage() {
    run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      get(this, 'metrics').trackPage('GoogleAnalytics', {
        title: title,
        page: page
      });
    });
  }
});

Router.map(function() {
  this.route('product', { path: '/product/:id' });
});

export default Router;
