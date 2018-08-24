import React from 'react';
import PropTypes from 'prop-types';

import PortraitPull from '../directory/PortraitPull.jsx';

class NewStaffBox extends React.Component {
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
    const removeOh = function(inp2) {
      if (day.substring(0, 1) === '0') {
        return day.substring(1, 2);
      }
      return inp2;
    };
    const monthDisplay = monthNames[Number(month) - 1];
    const dayDisplay = removeOh(day);
    return `${monthDisplay} ${dayDisplay}, ${year}`;
  }

  render() {
    const { funFacts } = this.props;
    const markup = function() {
      return { __html: funFacts };
    };
    return (
      <div className="staff-container">
        <a href={this.props.url}>
          <PortraitPull
            first={this.props.first}
            email={this.props.email}
            imageUrl={this.props.imageUrl}
          />
          <h2 className="name">
            {this.props.first} {this.props.last}
          </h2>
        </a>
        <h3 className="meta-new-hires">
          {this.props.title}
          <br />
          Start Date: {this.constructor._formatDate(this.props.startDate)}
        </h3>
        <div className="fun-facts" dangerouslySetInnerHTML={markup()} /> { // eslint-disable-line
        }
      </div>
    );
  }
}

export default NewStaffBox;

NewStaffBox.propTypes = {
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  funFacts: PropTypes.string.isRequired,
  url: PropTypes.string,
  email: PropTypes.string
};

NewStaffBox.defaultProps = {
  imageUrl: 'https://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg',
  url: '#!',
  email: ''
};
