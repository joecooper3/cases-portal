import React from 'react';

class SupervisorPull extends React.Component {

  _formatSpan(name,url) {
    if (name) {
    return (
      <span>
      Supervisor: <a href={url}>{name}</a>
    </span>
    );
    }
  }

  render() {
    return (
      <span>
        {this._formatSpan(this.props.supervisorName, this.props.supervisorUrl)}
  </span>);
  }
}

export {SupervisorPull};
