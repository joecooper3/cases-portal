import React from "react";

class ProgramBreadcrumbs extends React.Component {
  render() {
    return (
      <div>
        <a href={this.props.data.deptUrl}>{this.props.data.dept}</a>
        <i className="fa fa-angle-double-right" aria-hidden="true" />
        <a href={this.props.data.programUrl}>{this.props.data.program}</a>
      </div>
    );
  }
}

export { ProgramBreadcrumbs };
