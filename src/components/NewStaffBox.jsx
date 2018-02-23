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
          Start Date: {this.props.startDate}</h3>
            <div className="fun-facts" dangerouslySetInnerHTML={markup()}></div>
        </div>
      );
  }
}

export {
  NewStaffBox
};
