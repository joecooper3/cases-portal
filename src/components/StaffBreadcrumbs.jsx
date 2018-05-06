import React from "react";

class StaffBreadcrumbs extends React.Component {
  _removeSemicolon(inp) {
    return inp.replace("&#038;", "&").replace("&#8217;", "’");
  }

  render() {
    if (this.props.data.type === "program") {
      return (
        <div>
          <a href="http://portal.cases.org/staff-directory-by-department/">
            Staff Directory
          </a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
          <a href={this.props.data.deptUrl}>
            {this._removeSemicolon(this.props.data.dept)}
          </a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
          <a href={this.props.data.programUrl}>
            {this._removeSemicolon(this.props.data.program)}
          </a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
        </div>
      );
    } else {
      return (
        <div>
          <a href="http://portal.cases.org/staff-directory-by-department/">
            Staff Directory
          </a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
          <a href={this.props.data.deptUrl}>
            {this._removeSemicolon(this.props.data.dept)}
          </a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
        </div>
      );
    }
  }
}

export { StaffBreadcrumbs };
