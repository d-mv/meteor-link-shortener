import React from 'react';
import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';

const PER_PAGE = 20;

export function LinkList({ isLoading, links }) {
  function renderRows() {
    return links.map(({ url, token, clicked }) => {
      const link = `http://localhost:3000/${token}`;
      return (
        <tr key={token}>
          <td>{url}</td>
          <td>
            <a href={link}>{link}</a>
          </td>
          <td>{clicked}</td>
        </tr>
      );
    });
  }
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>URL</th>
          <th>Address</th>
          <th>Clicks</th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('links', PER_PAGE);
  return {
    isLoading: subscription.ready(),
    links: Links.find({}).fetch(),
  };
})(LinkList);
