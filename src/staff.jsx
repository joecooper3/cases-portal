require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {StaffBreadcrumbs} from './components/StaffBreadcrumbs.jsx';
import {StaffFetch} from './components/StaffFetch.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/dummy.json';

class StaffBreadcrumbsApp extends React.Component {
  render () {
    return (
      <StaffBreadcrumbs />
    )
  }
}

class StaffFetchApp extends React.Component {
  render () {
    return (
      <div>
      <StaffFetch />
    </div>
    );
  }
}

render(<StaffBreadcrumbsApp/>, document.getElementById('staff-breadcrumbs'));
render(<StaffFetchApp/>, document.getElementById('app-area'));
