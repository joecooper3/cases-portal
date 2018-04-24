import React from "react";
import { DirectoryStaffBox } from "./DirectoryStaffBox.jsx";
import { DepartmentProgramMaster } from "./DepartmentProgramMaster.jsx";

class DirectorySearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullResults: [],
      searchResults: [],
      contactsVisible: false,
      query: ""
    };
    this._filterSearch = this._filterSearch.bind(this);
    this._hide = this._hide.bind(this);
  }
  componentWillMount() {
    this.setState({ fullResults: this.props.data });
  }

  _filterSearch(event) {
    function compareSearch(a, b) {
      // function for sorting by entered characters first, then first name
      let nameA = a.first.toLowerCase();
      let nameB = b.first.toLowerCase();
      let nameALast = a.last.toLowerCase();
      let nameBLast = b.last.toLowerCase();
      let typeA = a.type;
      let typeB = b.type;
      let queryLength = searchQuery.length;
      /* These next four lets test to see if the search query matches the first
      characters in either the first or last names */
      let firstMatchA = nameA.substr(0, queryLength) === searchQuery;
      let lastMatchA = nameALast.substr(0, queryLength) === searchQuery;
      let firstMatchB = nameB.substr(0, queryLength) === searchQuery;
      let lastMatchB = nameBLast.substr(0, queryLength) === searchQuery;
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
    this.setState({ contactsVisible: true });
    let searchQuery = event.target.value.toLowerCase();
    this.setState({ query: searchQuery });
    let sortedFullResults = this.state.fullResults.sort(compareSearch);
    let searchResults = sortedFullResults.filter(function(el) {
      let searchValueFirst = el.first.toLowerCase();
      let searchValueLast = el.last.toLowerCase();
      let searchValue = searchValueFirst + " " + searchValueLast;
      let theResults = searchValue.indexOf(searchQuery) !== -1;
      return theResults;
    });
    this.setState({ searchResults: searchResults });
    if (searchQuery === "") {
      this.setState({ contactsVisible: false });
    }
  }
  _hide() {
    this.setState({ contactsVisible: false });
  }
  render() {
    return (
      <div id="primary" className="content-area">
        <div className="no-bg">
          <h1 id="dept-title">Staff Directory</h1>
          <div className="entry-content-directory">
            <div id="search-box">
              <form
                id="inside-search"
                noValidate="novalidate"
                className="searchbox sbx2-custom"
              >
                <div role="search" className="sbx2-custom__wrapper">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search the CASES directory"
                    autoComplete="off"
                    required="required"
                    className="sbx2-custom__input"
                    onChange={this._filterSearch}
                  />
                  <button
                    type="submit"
                    title="Submit your search query."
                    className="sbx2-custom__submit"
                  >
                    <svg role="img" aria-label="Search">
                      <use xlinkHref="#sbx2-icon-search-6" />
                    </svg>
                  </button>
                  <button
                    type="reset"
                    title="Clear the search query."
                    className="sbx2-custom__reset"
                    onClick={this._hide}
                  >
                    <svg role="img" aria-label="Reset">
                      <use xlinkHref="#sbx2-icon-clear-4" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="directory-search-results-container">
          <h2>Search Results</h2>
          <div id="directory-search-results">
            {this.state.contactsVisible ? (
              this.state.searchResults.slice(0, 8).map(function(part, i) {
                return (
                  <DirectoryStaffBox
                    key={i}
                    first={part.first}
                    last={part.last}
                    url={part.url}
                    department={part.department}
                    program={part.program}
                    query={this.state.query}
                    type={part.type}
                    phone={part.phone}
                    mobile={part.mobile}
                    email={part.email}
                    imageUrl={part.imageUrl}
                    title={part.title}
                  />
                );
              }, this)
            ) : (
              <p className="directory-blurb">
                Type the name of a CASES staff member or program in the search
                box above to find their contact information. To see a complete
                listing of CASES departments and program/units,{" "}
                <a href="http://portal.cases.org/staff-directory-by-department/">
                  visit the Department Directory
                </a>.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export { DirectorySearchResults };
