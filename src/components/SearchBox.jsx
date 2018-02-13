import React from 'react';
import {SearchResult} from './SearchResult.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.data);
    this.state = {
      fullResults: [],
      searchResults: [],
      contactsVisible: false
    };
    this._filterSearch = this._filterSearch.bind(this);
    this._hide = this._hide.bind(this);
  }
  componentWillMount() {
    this.setState({fullResults: this.props.data});
  }

  _filterSearch(event) {
    function compareSearch(a,b) { // function for sorting by entered characters first, then first name
      let nameA = a.first.toLowerCase();
      let nameB = b.first.toLowerCase();
      let nameALast = a.last.toLowerCase();
      let nameBLast = b.last.toLowerCase();
      let queryLength = searchQuery.length;
      /* These next four lets test to see if the search query matches the first
      characters in either the first or last names */
      let firstMatchA = nameA.substr(0,queryLength) === searchQuery;
      let lastMatchA = nameALast.substr(0,queryLength) === searchQuery;
      let firstMatchB = nameB.substr(0,queryLength) === searchQuery;
      let lastMatchB = nameBLast.substr(0,queryLength) === searchQuery;
        if ((firstMatchA && !firstMatchB && !lastMatchB) || (lastMatchA && !firstMatchB && !lastMatchB)) {
          return -1;
        }
        else if ((firstMatchB && !firstMatchA && !lastMatchA) || (lastMatchB && !firstMatchA && !lastMatchA))
        {
          return 1;
        }
        else if (nameA < nameB) {
          return -1;
        }
        else if (nameA > nameB ) {
          return 1;
        }
        return 0;
      }
    this.setState({contactsVisible: true});
    let searchQuery = event.target.value.toLowerCase();
    let sortedFullResults = this.state.fullResults.sort(compareSearch);
    let searchResults = sortedFullResults.filter(function(el) {
      let searchValueFirst = el.first.toLowerCase();
      let searchValueLast = el.last.toLowerCase();
      let searchValue = searchValueFirst + " " + searchValueLast;
      let theResults = searchValue.indexOf(searchQuery) !== -1;
      return theResults;
    });
    this.setState({ searchResults: searchResults});
    if (searchQuery === "") {
      this.setState({contactsVisible: false});
    }
  }
  _hide() {
    this.setState({contactsVisible: false});
  }
  render() {
    return (
      <div role="search" className="sbx-custom__wrapper">
        <input type="search" name="search" placeholder="Search the CASES directory"
           autoComplete="off" required="required" className="sbx-custom__input" onChange={this._filterSearch}/>
           <ul className="contacts-list">
               { this.state.contactsVisible ?
                 this.state.searchResults.slice(0,8).map(function(part, i) {
                   return <SearchResult
                     key={i} first={part.first} last={part.last} url={part.url}
                     department={part.department} program={part.program}
                   />;
                 }) : null
               }
             </ul>
        <button type="submit" title="Submit your search query." className="sbx-custom__submit">
          <svg role="img" aria-label="Search">
            <use xlinkHref="#sbx-icon-search-6" />
          </svg>
        </button>
        <button type="reset" title="Clear the search query." className="sbx-custom__reset" onClick={this._hide}>
          <svg role="img" aria-label="Reset">
            <use xlinkHref="#sbx-icon-clear-4" />
          </svg>
        </button>
      </div>
    )
  }
}

export {SearchBox};
