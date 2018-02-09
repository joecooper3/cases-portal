require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {StaffBreadcrumbs} from './components/StaffBreadcrumbs.jsx';
import {StaffFetch} from './components/StaffFetch.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';
const staffUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/staff?_embed=true&per_page=50';
const requestUrls = [data, staffUrl];

const apiRequest1 = fetch(data).then(function(response) {
  return response.json()
});
const apiRequest2 = fetch(staffUrl).then(function(response) {
  return response.json()
});

class StaffBreadcrumbsApp extends React.Component {
  render () {
    return (
      <StaffBreadcrumbs />
    )
  }
}

class StaffFetchApp extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: [],
      supervisorParts: [],
      staffAPI: [],
    };
  }
  componentWillMount() {
    let titleBlock = document.getElementById('staff-title');
    let email = titleBlock.getAttribute('staff-email');
    Promise.all([apiRequest1,apiRequest2]).then(values => {
      let filteredArray = [];
      let jasonData = values[0].info;
      let staffPages = values[1];
      values[0].info.map((info) => {
        if(info.email === email) {
        filteredArray.push(info);
      }
    })
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
    filteredArray.forEach(function(item) {
      var result = staffPages.filter(function(staffItem) {
          return staffItem.acf.email === item.email;
      });
    item.url = (result[0] !== undefined) ? result[0].link : null;
    item.imageUrl = (result[0] !== undefined) ? result[0]._embedded['wp:featuredmedia'][0]['source_url'] : null;
    item.supervisorUrl = (result[0] !== undefined) ? supervisorUrlPull(item.supervisor) : null;
    item.supervisorName = (result[0] !== undefined) ? supervisorNamePull(item.supervisor) : null;
    });
    this.setState({parts: filteredArray});
  });
  }
  render () {
    return (
      <div>
      <StaffFetch parts={this.state.parts}/>
    </div>
    );
  }
}

render(<StaffBreadcrumbsApp/>, document.getElementById('staff-breadcrumbs'));
render(<StaffFetchApp/>, document.getElementById('app-area'));
