import React from 'react';
import PropTypes from 'prop-types';

class ProgramsUnitsList extends React.Component {
  render() {
    if (this.props.data.length < 1) {
      return <span />;
    }
    return (
      <div id="programs-units">
        <h2>
          {this.props.title}
          <br />Programs & Units
        </h2>
        <ul>
          {this.props.data.map(part => {
            if (part.name === this.props.name) {
              return (
                <a href="#!" key={part.id} className="active-program">
                  <li>{part.name}</li>
                </a>
              );
            }
            return (
              <a href={part.url} key={part.id}>
                <li>{part.name}</li>
              </a>
            );
          })}
        </ul>
      </div>
    );
  }
}

export { ProgramsUnitsList };

ProgramsUnitsList.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
