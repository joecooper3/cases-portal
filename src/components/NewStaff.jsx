import React from 'react';
import PropTypes from 'prop-types';

import NewStaffSlide from './NewStaffSlide.jsx';
import { NewStaffPermissions } from './NewStaffPermissions.jsx';

const STAFF_PER_PAGE = 8;
const MAX_PAGES = 5;

const newStaffContainer = document.getElementById('new-staff-container');

class NewStaff extends React.Component {
  constructor() {
    super();
    this.state = {
      moreStaffVisible: true,
      prevStaffVisible: false,
      currentPage: 1,
      slideHeights: ['2500px', '2500px', '2500px', '2500px', '2500px'],
      height: '2500px'
    };
    this._prevStaff = this._prevStaff.bind(this);
    this._moreStaff = this._moreStaff.bind(this);
    this._statusCheck = this._statusCheck.bind(this);
    this._setHeight = this._setHeight.bind(this);
  }
  componentDidMount() {
    const slideArr = newStaffContainer.querySelectorAll('.new-hires-slide');
    const slideHeightArr = [];
    slideArr.forEach(item => slideHeightArr.push(getComputedStyle(item).height));
    const slideHeightAdj = slideHeightArr.map(item => {
      const raw = parseInt(item.split('px')[0]);
      const modded = (raw + 86).toString();
      return `${modded}px`;
    });
    console.log(slideHeightAdj);
    console.log(slideHeightArr);
    this.setState({ slideHeights: slideHeightAdj }); // eslint-disable-line
    [newStaffContainer.style.height] = slideHeightAdj;
  }
  _moreStaff() {
    const newPageNumber = this.state.currentPage + 1;
    this.setState({ currentPage: newPageNumber });
    this._statusCheck(newPageNumber);
    newStaffContainer.style.height = this.state.slideHeights[newPageNumber - 1];
  }
  _prevStaff() {
    const newPageNumber = this.state.currentPage - 1;
    this.setState({ currentPage: newPageNumber });
    this._statusCheck(newPageNumber);
    newStaffContainer.style.height = this.state.slideHeights[newPageNumber - 1];
  }
  _setHeight() {
    newStaffContainer.style.height = this.state.height;
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
        {preparedData.map((inp, i) => {
          if (i + 1 === this.state.currentPage) {
            return <NewStaffSlide key={i} data={inp} cssClasses="new-hires-slide active" />;
          } else if (i < this.state.currentPage) {
            return <NewStaffSlide key={i} data={inp} cssClasses="new-hires-slide on-left" />;
          }
          return <NewStaffSlide key={i} data={inp} cssClasses="new-hires-slide" />;
        })}
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
        <div>
          Page {this.state.currentPage} of {MAX_PAGES}
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
