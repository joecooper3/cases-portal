import React, { Component } from 'react';

class AdminBox extends Component {
  render() {
    return (
      <div id="admin-area" className="resources-links">
        <div className="individual-sidenav-container">
          <div className="icon-secondary-container">
            <i className="fa fa-lock" aria-hidden="true" />
            <h2>Admin Links</h2>
          </div>
          <ul>
            <a href="http://portal.cases.org/wp-admin/post-new.php">
              <li>
                <i className="fa fa-pencil-square-o" />Write New Post/Alert
              </li>
            </a>
            <a href="http://portal.cases.org/documents/overview/">
              <li>
                <i className="fa fa-book" aria-hidden="true" />Portal Documentation
              </li>
            </a>
          </ul>
        </div>
      </div>
    );
  }
}

export { AdminBox };
