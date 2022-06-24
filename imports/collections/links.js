import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import validateUrl from 'valid-url';

const Links = new Mongo.Collection('links');

Meteor.methods({
  'links.insert': function (url) {
    check(
      url,
      Match.Where((url) => !!validateUrl.isUri(url))
    );
    // if above is true, we are here
    const token = Math.random().toString(36).slice(-5);
    Links.insert({ url, token, clicked: 0 });
  },
});

export { Links };
