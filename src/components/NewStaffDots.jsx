import React from 'react';
import PropTypes from 'prop-types';

class NewStaffDots extends React.Component {
  constructor() {
    super();
    this._dotsPostLoop = this._dotsPostLoop.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }
  _dotsPostLoop() {
    const dotArr = [];
    for (let i = 1; i <= this.props.maxPages; i += 1) {
      if (i === this.props.currentPage) {
        dotArr.push(<i className="fa fa-circle" aria-hidden="true" key={i} />);
      } else {
        dotArr.push(
          <i
            className="fa fa-circle-thin"
            aria-hidden="true"
            key={i}
            onClick={() => this._handleChange(i)}
          />
        );
      }
    }
    return dotArr;
  }
  _handleChange(inp) {
    this.props.onPageChange(inp);
  }
  render() {
    return <div id="new-staff-dots-nav">{this._dotsPostLoop()}</div>;
  }
}

NewStaffDots.propTypes = {
  currentPage: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default NewStaffDots;
