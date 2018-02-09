import React from 'react';
import {StaffBox} from './StaffBox.jsx';

class DeptFetch extends React.Component {
  render() {
    return (
      <div id="dept-contacts">
        <div className="top-supervisor">
          {this.props.supervisorParts.map((part, i) =>
              <StaffBox key={i} first={part.first} last={part.last} title={part.title}
                email={part.email} phone={part.phone} supervisor={part.supervisor}/>
          )}
        </div>
      {this.props.parts.map((part, i) =>
        <StaffBox key={i} first={part.first} last={part.last} title={part.title}
          email={part.email} phone={part.phone} supervisor={part.supervisor}
          imageUrl={part.imageUrl} />
    )}
      </div>

    );
  }
}

export {DeptFetch};
