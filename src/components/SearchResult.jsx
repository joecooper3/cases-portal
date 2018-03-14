import React from 'react';

class SearchResult extends React.Component {
  constructor() {
    super();
    this.state = {
      staffUrl: '#!'
    };
    this._removeSemicolon = this._removeSemicolon.bind(this);
  }

  _highlightText (first, last, query) {
    let newFirst = this._removeSemicolon(first);
    let fullName = newFirst + " " + last;
    let fullNameLow = fullName.toLowerCase();
    let splitIndex = fullNameLow.search(query);
    let firstHalf = fullName.substring(0, splitIndex);
    let secondHalf = fullName.substring(splitIndex + query.length, fullName.length);
    let middle = fullName.substring(splitIndex, splitIndex + query.length);
    let putItTogether = <div id={this.props.id} className="search-name">{firstHalf}<span className="highlighted">{middle}</span>{secondHalf}</div>;
    return putItTogether;
  }

  _removeSemicolon(inp) {
    return inp.replace("&#038;", "&").replace("&#8217;", "’");
  }

  render() {
    let typeCheck = this.props.type;
    let programCheck = this.props.program;
    if (typeCheck === "dept") {
      return (
        <a href={this.props.url} className="dept-prog">
          {this._highlightText(this.props.first, this.props.last, this.props.query)}
          <div className="search-position">
            Department Page
          </div>
        </a>
      )
    }
    if (typeCheck === "program") {
      return (
        <a href={this.props.url} className="dept-prog">
          {this._highlightText(this.props.first, this.props.last, this.props.query)}
          <div className="search-position">
            Program Page
          </div>
        </a>
      )
    }
    else if (programCheck !== "") {
      return (
        <a href={this.props.url}>
          {this._highlightText(this.props.first, this.props.last, this.props.query)}
          <div className="search-position">
            {this.props.program}
          </div>
        </a>
      );
    }
    else {
      return (
        <a href={this.props.url}>
          {this._highlightText(this.props.first, this.props.last, this.props.query)}
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
