import React from 'react';
import PropTypes from 'prop-types';

class StaffBreadcrumbs extends React.Component {
  render() {
    const da = this.props.data;
    if (da.type === 'program') {
      return (
        <div>
          <a href="http://portal.cases.org/staff-directory-by-department/">Staff Directory</a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
          <a href={da.deptUrl}>{da.deptName}</a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
          <a href={da.programUrl}>{da.programName}</a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
        </div>
      );
    }
    return (
      <div>
        <a href="http://portal.cases.org/staff-directory-by-department/">Staff Directory</a>
        <i className="fa fa-angle-double-right" aria-hidden="true" />
        <a href={da.deptUrl}>{da.deptName}</a>
        <i className="fa fa-angle-double-right" aria-hidden="true" />
      </div>
    );
  }
}

export default StaffBreadcrumbs;

StaffBreadcrumbs.propTypes = {
  data: PropTypes.object.isRequired
};
