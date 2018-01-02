import React from 'react';
import Crumb from './Crumb.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';

class StaffBreadcrumbs extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: {},
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
        let filteredArray = {};
        data.info.map((info) => {
          if(info.email === email) {
            let filteredArray = info;
          this.setState({parts: filteredArray});
        }
      })
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  render() {
    if (this.state.parts.program) {
    return (<div>
      <Crumb name={this.state.parts.department} type='dept'/>
      <i className="fa fa-angle-double-right" aria-hidden="true"></i>
      <Crumb name={this.state.parts.program} type='program'/>
    </div>)
  }
  else {
    return (
      <div>
    <Crumb name={this.state.parts.department} type='dept'/>
  </div>
  )
  }
  }
}

export {StaffBreadcrumbs};
