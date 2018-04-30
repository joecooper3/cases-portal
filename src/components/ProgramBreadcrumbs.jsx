import React from "react";

class ProgramBreadcrumbs extends React.Component {
  _removeSemicolon(inp) {
    return inp.replace("&#038;", "&").replace("&#8217;", "’");
  }
  render() {
    return (
      <div>
        <a href={this.props.data.deptUrl}>
          {this._removeSemicolon(this.props.data.dept)}
        </a>
        <i className="fa fa-angle-double-right" aria-hidden="true" />
        <a href={this.props.data.programUrl}>
          {this._removeSemicolon(this.props.data.program)}
        </a>
      </div>
    );
  }
}

export { ProgramBreadcrumbs };
