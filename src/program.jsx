require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {ProgramFetch} from './components/ProgramFetch.jsx';
import {ProgramsUnitsList} from './components/ProgramsUnitsList.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';
const staffUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/staff?_embed=true&per_page=50';
const requestUrls = [data, staffUrl];

const apiRequest1 = fetch(data).then(function(response) {
  return response.json()
});
const apiRequest2 = fetch(staffUrl).then(function(response) {
  return response.json()
});

class ProgramFetchApp extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: [],
      supervisorParts: [],
      staffAPI: [],
    };
  }
  componentWillMount() {
    let titleBlock = document.getElementById('dept-title');
    let program = titleBlock.getAttribute('data-id');
    let supervisor = titleBlock.getAttribute('supervisor-id');
    Promise.all([apiRequest1,apiRequest2]).then(values => {
      let filteredArray = [];
      let supervisorArray = [];
      let jasonData = values[0].info;
      let staffPages = values[1];
      values[0].info.map((info) => {
        if (supervisor.includes(info.email)) {
        supervisorArray.push(info);
        }
        else if(info.program === program) {
        filteredArray.push(info);
        }
      })

      function compare(a,b) { // function for sorting by array by last name
        let nameA = a.last.toUpperCase();
        let nameB = b.last.toUpperCase();
          if (nameA < nameB)
            return -1;
          if (nameA > nameB )
            return 1;
          return 0;
        }
      function supervisorUrlPull(soup){
        let soupEmail = soup + "@cases.org";
        for (let i = 0; i < staffPages.length; i++) {
          if (staffPages[i].acf.email == soupEmail) {
            return staffPages[i].link;
          }
        };
      }
      function supervisorNamePull(soup){
        let soupEmail = soup + "@cases.org";
        for (let i = 0; i < jasonData.length; i++) {
          if (jasonData[i].email == soupEmail) {
            return jasonData[i].first + " " + jasonData[i].last;
          }
        };
      }

      let sortedArray = filteredArray.sort(compare);
      sortedArray.forEach(function(item) {
        var result = staffPages.filter(function(staffItem) {
            return staffItem.acf.email === item.email;
        });
      item.url = (result[0] !== undefined) ? result[0].link : null;
      item.imageUrl = (result[0] !== undefined) ? result[0]._embedded['wp:featuredmedia'][0]['source_url'] : null;
      item.supervisorUrl = (result[0] !== undefined) ? supervisorUrlPull(item.supervisor) : null;
      item.supervisorName = (result[0] !== undefined) ? supervisorNamePull(item.supervisor) : null;
      });
      supervisorArray.forEach(function(item) {
        var result = staffPages.filter(function(staffItem) {
            return staffItem.acf.email === item.email;
        });
      item.url = (result[0] !== undefined) ? result[0].link : null;
      item.imageUrl = (result[0] !== undefined) ? result[0]._embedded['wp:featuredmedia'][0]['source_url'] : null;
      item.supervisorUrl = (result[0] !== undefined) ? supervisorUrlPull(item.supervisor) : null;
      item.supervisorName = (result[0] !== undefined) ? supervisorNamePull(item.supervisor) : null;
      });
      this.setState({parts: sortedArray});
      this.setState({supervisorParts: supervisorArray});
    });
  }
  render () {
    return (
      <div>
      <ProgramFetch supervisorParts={this.state.supervisorParts} parts={this.state.parts} />
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
