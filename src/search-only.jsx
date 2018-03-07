require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {SearchBox} from './components/SearchBox.jsx';

const APIHost = __API__;

const data = APIHost + '/wp-content/themes/cases_portal/data/casescsv.json';
const staffUrl = APIHost + '/wp-json/wp/v2/staff?_embed=true&per_page=50';
const deptUrl = APIHost + '/wp-json/wp/v2/department?_embed=true&per_page=50';
const programUrl = APIHost + '/wp-json/wp/v2/program?_embed=true&per_page=50';

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

render(<SearchBoxApp/>, document.getElementById('particular-search'));
