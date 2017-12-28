import React from 'react';
import {PortraitPull} from './PortraitPull.jsx';
import {PhonePull} from './PhonePull.jsx';
import {SupervisorPull} from './SupervisorPull.jsx';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';

class StaffBox extends React.Component {
  render() {
    return(
    <div className="staff-container">
      <PortraitPull first={this.props.first} email={this.props.email}/>
      <div className="meta">
        <h2 className="name">{this.props.first} {this.props.last}</h2>
        <h3>{this.props.title}</h3>
        <div className="address">2090 Adam Clayton Powell, Jr. Boulevard<br/>
        New York, NY 10027</div>
        <div className="email">
          <i className="fa fa-envelope-o" aria-hidden="true"></i> {this.props.email}
        </div>
        <PhonePull phone={this.props.phone} />
      <div className="supervisor">
        <SupervisorPull supervisor={this.props.supervisor} />
      </div>
      </div>
    </div>
  );}
}

export {StaffBox};
