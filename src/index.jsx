require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {CasesOrgNews} from './components/CasesOrgNews.jsx';
import {SearchBox} from './components/SearchBox.jsx';
import {NewStaff} from './components/NewStaff.jsx'

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

class NewsApp extends React.Component {
  render () {
    return (
      <div>
      <h2>CASES Website Stories</h2>
      <CasesOrgNews />
    </div>
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

class NewStaffApp extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: []
    };
  }
  componentWillMount() {
    totalPagesPromise.then(num => {;
      return apiRequestLoop([apiRequestJason], num);
    }).then(values => {
      let filteredArray = [];
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
    function removeBlanks(arr) {
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].startDate) {
          newArr.push(arr[i]);
        }
      }
      return newArr;
    }
    function compareSearch(a,b) { // function for sorting by array by first name
      let dateA = a.startDate;
      let dateB = b.startDate;
      let nameA = a.last.toUpperCase();
      let nameB = b.last.toUpperCase();
        if (dateA < dateB)
          return 1;
        if (dateA > dateB)
          return -1;
        if (nameA < nameB)
          return -1;
        if (nameA > nameB )
          return 1;
        return 0;
      }
    jasonData.forEach(function(item) {
      var result = staffPages.filter(function(staffItem) {
          return staffItem.acf.email === item.email;
      });
    item.url = (result[0] !== undefined) ? result[0].link : null;
    item.imageUrl = (result[0] !== undefined && result[0]._embedded !== undefined) ? result[0]._embedded['wp:featuredmedia'][0]['source_url'] : 'http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg';
    item.startDate = (result[0] !== undefined) ? result[0].acf.start_date : null;
    item.funFacts = (result[0] !== undefined) ? result[0].acf.fun_facts : null;
    });
    let jasonDataCulled = removeBlanks(jasonData);
    let sortedArray = jasonDataCulled.sort(compareSearch);
    this.setState({parts: sortedArray});
})
}
  render() {
    return(
      <NewStaff parts={this.state.parts}/>
    );
  }
}


render(<NewsApp/>, document.getElementById('cases-website-stories'));
render(<SearchBoxApp/>, document.getElementById('particular-search'));
render(<NewStaffApp/>, document.getElementById('new-staff-container'));
