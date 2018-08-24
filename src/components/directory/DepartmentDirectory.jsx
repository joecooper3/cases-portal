import React from 'react';
import PropTypes from 'prop-types';

class DepartmentDirectory extends React.Component {
  render() {
    const completeClassName = `fa ${this.props.icon}`;
    if (this.props.kids.length > 0) {
      return (
        <div className="dept-dir-container">
          <a href={this.props.url} className="dept-header">
            <div className="dept-dir-circle">
              <i className={completeClassName} aria-hidden="true" />
            </div>
            <h2>{this.props.name}</h2>
          </a>
          <ul>
            {this.props.kids.map((kid, i) => (
              <li key={i}>
                <a href={kid.url}>{kid.name}</a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div className="dept-dir-container">
        <a href={this.props.url} className="dept-header">
          <div className="dept-dir-circle">
            <i className={completeClassName} aria-hidden="true" />
          </div>
          <h2>{this.props.name}</h2>
        </a>
      </div>
    );
  }
}

export default DepartmentDirectory;

DepartmentDirectory.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  kids: PropTypes.array.isRequired
};
