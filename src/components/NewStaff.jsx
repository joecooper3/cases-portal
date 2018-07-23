import React from 'react';
import PropTypes from 'prop-types';

import NewStaffSlide from './NewStaffSlide.jsx';
import { NewStaffPermissions } from './NewStaffPermissions.jsx';
import NewStaffDots from './NewStaffDots.jsx';

const STAFF_PER_PAGE = 8;
const MAX_PAGES = 5;

class NewStaff extends React.Component {
  static _grabAllHeights(arr, el) {
    const slideHeightArr = [];
    arr.forEach(item => slideHeightArr.push(getComputedStyle(item).height));
    this.setState({ slideHeights: slideHeightArr }); // eslint-disable-line
    [el.style.height] = slideHeightArr;
  }
  static _setHeight(page) {
    document.getElementById('new-staff-portraits').style.height = page;
  }
  constructor() {
    super();
    this.state = {
      moreStaffVisible: true,
      prevStaffVisible: false,
      currentPage: 1,
      slideHeights: ['2500px', '2500px', '2500px', '2500px', '2500px']
    };
    this._grabAllHeights = this.constructor._grabAllHeights.bind(this);
    this._setHeight = this.constructor._setHeight.bind(this);
    this._handlePageChange = this._handlePageChange.bind(this);
    this._prevStaff = this._prevStaff.bind(this);
    this._moreStaff = this._moreStaff.bind(this);
    this._statusCheck = this._statusCheck.bind(this);
  }
  componentDidMount() {
    const newStaffContainer = document.getElementById('new-staff-portraits');
    const slideArr = newStaffContainer.querySelectorAll('.new-hires-slide');
    this._grabAllHeights(slideArr, newStaffContainer);
  }
  _handlePageChange(inp) {
    this.setState({ currentPage: inp });
    this._statusCheck(inp);
    this._setHeight(this.state.slideHeights[inp - 1]);
  }
  _moreStaff() {
    const newPageNumber = this.state.currentPage + 1;
    this.setState({ currentPage: newPageNumber });
    this._statusCheck(newPageNumber);
    this._setHeight(this.state.slideHeights[newPageNumber - 1]);
  }
  _prevStaff() {
    const newPageNumber = this.state.currentPage - 1;
    this.setState({ currentPage: newPageNumber });
    this._statusCheck(newPageNumber);
    this._setHeight(this.state.slideHeights[newPageNumber - 1]);
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
    const arrSlicer = (orig, inp) => {
      const currentArr = orig[orig.length - 1] || 1;
      if (currentArr.length < STAFF_PER_PAGE) {
        currentArr.push(inp);
      } else {
        orig.push([inp]);
      }
      return orig;
    };
    const preparedData = this.props.parts
      .slice(0, STAFF_PER_PAGE * MAX_PAGES)
      .reduce(arrSlicer, []);
    const { prevStaffVisible } = this.state;
    const { moreStaffVisible } = this.state;
    return (
      <React.Fragment>
        <div id="new-staff-portraits">
          {preparedData.map((inp, i) => {
            if (i + 1 === this.state.currentPage) {
              return <NewStaffSlide key={i} data={inp} cssClasses="new-hires-slide active" />;
            } else if (i < this.state.currentPage) {
              return <NewStaffSlide key={i} data={inp} cssClasses="new-hires-slide on-left" />;
            }
            return <NewStaffSlide key={i} data={inp} cssClasses="new-hires-slide" />;
          })}
        </div>
        <div id="new-staff-buttons">
          {prevStaffVisible ? (
            <div
              onClick={this._prevStaff}
              onKeyDown={this._prevStaff}
              className="prev-and-next"
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-long-arrow-left" aria-hidden="true" /> Previous New Staff
            </div>
          ) : (
            <div />
          )}
          <NewStaffDots
            currentPage={this.state.currentPage}
            maxPages={MAX_PAGES}
            onPageChange={this._handlePageChange}
          />
          {moreStaffVisible ? (
            <div
              onClick={this._moreStaff}
              onKeyDown={this._moreStaff}
              className="prev-and-next"
              role="button"
              tabIndex="0"
            >
              More New Staff <i className="fa fa-long-arrow-right" aria-hidden="true" />
            </div>
          ) : (
            <div />
          )}
        </div>
        {this.props.perm && <NewStaffPermissions />}
      </React.Fragment>
    );
  }
}

export { NewStaff };

NewStaff.propTypes = {
  parts: PropTypes.array.isRequired,
  perm: PropTypes.bool.isRequired
};
