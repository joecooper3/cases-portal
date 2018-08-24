import React, { Component } from 'react';

class NewStaffPermissions extends Component {
  render() {
    return (
      <div className="new-staff-admin-container">
        <a href="http://portal.cases.org/wp-admin/post-new.php?post_type=staff">
          <i className="fa fa-user" aria-hidden="true" />
          Add New Staff Member
        </a>
        <a href="http://portal.cases.org/wp-admin/edit.php?post_type=staff">
          See All Staff Member Entries
        </a>
      </div>
    );
  }
}

export default NewStaffPermissions;
