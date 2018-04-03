import React from 'react';

class StaffBreadcrumbs extends React.Component {
  render() {
    if (this.props.data.type === 'program') {
    return (<div>
      <a href={this.props.data.deptUrl}>{this.props.data.dept}</a>
      <i className="fa fa-angle-double-right" aria-hidden="true"></i>
      <a href={this.props.data.programUrl}>{this.props.data.program}</a>
    </div>)
  }
  else {
    return (
      <div>
    <a href={this.props.data.deptUrl}>{this.props.data.dept}</a>
  </div>
    )
    }
  }
}

export {StaffBreadcrumbs};
