import React from 'react';
import PropTypes from 'prop-types';

class ProgramBreadcrumbs extends React.Component {
  render() {
    return (
      <div>
        <a href="http://portal.cases.org/staff-directory-by-department/">Staff Directory</a>
        <i className="fa fa-angle-double-right" aria-hidden="true" />
        <a href={this.props.data.deptUrl}>{this.props.data.deptName}</a>
        <i className="fa fa-angle-double-right" aria-hidden="true" />
      </div>
    );
  }
}

export default ProgramBreadcrumbs;

ProgramBreadcrumbs.propTypes = {
  data: PropTypes.object.isRequired
};
