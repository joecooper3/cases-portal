require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {CasesOrgNews} from './components/CasesOrgNews.jsx'
import {SearchBox} from './components/SearchBox.jsx'

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';
const staffUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/staff?_embed=true&per_page=50';

const apiRequest1 = fetch(data).then(function(response) {
  return response.json()
});
const apiRequest2 = fetch(staffUrl).then(function(response) {
  return response.json()
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
      loaded: false
    };
  }
  componentWillMount() {
    Promise.all([apiRequest1,apiRequest2]).then(values => {
      let filteredArray = [];
      let jasonData = values[0].info;
      let staffPages = values[1];
      function compareSearch(a,b) { // function for sorting by array by first name
        let nameA = a.first.toUpperCase();
        let nameB = b.last.toUpperCase();
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
      this.setState({searchParts: sortedArray});
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

render(<NewsApp/>, document.getElementById('cases-website-stories'));
render(<SearchBoxApp/>, document.getElementById('particular-search'));
