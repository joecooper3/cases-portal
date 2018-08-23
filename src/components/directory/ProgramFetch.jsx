import React from 'react';
import PropTypes from 'prop-types';

import { StaffBox } from './StaffBox.jsx';

class ProgramFetch extends React.Component {
  render() {
    return (
      <div id="dept-contacts">
        <div className="top-supervisor">
          {this.props.supervisorParts.map(part => (
            <StaffBox
              key={part.id}
              first={part.first}
              last={part.last}
              title={part.title}
              email={part.email}
              phone={part.phone}
              supervisor={part.supervisor}
              imageUrl={part.imageUrl}
              url={part.url}
              supervisorUrl={part.supervisorUrl}
              supervisorName={part.supervisorName}
              mobile={part.mobile}
            />
          ))}
        </div>
        {this.props.parts.map(part => (
          <StaffBox
            key={part.id}
            first={part.first}
            last={part.last}
            title={part.title}
            email={part.email}
            phone={part.phone}
            supervisor={part.supervisor}
            imageUrl={part.imageUrl}
            url={part.url}
            supervisorUrl={part.supervisorUrl}
            supervisorName={part.supervisorName}
            mobile={part.mobile}
          />
        ))}
      </div>
    );
  }
}

export { ProgramFetch };

ProgramFetch.propTypes = {
  parts: PropTypes.array.isRequired,
  supervisorParts: PropTypes.array.isRequired
};
