import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Training } from './Training.jsx';

export default class TrainingsBox extends Component {
  static dateCompare(a, b) {
    // function for sorting training dates
    const dateA = a.date;
    const dateB = b.date;
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
    return 0;
  }
  render() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = yyyy + mm + dd;
    const ulId = this.props.type === 'compliance' ? 'compliance-dates' : 'privacy-dates';
    return (
      <ul id={ulId} className="dates-list">
        {this.props.data
          .filter(item => item.date > today)
          .sort(this.constructor.dateCompare)
          .map((part, i) => (
            <Training
              key={i}
              date={part.date}
              location={part.location}
              startTime={part.start_time}
              endTime={part.end_time}
            />
          ))}
      </ul>
    );
  }
}

export { TrainingsBox };

TrainingsBox.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};
