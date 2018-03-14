require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {CasesOrgNews} from './components/CasesOrgNews.jsx';
import {SearchBox} from './components/SearchBox.jsx';
import {NewStaff} from './components/NewStaff.jsx'

const APIHost = __API__;

const data = APIHost + '/wp-content/themes/cases_portal/data/casescsv.json';
const staffUrl = APIHost + '/wp-json/wp/v2/staff?_embed=true&per_page=100';
const staffUrl2 = APIHost + '/wp-json/wp/v2/staff?_embed=true&per_page=100&page=2';
const deptUrl = APIHost + '/wp-json/wp/v2/department?_embed=true&per_page=100';
const programUrl = APIHost + '/wp-json/wp/v2/program?_embed=true&per_page=100';

const apiRequest1 = fetch(data).then(function(response) {
  return response.json()
});
const apiRequest2A = fetch(staffUrl).then(function(response) {
  return response.json()
});
const apiRequest2B = fetch(staffUrl2).then(function(response) {
  return response.json()
});
const apiRequest3 = fetch(deptUrl).then(function(response) {
  return response.json()
});
const apiRequest4 = fetch(programUrl).then(function(response) {
  return response.json()
});
const apiRequest2 = Promise.all([apiRequest2A, apiRequest2B]).then(values => {
  let staffPagesA = values[0];
  let staffPagesB = values[1];
  let staffPagesC = values[2];
  let staffPages = staffPagesA.concat(staffPagesB);
  return staffPages;
});

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
      console.log(sortedArray);
      let sortedArrayWithProgs = sortedArray.concat(deptProgArray);
      this.setState({searchParts: sortedArrayWithProgs});
      this.setState({loaded: true});
      console.log("finished, jesus");
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
  Promise.all([apiRequest1,apiRequest2,apiRequest3,apiRequest4]).then(values => {
    let filteredArray = [];
    let jasonData = values[0].info;
    let staffPages = values[1];
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
