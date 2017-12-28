require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {DeptFetch} from './components/DeptFetch.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/dummy.json';

class DeptFetchApp extends React.Component {
  render () {
    return (
      <div>
      <DeptFetch />
    </div>
    );
  }
}

render(<DeptFetchApp/>, document.getElementById('app-area'));
