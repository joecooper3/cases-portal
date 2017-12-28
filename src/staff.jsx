require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {StaffFetch} from './components/StaffFetch.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/dummy.json';

class StaffFetchApp extends React.Component {
  render () {
    return (
      <div>
      <StaffFetch />
    </div>
    );
  }
}

render(<StaffFetchApp/>, document.getElementById('app-area'));
