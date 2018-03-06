import React from 'react';
import {PortraitPull} from './PortraitPull.jsx';
import {PhonePull} from './PhonePull.jsx';
import {MobilePull} from './MobilePull.jsx';
import {SupervisorPull} from './SupervisorPull.jsx';

class StaffBox extends React.Component {
  constructor() {
    super();
    this.state = {
      staffUrl: '#!'
    };
  }

  render() {
    let primaryBlock = document.getElementById('primary');
    let category = primaryBlock.getAttribute('category');
    if (category === 'staff') {
      return (
        <div className="staff-container">
            <PortraitPull first={this.props.first} email={this.props.email} imageUrl={this.props.imageUrl}/>
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
            <MobilePull phone={this.props.mobile}/>
            <div className="supervisor">
              <SupervisorPull supervisorName={this.props.supervisorName} supervisorUrl={this.props.supervisorUrl}/>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div className="staff-container">
        <a href={this.props.url}>
          <PortraitPull first={this.props.first} email={this.props.email} imageUrl={this.props.imageUrl}/>
        </a>
        <div className="meta">
          <h2 className="name">
            <a href={this.props.url}>
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
          <MobilePull phone={this.props.mobile}/>
          <div className="supervisor">
            <SupervisorPull supervisorName={this.props.supervisorName} supervisorUrl={this.props.supervisorUrl}/>
          </div>
        </div>
      </div>);
    }
  }
}

export {
  StaffBox
};
