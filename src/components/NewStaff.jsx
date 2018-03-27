import React from 'react';
import {NewStaffBox} from './NewStaffBox.jsx';

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
    let newSliceOne = this.state.sliceOne + STAFF_PER_PAGE;
    let newSliceTwo = this.state.sliceTwo + STAFF_PER_PAGE;
    let newPageNumber = this.state.currentPage + 1;
    this.setState({sliceOne: this.state.sliceOne + STAFF_PER_PAGE});
    this.setState({sliceTwo: this.state.sliceTwo + STAFF_PER_PAGE});
    this.setState({currentPage: newPageNumber});
    this._statusCheck(newPageNumber);
  }
  _prevStaff() {
    let newSliceOne = this.state.sliceOne - STAFF_PER_PAGE;
    let newSliceTwo = this.state.sliceTwo - STAFF_PER_PAGE;
    let newPageNumber = this.state.currentPage - 1;
    this.setState({sliceOne: this.state.sliceOne - STAFF_PER_PAGE});
    this.setState({sliceTwo: this.state.sliceTwo - STAFF_PER_PAGE});
    this.setState({currentPage: newPageNumber});
    this._statusCheck(newPageNumber);
  }
  _statusCheck(pageNumber) {
    if (pageNumber < 2 && this.state.prevStaffVisible) {
      this.setState({prevStaffVisible: false});
    }
    else if (!this.state.prevStaffVisible) {
      this.setState({prevStaffVisible: true});
    }
    if (pageNumber >= MAX_PAGES && this.state.moreStaffVisible) {
      this.setState({moreStaffVisible: false});
    }
    else if (!this.state.moreStaffVisible) {
      this.setState({moreStaffVisible: true});
    }
  }

  render() {
    let prevStaffVisible = this.state.prevStaffVisible;
    let moreStaffVisible = this.state.moreStaffVisible;
    return (
      <div id="new-hires">
      {this.props.parts.slice(this.state.sliceOne, this.state.sliceTwo).map((part, i) =>
        <NewStaffBox key={i} first={part.first} last={part.last} title={part.title}
          imageUrl={part.imageUrl} url={part.url} startDate={part.startDate} funFacts={part.funFacts} />
    )}
    <div id="new-staff-buttons">
      {prevStaffVisible ? ( <div onClick={this._prevStaff}><i className="fa fa-long-arrow-left" aria-hidden="true"></i> Previous New Staff
    </div> ) : ( <br />)}
      {moreStaffVisible ? ( <div onClick={this._moreStaff}>More New Staff <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
    </div> ) : ( <br />)}
    </div>
      </div>
    );
  }
}

export {NewStaff};
