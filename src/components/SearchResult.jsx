import React from 'react';

const requestUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/staff?per_page=50';

class SearchResult extends React.Component {
  constructor() {
    super();
    this.state = {
      staffUrl: '#!'
    };
  }

  render() {
    let programCheck = this.props.program;
    if (programCheck !== "") {
      return (
        <a href={this.props.url}>
          <div className="search-name">
          {this.props.first} {this.props.last}
        </div>
          <div className="search-position">
            {this.props.program}
          </div>
        </a>
      );
    }
    else {
      return (
        <a href={this.props.url}>
          <div className="search-name">
          {this.props.first} {this.props.last}
        </div>
          <div className="search-position">
            {this.props.department}
          </div>
        </a>
      );
    }
  }
}

export {
  SearchResult
};
