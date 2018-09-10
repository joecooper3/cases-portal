import React from 'react';
import PropTypes from 'prop-types';

class SupervisorPull extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.supervisorName !== 'none' && (
          <span>
            Supervisor: <a href={this.props.supervisorUrl}>{this.props.supervisorName}</a>
          </span>
        )}
      </React.Fragment>
    );
  }
}

export default SupervisorPull;

SupervisorPull.propTypes = {
  supervisorName: PropTypes.string.isRequired,
  supervisorUrl: PropTypes.string.isRequired
};
