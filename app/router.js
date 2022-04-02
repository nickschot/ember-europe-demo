import EmberRouter from '@ember/routing/router';
import config from 'ember-europe/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('css');
  this.route('modal');
  this.route('modal-css');
  this.route('modal-css-modifier');
});
