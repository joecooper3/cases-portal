require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {StaffBreadcrumbs} from './components/StaffBreadcrumbs.jsx';
import {StaffFetch} from './components/StaffFetch.jsx';
import {SearchBox} from './components/SearchBox.jsx'

const data = 'http://portal.cases.org/wp-content/themes/cases_portal/data/casescsv.json';
const staffUrl = 'http://portal.cases.org/wp-json/wp/v2/staff?_embed=true&per_page=50';
const deptUrl = 'http://portal.cases.org/wp-json/wp/v2/department?_embed=true&per_page=50';
const programUrl = 'http://portal.cases.org/wp-json/wp/v2/program?_embed=true&per_page=50';

const apiRequest1 = fetch(data).then(function(response) {
  return response.json()
});
const apiRequest2 = fetch(staffUrl).then(function(response) {
  return response.json()
});
const apiRequest3 = fetch(deptUrl).then(function(response) {
  return response.json()
});
const apiRequest4 = fetch(programUrl).then(function(response) {
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
class SearchBoxApp extends React.Component {
  constructor() {
    super();
    this.state = {
      searchParts: [],
      loaded: false
    };
  }
  componentWillMount() {
    Promise.all([apiRequest1,apiRequest2,apiRequest3,apiRequest4]).then(values => {
      let filteredArray = [];
      let jasonData = values[0].info;
      let staffPages = values[1];
      let deptPages = values[2];
      let programPages = values[3];
      function compareSearch(a,b) { // function for sorting by array by first name
        let nameA = a.first.toUpperCase();
        let nameB = b.first.toUpperCase();
          if (nameA < nameB)
            return -1;
          if (nameA > nameB )
            return 1;
          return 0;
        }
      let sortedArray = jasonData.sort(compareSearch);
      sortedArray.forEach(function(item) {
        var result = staffPages.filter(function(staffItem) {
            return staffItem.acf.email === item.email;
        });
      item.url = (result[0] !== undefined) ? result[0].link : null;
      });
      let deptProgArray = [];
      for (let i = 0; i < deptPages.length; i++) {
        deptProgArray.push({
          first: deptPages[i].title.rendered,
          last: '',
          type: 'dept',
          url: deptPages[i].link
        })
      }
      for (let i = 0; i < programPages.length; i++) {
        if (programPages[i].acf.acronym) {
        deptProgArray.push({
          first: programPages[i].title.rendered,
          last: "(" + programPages[i].acf.acronym + ")",
          type: 'program',
          url: programPages[i].link
        })
      }
      else {
        deptProgArray.push({
          first: programPages[i].title.rendered,
          last: '',
          type: 'program',
          url: programPages[i].link
        })
      }
      }
      let sortedArrayWithProgs = sortedArray.concat(deptProgArray);
      console.log(sortedArrayWithProgs)
      this.setState({searchParts: sortedArrayWithProgs});
      this.setState({loaded: true});
    });
  }

  render () {
    if (this.state.loaded === true) {
    return (
      <SearchBox data={this.state.searchParts} />
    );
  }
  else {
    return (
      <div role="search" className="sbx-custom__wrapper"></div>
    )
  }
  }
}

render(<StaffBreadcrumbsApp/>, document.getElementById('staff-breadcrumbs'));
render(<StaffFetchApp/>, document.getElementById('app-area'));
render(<SearchBoxApp/>, document.getElementById('particular-search'));
