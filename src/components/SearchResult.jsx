import React from 'react';


class SearchResult extends React.Component {

  render() {
      return (
        <div>
          {this.props.first} {this.props.last}
        </div>
      );
  }
}

export {
  SearchResult
};
