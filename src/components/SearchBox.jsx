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
    this.setState({contactsVisible: true});
    let searchQuery = event.target.value.toLowerCase();
    let searchResults = this.state.fullResults.filter(function(el) {
      let searchValue = el.first.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
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
