import React from 'react';

const deptRequestUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/department?per_page=50'
const progRequestUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/program?per_page=50';

class Crumb extends React.Component {

  constructor() {
    super();
    this.state = {
      phoneNumber: 'whatever'
    };
  }
  componentWillMount() {
    let deptProgName = this.props.name;
    fetch(progRequestUrl).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        console.log('walking on sunshine');
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }

  render() {
    if (this.props.type === 'dept') {
      return (<div id="staff-dept">
        <a href="#!">{this.props.name}</a>
      </div>);
    }
    else if(this.props.type === 'program') {
      return (<div id="staff-program">
        <a href="#!">{this.props.name}</a>
      </div>);
    } else {
      return;
    }
  }
}

export default Crumb;
