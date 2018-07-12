import React from 'react';
import PropTypes from 'prop-types';
import { SearchResult } from './SearchResult.jsx';

const MAX_RESULTS = 8;

const wholePage = document.getElementById('page');

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullResults: [],
      searchResults: [],
      selectedLink: {},
      contactsVisible: false,
      highlightedItem: -1,
      query: ''
    };
    this._filterSearch = this._filterSearch.bind(this);
    this._hide = this._hide.bind(this);
    this._keyboard = this._keyboard.bind(this);
  }
  componentWillMount() {
    this.setState({ fullResults: this.props.data });
  }
  componentDidMount() {
    wholePage.addEventListener('click', this._hide);
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
    this.setState({ highlightedItem: -1 });
    this.setState({ selectedLink: searchResults[0] });
    if (searchQuery === '') {
      this.setState({ contactsVisible: false });
    }
  }
  _hide(e) {
    if (e.target.classList[0] !== 'sbx-custom__input') {
      this.setState({ contactsVisible: false });
    }
  }
  _keyboard(e) {
    if (this.state.contactsVisible) {
      if (e.key === 'Enter' && this.state.contactsVisible) {
        window.location.href = this.state.selectedLink.url;
      }
      if (
        e.key === 'ArrowDown' &&
        this.state.highlightedItem < Math.min(this.state.searchResults.length, MAX_RESULTS) - 1
      ) {
        this.setState({ highlightedItem: this.state.highlightedItem + 1 });
        this.setState({ selectedLink: this.state.searchResults[this.state.highlightedItem + 1] });
      }
      if (e.key === 'ArrowUp' && this.state.highlightedItem > 0) {
        this.setState({ highlightedItem: this.state.highlightedItem - 1 });
        this.setState({ selectedLink: this.state.searchResults[this.state.highlightedItem - 1] });
      }
    }
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
          onFocus={this._filterSearch}
          onKeyDown={this._keyboard}
        />
        <ul className="contacts-list">
          {this.state.contactsVisible
            ? this.state.searchResults.slice(0, MAX_RESULTS).map(function(part, i) {
                return (
                  <SearchResult
                    key={part.id}
                    id={part.id}
                    first={part.first}
                    last={part.last}
                    url={part.url}
                    department={part.department}
                    program={part.program}
                    query={this.state.query}
                    type={part.type}
                    highlighted={this.state.highlightedItem === i}
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
