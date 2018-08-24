import React from 'react';
import PropTypes from 'prop-types';

import NewStaffBox from './NewStaffBox.jsx';

const NewStaffSlide = ({ cssClasses, data }) => (
  <div className={cssClasses}>
    {data.map(part => (
      <NewStaffBox
        key={part.id}
        first={part.first}
        last={part.last}
        title={part.title}
        imageUrl={part.imageUrl}
        url={part.url}
        startDate={part.startDate}
        funFacts={part.funFacts}
      />
    ))}
  </div>
);

NewStaffSlide.propTypes = {
  cssClasses: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

export default NewStaffSlide;
