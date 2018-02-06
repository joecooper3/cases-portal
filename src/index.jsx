require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {CasesOrgNews} from './components/CasesOrgNews.jsx'
import {SearchBox} from './components/SearchBox.jsx'

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/dummy.json';

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
  render () {
    return (
      <SearchBox />
    );
  }
}

render(<NewsApp/>, document.getElementById('cases-website-stories'));
render(<SearchBoxApp/>, document.getElementById('particular-search'));
