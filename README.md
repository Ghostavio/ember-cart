# Ember-cart

When I received the assignment I was in doubt about either using Ember or React, and since I've been recently playing with Ember to check what has been released in the last iterations I decided to go with Ember first. After it's finished to port it to React should be possible in a few hours or so.

So for this mockup I started solely focusing on functionality and then later worked on the design.

This mockup is doing a request to the [API](http://beta.json-generator.com/api/json/get/4kiDK7gxZ) sent to me on the email and using `localStorage` for the cart.

I started doing a list of products but then I read the email again and noticed it was asking for a "grid" of products, so I reworked the design to better fit that description. Since the API doesn't provide a name for the product, I'm just truncating the description with the first words fitting 25 characters and using it as a name, I hope this isn't a problem.

At first I thought of doing a separated page for the cart, but soon realized a snippet approach would be more user friendly.

Apart from the requirements asked on the assignment, this mockup also implements a few more features:
* it's possible to alter the quantity of any given item in the cart, up to the limit in the stock
* deleting items from the cart/clearing cart button
* total sum of prices*quantities

### Nice improvements to make
* use [fastboot](https://www.ember-fastboot.com/) to do server side rendering
* implement simple front-end product search

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `npm install ember-cli -g` if you haven't already
* `git clone <repository-url>` this repository
* `cd ember-cart`
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

I'm deploying it to Heroku. It's extremely simple.

Of course you need a [Heroku account](https://www.heroku.com/) and [toolbelt](https://toolbelt.heroku.com/), then just follow the next steps from within you application folder:

```
heroku create <OPTIONAL_APP_NAME> --buildpack https://github.com/tonycoco/heroku-buildpack-ember-cli.git
```

And now just deploy using:

```
git push heroku master
```

You can see it live at http://ember-cart.herokuapp.com :)

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
