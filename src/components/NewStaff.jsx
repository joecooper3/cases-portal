import React from 'react';
import PropTypes from 'prop-types';

import { NewStaffBox } from './NewStaffBox.jsx';

const STAFF_PER_PAGE = 8;
const MAX_PAGES = 5;

class NewStaff extends React.Component {
  constructor() {
    super();
    this.state = {
      moreStaffVisible: true,
      prevStaffVisible: false,
      sliceOne: 0,
      sliceTwo: STAFF_PER_PAGE,
      currentPage: 1
    };
    this._prevStaff = this._prevStaff.bind(this);
    this._moreStaff = this._moreStaff.bind(this);
    this._statusCheck = this._statusCheck.bind(this);
  }

  _moreStaff() {
    const newPageNumber = this.state.currentPage + 1;
    this.setState({ sliceOne: this.state.sliceOne + STAFF_PER_PAGE });
    this.setState({ sliceTwo: this.state.sliceTwo + STAFF_PER_PAGE });
    this.setState({ currentPage: newPageNumber });
    this._statusCheck(newPageNumber);
  }
  _prevStaff() {
    const newPageNumber = this.state.currentPage - 1;
    this.setState({ sliceOne: this.state.sliceOne - STAFF_PER_PAGE });
    this.setState({ sliceTwo: this.state.sliceTwo - STAFF_PER_PAGE });
    this.setState({ currentPage: newPageNumber });
    this._statusCheck(newPageNumber);
  }
  _statusCheck(pageNumber) {
    if (pageNumber < 2 && this.state.prevStaffVisible) {
      this.setState({ prevStaffVisible: false });
    } else if (!this.state.prevStaffVisible) {
      this.setState({ prevStaffVisible: true });
    }
    if (pageNumber >= MAX_PAGES && this.state.moreStaffVisible) {
      this.setState({ moreStaffVisible: false });
    } else if (!this.state.moreStaffVisible) {
      this.setState({ moreStaffVisible: true });
    }
  }

  render() {
    const { prevStaffVisible } = this.state;
    const { moreStaffVisible } = this.state;
    return (
      <div id="new-hires">
        {this.props.parts
          .slice(this.state.sliceOne, this.state.sliceTwo)
          .map(part => (
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
        <div id="new-staff-buttons">
          {prevStaffVisible ? (
            <div onClick={this._prevStaff} onKeyDown={this._prevStaff} role="button" tabIndex="0">
              <i className="fa fa-long-arrow-left" aria-hidden="true" /> Previous New Staff
            </div>
          ) : (
            <br />
          )}
          {moreStaffVisible ? (
            <div onClick={this._moreStaff} onKeyDown={this._moreStaff} role="button" tabIndex="0">
              More New Staff <i className="fa fa-long-arrow-right" aria-hidden="true" />
            </div>
          ) : (
            <br />
          )}
        </div>
        {this.props.perm && (
          <a
            href="http://portal.cases.org/wp-admin/post-new.php?post_type=staff"
            className="add-new-staff-member"
          >
            <i className="fa fa-user" aria-hidden="true" />
            Add New Staff Member
          </a>
        )}
      </div>
    );
  }
}

export { NewStaff };

NewStaff.propTypes = {
  parts: PropTypes.array.isRequired,
  perm: PropTypes.bool.isRequired
};
