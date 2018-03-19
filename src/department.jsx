require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {DeptFetch} from './components/DeptFetch.jsx';
import {ProgramsUnitsList} from './components/ProgramsUnitsList.jsx';
import {SearchBox} from './components/SearchBox.jsx'

const APIHost = __API__;

const data = APIHost + '/wp-content/themes/cases_portal/data/casescsv.json';
const staffUrl = APIHost + '/wp-json/wp/v2/staff?_embed=true&per_page=100';
const staffUrlNoPage = APIHost + '/wp-json/wp/v2/staff?_embed=true&per_page=100&page=';
const deptUrl = APIHost + '/wp-json/wp/v2/department?_embed=true&per_page=100';
const programUrl = APIHost + '/wp-json/wp/v2/program?_embed=true&per_page=100';

const apiRequestJason = fetch(data).then(function(response) {
  return response.json()
});

const totalPagesPromise = fetch(staffUrl).then(function(response){
  let total = response.headers.get('X-WP-TotalPages');
  return total;
});

const apiRequestDept = fetch(deptUrl).then(function(response) {
  return response.json()
});

const apiRequestProgram = fetch(programUrl).then(function(response) {
  return response.json()
});

const apiRequestLoop = function(arr, num) {
    let promiseArray = [num];
    promiseArray = promiseArray.concat(arr);
    for (let i = 1; i <= num; i++) {
      let staffUrlLoop = staffUrlNoPage + i;
      promiseArray.push(fetch(staffUrlLoop).then(response => response.json()));
    }
    return Promise.all(promiseArray);
}

class DeptFetchApp extends React.Component {
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
    let dept = titleBlock.getAttribute('data-id');
    let supervisor = titleBlock.getAttribute('supervisor-id');
    totalPagesPromise.then(num => {
      return apiRequestLoop([apiRequestJason], num);
    }).then(values => {
      let filteredArray = [];
      let supervisorArray = [];
      let totalPages = values[0];
      let jasonData = values[1].info;
      function combineWordpressQueries(arrs, num) {
        let startingPoint = arrs.length - num;
        let wpArray = [];
        for (let i = startingPoint; i < arrs.length; i++) {
          wpArray = wpArray.concat(arrs[i]);
        }
        return wpArray;
      }
      let staffPages = combineWordpressQueries(values, totalPages);
      jasonData.map((info) => {
        if (supervisor.includes(info.email)) {
        supervisorArray.push(info);
        }
        else if(info.department === dept && info.program == "") {
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
      item.imageUrl = (result[0] !== undefined && result[0]._embedded !== undefined) ? result[0]._embedded['wp:featuredmedia'][0]['source_url'] : 'http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg';
      item.supervisorUrl = (result[0] !== undefined) ? supervisorUrlPull(item.supervisor) : null;
      item.supervisorName = (result[0] !== undefined) ? supervisorNamePull(item.supervisor) : null;
      });
      supervisorArray.forEach(function(item) {
        var result = staffPages.filter(function(staffItem) {
            return staffItem.acf.email === item.email;
        });
      item.url = (result[0] !== undefined) ? result[0].link : null;
      item.imageUrl = (result[0] !== undefined && result[0]._embedded !== undefined) ? result[0]._embedded['wp:featuredmedia'][0]['source_url'] : 'http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg';

      item.supervisorUrl = (result[0] !== undefined) ? supervisorUrlPull(item.supervisor) : null;
      item.supervisorName = (result[0] !== undefined) ? supervisorNamePull(item.supervisor) : null;
      });
      this.setState({parts: sortedArray});
      this.setState({supervisorParts: supervisorArray});
    });
  }
  _removeSemicolon(inp) {
    return inp.replace("&#038;", "&").replace("&#8217;", "’");
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

class SearchBoxApp extends React.Component {
  constructor() {
    super();
    this.state = {
      searchParts: [],
      loaded: false,
      loaded2: false
    };
  }
  componentWillMount() {
    totalPagesPromise.then(num => {
      return apiRequestLoop([apiRequestJason,apiRequestDept,apiRequestProgram], num);
    }).then(values => {
      let filteredArray = [];
      let totalPages = values[0];
      let jasonData = values[1].info;
      let deptPages = values[2];
      let programPages = values[3];
      function combineWordpressQueries(arrs, num) {
        let startingPoint = arrs.length - num;
        let wpArray = [];
        for (let i = startingPoint; i < arrs.length; i++) {
          wpArray = wpArray.concat(arrs[i]);
        }
        return wpArray;
      }
      let staffPages = combineWordpressQueries(values, totalPages);
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

render(<DeptFetchApp/>, document.getElementById('app-area'));
render(<ProgramsUnitsListApp/>, document.getElementById('sec-holder-one'));
render(<SearchBoxApp/>, document.getElementById('particular-search'));
