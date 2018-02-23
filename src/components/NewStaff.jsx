import React from 'react';
import {NewStaffBox} from './NewStaffBox.jsx';

class NewStaff extends React.Component {
  render() {
    return (
      <div id="dept-contacts">
      {this.props.parts.slice(0,8).map((part, i) =>
        <NewStaffBox key={i} first={part.first} last={part.last} title={part.title}
          imageUrl={part.imageUrl} url={part.url} startDate={part.startDate} funFacts={part.funFacts} />
    )}
      </div>

    );
  }
}

export {NewStaff};
