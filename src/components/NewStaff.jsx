import React from 'react';
import {NewStaffBox} from './NewStaffBox.jsx';

class NewStaff extends React.Component {
  constructor() {
    super();
    this.state = {
      moreStaffVisible: true,
      prevStaffVisible: false,
      sliceOne: 0,
      sliceTwo: 8
    };
    this._prevStaff = this._prevStaff.bind(this);
    this._moreStaff = this._moreStaff.bind(this);
    this._statusCheck = this._statusCheck.bind(this);
  }

  _moreStaff() {
    let newSliceOne = this.state.sliceOne + 8;
    let newSliceTwo = this.state.sliceTwo + 8;
    this.setState({sliceOne: this.state.sliceOne + 8});
    this.setState({sliceTwo: this.state.sliceTwo + 8});
    this._statusCheck(newSliceOne, newSliceTwo);
  }
  _prevStaff() {
    let newSliceOne = this.state.sliceOne - 8;
    let newSliceTwo = this.state.sliceTwo - 8;
    this.setState({sliceOne: this.state.sliceOne - 8});
    this.setState({sliceTwo: this.state.sliceTwo - 8});
    this._statusCheck(newSliceOne, newSliceTwo);
  }
  _statusCheck(sliceOne, sliceTwo) {
    if (sliceOne < 1 && this.state.prevStaffVisible) {
      this.setState({prevStaffVisible: false});
    }
    else if (!this.state.prevStaffVisible) {
      this.setState({prevStaffVisible: true});
    }
    if (sliceTwo > this.props.parts.length && this.state.moreStaffVisible) {
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
      {prevStaffVisible ? ( <div onClick={this._prevStaff}>Previous New Staff</div> ) : ( <br />)}
      {moreStaffVisible ? ( <div onClick={this._moreStaff}>More New Staff</div> ) : ( <br />)}
    </div>
      </div>
    );
  }
}

export {NewStaff};
