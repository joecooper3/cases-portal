import React from 'react';
import PropTypes from 'prop-types';

class Training extends React.Component {
  static _formatTime(inp) {
    let hour = parseInt(inp.substring(0, 2));
    const minutes = inp.substring(3, 5);
    let ampm;
    if (hour > 0 && hour < 12) {
      ampm = 'AM';
    } else {
      ampm = 'PM';
    }
    if (hour > 12) {
      hour -= 12;
    }
    return `${hour}:${minutes} ${ampm}`;
  }

  static _formatDate(inp) {
    const year = inp.substring(0, 4);
    const month = inp.substring(4, 6);
    const day = inp.substring(6, 8);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const removeOh = function() {
      if (day.substring(0, 1) === '0') {
        return day.substring(1, 2);
      }

      return day;
    };
    const monthDisplay = monthNames[Number(month) - 1];
    const dayDisplay = removeOh();
    return `${monthDisplay} ${dayDisplay}, ${year}`;
  }

  render() {
    return (
      <li>
        <div className="date">{this.constructor._formatDate(this.props.date)}</div>
        <div className="location">{this.props.location}</div>
        <div className="time">
          {this.constructor._formatTime(this.props.startTime)}&ndash;{this.constructor._formatTime(
            this.props.endTime
          )}
        </div>
      </li>
    );
  }
}

export { Training };

Training.propTypes = {
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};
