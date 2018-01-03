import React from 'react';
import {StaffBox} from './StaffBox.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';

class ProgramFetch extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: [],
      supervisorParts: []
    };
  }
  componentWillMount() {
    let titleBlock = document.getElementById('dept-title');
    let program = titleBlock.getAttribute('data-id');
    let supervisor = titleBlock.getAttribute('supervisor-id');
    fetch(data).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        let filteredArray = [];
        let supervisorArray = [];
        data.info.map((info) => {
          if (supervisor.includes(info.email)) {
          supervisorArray.push(info);
          }
          else if(info.program === program) {
          filteredArray.push(info);
        }
      })
      function compare(a,b) {
        let nameA = a.last.toUpperCase();
        let nameB = b.last.toUpperCase();
          if (nameA < nameB)
            return -1;
          if (nameA > nameB )
            return 1;
          return 0;
        }
      let sortedArray = filteredArray.sort(compare);
      this.setState({parts: sortedArray});
      this.setState({supervisorParts: supervisorArray});
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  render() {
    return (
      <div id="dept-contacts">
        <div className="top-supervisor">
          {this.state.supervisorParts.map((part, i) =>
              <StaffBox key={i} first={part.first} last={part.last} title={part.title}
                email={part.email} phone={part.phone} supervisor={part.supervisor}/>
          )}
        </div>
      {this.state.parts.map((part, i) =>
        <StaffBox key={i} first={part.first} last={part.last} title={part.title}
          email={part.email} phone={part.phone} supervisor={part.supervisor} />
    )}
      </div>

    );
  }
}

export {ProgramFetch};
