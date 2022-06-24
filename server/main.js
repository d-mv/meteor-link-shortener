import ConnectRoute from 'connect-route';
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import { Links } from '../imports/collections/links';

function getAllLinks() {
  return Links.find({});
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  Meteor.publish('links', getAllLinks);
});

function onRoute(req, res, next) {
  const token = req.params.token;
  const link = Links.findOne({ token });
  if (link) {
    Links.update(link, { $inc: { clicked: 1 } });
    res.writeHead(307, { Location: link.url });
    res.end();
  } else next();
}

const middleware = ConnectRoute((router) => {
  router.get('/:token', onRoute);
});
WebApp.connectHandlers.use(middleware);
