import React from "react";

class StaffBreadcrumbs extends React.Component {
  render() {
    if (this.props.data.type === "program") {
      return (
        <div>
          <a href="http://portal.cases.org/staff-directory-by-department/">
            Staff Directory
          </a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
          <a href={this.props.data.deptUrl}>{this.props.data.dept}</a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
          <a href={this.props.data.programUrl}>{this.props.data.program}</a>
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
          <a href={this.props.data.deptUrl}>{this.props.data.dept}</a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
          <a href={this.props.data.deptUrl}>{this.props.data.dept}</a>
        </div>
      );
    }
  }
}

export { StaffBreadcrumbs };
