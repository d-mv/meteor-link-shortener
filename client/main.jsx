import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Header from './components/header';
import LinkCreate from './components/link_create';

import { Links } from '../imports/collections/links';
import LinkList from './components/link_list';

const App = () => (
  <div>
    <Header />
    <LinkCreate />
    <LinkList />
  </div>
);
Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});
