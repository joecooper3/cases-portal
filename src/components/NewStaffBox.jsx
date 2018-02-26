import React from 'react';
import {PortraitPull} from './PortraitPull.jsx';

const requestUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/staff?per_page=50';

class NewStaffBox extends React.Component {
  constructor() {
    super();
    this.state = {
      staffUrl: '#!'
    };
  }

  _formatDate(inp) {
    let year = inp.substring(0,4);
    let month = inp.substring(4,6);
    let day = inp.substring(6,8);
    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    let removeOh = function(day) {
      if (day.substring(0,1) === '0') {
        return day.substring(1,2);
      }
      else {
        return day;
      }
    }
    let monthDisplay = monthNames[Number(month)-1];
    let dayDisplay = removeOh(day);
    return monthDisplay + " " + dayDisplay + ", " + year;
  }

  render() {
    let funFacts = this.props.funFacts;
    let markup = function() {
      return {__html: funFacts};
    }
      return (
        <div className="staff-container">
          <a href={this.props.url}>
            <PortraitPull first={this.props.first} email={this.props.email} imageUrl={this.props.imageUrl}/>
            <h2 className="name">
                {this.props.first} {this.props.last}
            </h2>
          </a>
            <h3 className="meta-new-hires">{this.props.title}<br/>
          Start Date: {this._formatDate(this.props.startDate)}</h3>
            <div className="fun-facts" dangerouslySetInnerHTML={markup()}></div>
        </div>
      );
  }
}

export {
  NewStaffBox
};
