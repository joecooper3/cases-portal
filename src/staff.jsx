require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {StaffBreadcrumbs} from './components/StaffBreadcrumbs.jsx';
import {StaffFetch} from './components/StaffFetch.jsx';
import {SearchBox} from './components/SearchBox.jsx'

const APIHost = __API__;

const data = APIHost + '/wp-content/themes/cases_portal/data/casescsv.json';
const staffUrl = APIHost + '/wp-json/portal/v2/bigstaff/';
const deptUrl = APIHost + '/wp-json/wp/v2/department?_embed=true&per_page=100';
const programUrl = APIHost + '/wp-json/wp/v2/program?_embed=true&per_page=100';

const apiRequestJason = fetch(data).then(function(response) {
  return response.json();
});

const apiRequestStaff = fetch(staffUrl).then(function(response){
  return response.json();
});

const apiRequestDept = fetch(deptUrl).then(function(response) {
  return response.json();
});

const apiRequestProgram = fetch(programUrl).then(function(response) {
  return response.json();
});

const promiseArray = [apiRequestJason, apiRequestStaff, apiRequestDept, apiRequestProgram];

const masterData = Promise.all(promiseArray).then(values => {
  const titleBlock = document.getElementById('staff-title');
  const email = titleBlock.getAttribute('staff-email');
  let filteredArray = [];
  let jasonData = values[0].info;
  let staffPages = values[1];
  let deptPages = values[2];
  let programPages = values[3];
  jasonData.map((info) => {
    if(info.email === email) {
      filteredArray.push(info);
    }
  });
  function compareSearch(a,b) { // function for sorting by array by first name
    let nameA = a.first.toUpperCase();
    let nameB = b.first.toUpperCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB )
        return 1;
      return 0;
    }
    function supervisorUrlPull(soup){
      let soupEmail = soup + "@cases.org";
      for (let i = 0; i < staffPages.length; i++) {
        if (staffPages[i].email == soupEmail) {
          return staffPages[i].url;
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
  let sortedArray = filteredArray.sort(compareSearch);
  let sortedArraySearch = jasonData.sort(compareSearch);
  function dataMatcher(arr) {
    arr.forEach(function(item) {
      var result = staffPages.filter(function(staffItem) {
          return staffItem.email === item.email;
      });
    item.url = (result[0] !== undefined) ? result[0].url : null;
    item.imageUrl = (result[0] !== undefined && result[0].image !== undefined) ? result[0].image : 'http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg';
    item.supervisorUrl = (result[0] !== undefined) ? supervisorUrlPull(item.supervisor) : null;
    item.supervisorName = (result[0] !== undefined) ? supervisorNamePull(item.supervisor) : null;
    });
  }
  dataMatcher(sortedArray);
  dataMatcher(sortedArraySearch);
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

  //Get the data for the breadcrumbs
  let breadcrumbObject = {
    email: email,
    dept: sortedArray[0].department,
    program: sortedArray[0].program
  }

  function _removeSemicolon(inp) {
    return inp.replace("&#038;", "&").replace("&#8217;", "’");
  }

  function deptUrlPuller(name){
    let theUrl;
    deptPages.map((info) => {
    if (_removeSemicolon(info.title.rendered) === name) {
      theUrl = info.link;
    };
  });
  return theUrl;
  };
  function programUrlPuller(name){
    let theUrl;
    programPages.map((info) => {
    if (_removeSemicolon(info.title.rendered) === name) {
      theUrl = info.link;
    };
  });
  return theUrl;
  };

  if (breadcrumbObject.program === '') {
    breadcrumbObject.type = 'dept';
    breadcrumbObject.deptUrl = deptUrlPuller(breadcrumbObject.dept);
  }
  else {
    breadcrumbObject.type='program';
    breadcrumbObject.deptUrl = deptUrlPuller(breadcrumbObject.dept);
    breadcrumbObject.programUrl = programUrlPuller(breadcrumbObject.program);
  }
  //end breadcrumbs data code

  const final = {
    searchBox: sortedArraySearch.concat(deptProgArray),
    main: sortedArray,
    breadcrumb: breadcrumbObject
  };
  return final;
});


class StaffBreadcrumbsApp extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: {},
      loaded: false
    };
  }
  componentWillMount() {
    masterData.then(yeah => {
      this.setState({parts: yeah.breadcrumb});
      this.setState({loaded: true});
    });
  }
  render () {
    if (this.state.loaded) {
      return (
        <StaffBreadcrumbs data={this.state.parts} />
      );
    }
    else {
      return (<span></span>);
    }
  }
}

class StaffFetchApp extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: []
    };
  }
  componentWillMount() {
    masterData.then(yeah => {
      this.setState({parts: yeah.main});
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
    masterData.then(yeah => {
      this.setState({searchParts: yeah.searchBox});
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
