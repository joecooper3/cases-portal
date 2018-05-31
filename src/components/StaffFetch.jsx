import React from 'react';
import PropTypes from 'prop-types';
import { StaffBox } from './StaffBox.jsx';

class StaffFetch extends React.Component {
  render() {
    const part = this.props.data;
    return (
      <div id="single-contact">
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
          location={part.location}
          category="staff"
        />
      </div>
    );
  }
}

export { StaffFetch };

StaffFetch.propTypes = {
  data: PropTypes.object.isRequired
};
