import React from 'react';
import {SearchResult} from './SearchResult.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullResults: [],
      searchResults: [],
      contactsVisible: false
    };
    this._filterSearch = this._filterSearch.bind(this);
  }
  componentWillMount() {
    fetch(data).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        this.setState({ fullResults: data.info});
        this.setState({ searchResults: data.info});
        /* console.log(this.state.searchResults); */
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  _filterSearch(event) {
    this.setState({contactsVisible: true});
    let searchQuery = event.target.value.toLowerCase();
    // console.log(searchQuery);
    let searchResults = this.state.fullResults.filter(function(el) {
      let searchValue = el.first.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    this.setState({ searchResults: searchResults});
    if (searchQuery === "") {
      this.setState({contactsVisible: false});
    }
    console.log(searchQuery);
  }
  render() {
    return (
      <div>
      <input type="text" onChange={this._filterSearch}/>
      <ul className="contacts-list">
          { this.state.contactsVisible ?
            this.state.searchResults.slice(0,6).map(function(part, i) {
              return <SearchResult
                key={i} first={part.first} last={part.last}
              />;
            }) : null
          }
        </ul>
      </div>
    )
  }
}

export {SearchBox};
