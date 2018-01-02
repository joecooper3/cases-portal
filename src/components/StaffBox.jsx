import React from 'react';
import {PortraitPull} from './PortraitPull.jsx';
import {PhonePull} from './PhonePull.jsx';
import {SupervisorPull} from './SupervisorPull.jsx';

const requestUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/staff?per_page=50';

class StaffBox extends React.Component {
  constructor() {
    super();
    this.state = {
      staffUrl: '#!'
    };
  }

  componentWillMount() {
    fetch(requestUrl).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        data.map((info) => {
          if (info.acf.email === this.props.email) {
            this.setState({staffUrl: info.link});
          }
        })
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }

  render() {
    let primaryBlock = document.getElementById('primary');
    let category = primaryBlock.getAttribute('category');
    if (category === 'staff') {
      return (
        <div className="staff-container">
            <PortraitPull first={this.props.first} email={this.props.email}/>
          <div className="meta">
            <h2 className="name">
                {this.props.first} {this.props.last}
            </h2>
            <h3>{this.props.title}</h3>
            <div className="address">2090 Adam Clayton Powell, Jr. Boulevard<br/>
              New York, NY 10027</div>
            <div className="email">
              <i className="fa fa-envelope-o" aria-hidden="true"></i>
              {this.props.email}
            </div>
            <PhonePull phone={this.props.phone}/>
            <div className="supervisor">
              <SupervisorPull supervisor={this.props.supervisor}/>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div className="staff-container">
        <a href={this.state.staffUrl}>
          <PortraitPull first={this.props.first} email={this.props.email}/>
        </a>
        <div className="meta">
          <h2 className="name">
            <a href={this.state.staffUrl} className="moving-line">
              {this.props.first} {this.props.last}</a>
          </h2>
          <h3>{this.props.title}</h3>
          <div className="address">2090 Adam Clayton Powell, Jr. Boulevard<br/>
            New York, NY 10027</div>
          <div className="email">
            <i className="fa fa-envelope-o" aria-hidden="true"></i>
            {this.props.email}
          </div>
          <PhonePull phone={this.props.phone}/>
          <div className="supervisor">
            <SupervisorPull supervisor={this.props.supervisor}/>
          </div>
        </div>
      </div>);
    }
  }
}

export {
  StaffBox
};
