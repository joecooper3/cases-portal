import React from 'react';
import PropTypes from 'prop-types';

class SearchResult extends React.Component {
  _highlightText(first, last, query) {
    const fullName = `${first} ${last}`;
    const fullNameLow = fullName.toLowerCase();
    const splitIndex = fullNameLow.search(query);
    const firstHalf = fullName.substring(0, splitIndex);
    const secondHalf = fullName.substring(splitIndex + query.length, fullName.length);
    const middle = fullName.substring(splitIndex, splitIndex + query.length);
    const putItTogether = (
      <div id={this.props.id} className="search-name">
        {firstHalf}
        <span className="highlighted">{middle}</span>
        {secondHalf}
      </div>
    );
    return putItTogether;
  }

  render() {
    const typeCheck = this.props.type;
    const programCheck = this.props.program;
    if (typeCheck === 'dept') {
      return (
        <a href={this.props.url} className="dept-prog">
          {this._highlightText(this.props.first, this.props.last, this.props.query)}
          <div className="search-position">Department Page</div>
        </a>
      );
    }
    if (typeCheck === 'program') {
      return (
        <a href={this.props.url} className="dept-prog">
          {this._highlightText(this.props.first, this.props.last, this.props.query)}
          <div className="search-position">Program Page</div>
        </a>
      );
    } else if (programCheck !== '') {
      return (
        <a href={this.props.url}>
          {this._highlightText(this.props.first, this.props.last, this.props.query)}
          <div className="search-position">{this.props.program}</div>
        </a>
      );
    }

    return (
      <a href={this.props.url}>
        {this._highlightText(this.props.first, this.props.last, this.props.query)}
        <div className="search-position">{this.props.department}</div>
      </a>
    );
  }
}

export { SearchResult };

SearchResult.propTypes = {
  id: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  last: PropTypes.string,
  query: PropTypes.string,
  program: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  department: PropTypes.string
};

SearchResult.defaultProps = {
  last: '',
  query: '',
  program: '',
  url: '#!',
  type: '',
  department: ''
};
