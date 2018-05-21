import React from 'react';
import PropTypes from 'prop-types';
import { SearchResult } from './SearchResult.jsx';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullResults: [],
      searchResults: [],
      contactsVisible: false,
      query: ''
    };
    this._filterSearch = this._filterSearch.bind(this);
    this._hide = this._hide.bind(this);
  }
  componentWillMount() {
    this.setState({ fullResults: this.props.data });
  }

  _filterSearch(event) {
    this.setState({ contactsVisible: true });
    const searchQuery = event.target.value.toLowerCase();
    this.setState({ query: searchQuery });
    function compareSearch(a, b) {
      // function for sorting by entered characters first, then first name
      const nameA = a.first.toLowerCase();
      const nameB = b.first.toLowerCase();
      const nameALast = a.last.toLowerCase();
      const nameBLast = b.last.toLowerCase();
      const typeA = a.type;
      const typeB = b.type;
      const queryLength = searchQuery.length;
      /* These next four lets test to see if the search query matches the first
      characters in either the first or last names */
      const firstMatchA = nameA.substr(0, queryLength) === searchQuery;
      const lastMatchA = nameALast.substr(0, queryLength) === searchQuery;
      const firstMatchB = nameB.substr(0, queryLength) === searchQuery;
      const lastMatchB = nameBLast.substr(0, queryLength) === searchQuery;
      /* The following logic checks to see if the query matches:
      1. If it's a name (rather than program or department)
      2. The first few characters of the first name
      3. The first few characters of the last name
      4. Matches anywhere
      */
      if (typeA && !typeB) {
        return 1;
      }
      if (typeB && !typeA) {
        return -1;
      }
      if (firstMatchA && !firstMatchB) {
        return -1;
      } else if (firstMatchB && !firstMatchA) {
        return 1;
      } else if (lastMatchA && !lastMatchB) {
        return -1;
      } else if (lastMatchB && !lastMatchA) {
        return 1;
      } else if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
    const sortedFullResults = this.state.fullResults.sort(compareSearch);
    const searchResults = sortedFullResults.filter(el => {
      const searchValueFirst = el.first.toLowerCase();
      const searchValueLast = el.last.toLowerCase();
      const searchValue = `${searchValueFirst} ${searchValueLast}`;
      const theResults = searchValue.indexOf(searchQuery) !== -1;
      return theResults;
    });
    this.setState({ searchResults });
    if (searchQuery === '') {
      this.setState({ contactsVisible: false });
    }
  }
  _hide() {
    this.setState({ contactsVisible: false });
  }
  render() {
    return (
      <div role="search" className="sbx-custom__wrapper">
        <input
          type="search"
          name="search"
          placeholder="Search the CASES directory"
          autoComplete="off"
          required="required"
          className="sbx-custom__input"
          onChange={this._filterSearch}
        />
        <ul className="contacts-list">
          {this.state.contactsVisible
            ? this.state.searchResults.slice(0, 8).map(function(part, i) {
                return (
                  <SearchResult
                    key={i}
                    first={part.first}
                    last={part.last}
                    url={part.url}
                    department={part.department}
                    program={part.program}
                    query={this.state.query}
                    type={part.type}
                  />
                );
              }, this)
            : null}
        </ul>
        <button type="submit" title="Submit your search query." className="sbx-custom__submit">
          <svg role="img" aria-label="Search">
            <use xlinkHref="#sbx-icon-search-6" />
          </svg>
        </button>
        <button
          type="reset"
          title="Clear the search query."
          className="sbx-custom__reset"
          onClick={this._hide}
        >
          <svg role="img" aria-label="Reset">
            <use xlinkHref="#sbx-icon-clear-4" />
          </svg>
        </button>
      </div>
    );
  }
}
SearchBox.propTypes = {
  data: PropTypes.array.isRequired
};
export { SearchBox };
