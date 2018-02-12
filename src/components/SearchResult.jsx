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
      return (
        <a href={this.props.url}>
          {this.props.first} {this.props.last}
        </a>
      );
  }
}

export {
  SearchResult
};
