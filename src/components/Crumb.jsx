import React from 'react';

const deptRequestUrl = 'http://portal.cases.org/wp-json/wp/v2/department?per_page=50'
const progRequestUrl = 'http://portal.cases.org/wp-json/wp/v2/program?per_page=50';

class Crumb extends React.Component {

  constructor() {
    super();
    this.state = {
      crumbUrl: '#!'
    };
  }
  componentWillMount() {
    if (this.props.type === 'dept') {
      fetch(deptRequestUrl).then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then((data) => {
          data.map((info) => {
          if (info.title.rendered === this.props.name) {
            this.setState({crumbUrl: info.link});
          }
        })
        });
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }
    else if (this.props.type === 'program') {
      fetch(progRequestUrl).then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then((data) => {
          data.map((info) => {
          if (info.title.rendered === this.props.name) {
            this.setState({crumbUrl: info.link});
          }
        })
        });
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }
  }

  render() {
    if (this.props.type === 'dept') {
      return (<div id="staff-dept">
        <a href={this.state.crumbUrl}>{this.props.name}</a>
      </div>);
    } else if (this.props.type === 'program') {
      return (<div id="staff-program">
        <a href={this.state.crumbUrl}>{this.props.name}</a>
      </div>);
    } else {
      return;
    }
  }
}

export default Crumb;
