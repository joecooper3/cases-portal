import React from 'react';

const requestUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/staff?per_page=50';

class SearchResult extends React.Component {
  constructor() {
    super();
    this.state = {
      staffUrl: '#!'
    };
  }

  componentWillMount() {
    fetch(requestUrl).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        data.map((info) => {
          if (info.acf.email === this.props.email) {
            this.setState({staffUrl: info.link});
          }
        })
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }

  render() {
      return (
        <a href={this.state.staffUrl}>
          {this.props.first} {this.props.last}
        </a>
      );
  }
}

export {
  SearchResult
};
