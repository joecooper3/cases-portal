import React from 'react';
import PropTypes from 'prop-types';

const NewStaffDots = ({ currentPage, maxPages }) => {
  const dotsPostLoop = () => {
    const dotArr = [];
    for (let i = 1; i <= maxPages; i += 1) {
      if (i === currentPage) {
        dotArr.push(<i className="fa fa-circle" aria-hidden="true" key={i} />);
      } else {
        dotArr.push(<i className="fa fa-circle-thin" aria-hidden="true" key={i} />);
      }
    }
    return dotArr;
  };
  return <div id="new-staff-dots-nav">{dotsPostLoop()}</div>;
};

NewStaffDots.propTypes = {
  currentPage: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired
};

export default NewStaffDots;
