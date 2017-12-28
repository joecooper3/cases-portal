import React from 'react';
import {StaffBox} from './StaffBox.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';

class StaffFetch extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: [],
    };
  }
  componentWillMount() {
    let titleBlock = document.getElementById('staff-title');
    let email = titleBlock.getAttribute('staff-email');
    fetch(data).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        let filteredArray = [];
        data.info.map((info) => {
          if(info.email === email) {
          filteredArray.push(info);
        }
      })
      this.setState({parts: filteredArray});
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  render() {
    return (
      <div id="single-contact">
      {this.state.parts.map((part, i) =>
        <StaffBox key={i} first={part.first} last={part.last} title={part.title}
          email={part.email} phone={part.phone} supervisor={part.supervisor} />
    )}
      </div>

    );
  }
}

export {StaffFetch};
