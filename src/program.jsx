require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {ProgramFetch} from './components/ProgramFetch.jsx';
import {ProgramsUnitsList} from './components/ProgramsUnitsList.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/dummy.json';

class ProgramFetchApp extends React.Component {
  render () {
    return (
      <div>
      <ProgramFetch />
    </div>
    );
  }
}

class ProgramsUnitsListApp extends React.Component {
  render () {
    return (
      <ProgramsUnitsList />
    );
  }
}

render(<ProgramFetchApp/>, document.getElementById('app-area'));
render(<ProgramsUnitsListApp/>, document.getElementById('sec-holder-one'));
