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

  _determineClassName() {
    if (this.props.highlighted && this.props.type !== '') {
      return 'dept-prog highlighted-line';
    } else if (this.props.highlighted) {
      return 'highlighted-line';
    } else if (this.props.type !== '') {
      return 'dept-prog';
    }
    return '';
  }

  render() {
    const { type } = this.props;
    const { program } = this.props;
    const highlightedLine = this._determineClassName();
    if (type === 'dept') {
      return (
        <a href={this.props.url} className={highlightedLine}>
          {this._highlightText(this.props.first, this.props.last, this.props.query)}
          <div className="search-position">Department Page</div>
        </a>
      );
    }
    if (type === 'program') {
      return (
        <a href={this.props.url} className={highlightedLine}>
          {this._highlightText(this.props.first, this.props.last, this.props.query)}
          <div className="search-position">Program Page</div>
        </a>
      );
    } else if (program !== '') {
      return (
        <a href={this.props.url} className={highlightedLine}>
          {this._highlightText(this.props.first, this.props.last, this.props.query)}
          <div className="search-position">{this.props.program}</div>
        </a>
      );
    }

    return (
      <a href={this.props.url} className={highlightedLine}>
        {this._highlightText(this.props.first, this.props.last, this.props.query)}
        <div className="search-position">{this.props.department}</div>
      </a>
    );
  }
}

export { SearchResult };

SearchResult.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  first: PropTypes.string.isRequired,
  last: PropTypes.string,
  query: PropTypes.string,
  program: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  department: PropTypes.string,
  highlighted: PropTypes.bool.isRequired
};

SearchResult.defaultProps = {
  last: '',
  query: '',
  program: '',
  url: '#!',
  type: '',
  department: ''
};
