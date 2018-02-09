import React from 'react';
import {StaffBox} from './StaffBox.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';

class StaffFetch extends React.Component {
  render() {
    return (
      <div id="single-contact">
      {this.props.parts.map((part, i) =>
        <StaffBox key={i} first={part.first} last={part.last} title={part.title}
          email={part.email} phone={part.phone} supervisor={part.supervisor}
          imageUrl={part.imageUrl} url={part.url} supervisorUrl={part.supervisorUrl}
          supervisorName={part.supervisorName} />
    )}
      </div>

    );
  }
}

export {StaffFetch};
