require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {DeptFetch} from './components/DeptFetch.jsx';
import {ProgramsUnitsList} from './components/ProgramsUnitsList.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';
const staffUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/staff?_embed=true&per_page=50';
const requestUrls = [data, staffUrl];

class DeptFetchApp extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: [],
      supervisorParts: []
    };
  }
  componentWillMount() {
    let titleBlock = document.getElementById('dept-title');
    let dept = titleBlock.getAttribute('data-id');
    let supervisor = titleBlock.getAttribute('supervisor-id');
    fetch(data).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        let filteredArray = [];
        let supervisorArray = [];
        data.info.map((info) => {
          if (supervisor.includes(info.email)) {
          supervisorArray.push(info);
          }
          else if(info.department === dept && info.program == "") {
          filteredArray.push(info);
        }
      })
      function compare(a,b) {
        let nameA = a.last.toUpperCase();
        let nameB = b.last.toUpperCase();
          if (nameA < nameB)
            return -1;
          if (nameA > nameB )
            return 1;
          return 0;
        }
      let sortedArray = filteredArray.sort(compare);
      this.setState({parts: sortedArray});
      this.setState({supervisorParts: supervisorArray});
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }

  render () {
    return (
      <div>
      <DeptFetch supervisorParts={this.state.supervisorParts} parts={this.state.parts} />
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

render(<DeptFetchApp/>, document.getElementById('app-area'));
render(<ProgramsUnitsListApp/>, document.getElementById('sec-holder-one'));
