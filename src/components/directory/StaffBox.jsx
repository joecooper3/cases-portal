import React from 'react';
import PropTypes from 'prop-types';

import { PortraitPull } from './PortraitPull.jsx';
import { PhonePull } from './PhonePull.jsx';
import { MobilePull } from './MobilePull.jsx';
import { SupervisorPull } from './SupervisorPull.jsx';

class StaffBox extends React.Component {
  _addressDisplay() {
    let firstLine = '';
    let secondLine = '';
    let thirdLine = '';
    switch (this.props.location) {
      case 'Brookyn - 151 Lawrence Street':
        firstLine = '151 Lawrence Street';
        secondLine = 'Brooklyn, NY 11201';
        break;
      case 'Manhattan - 100 Centre Street':
        firstLine = '100 Centre Street';
        secondLine = 'New York, NY 10027';
        break;
      case 'Bronx - 424 East 147th Street - 2nd Floor':
        firstLine = '424 E. 147th Street';
        secondLine = '2nd Floor';
        thirdLine = 'Bronx, NY 10455';
        break;
      case 'Bronx - East 161st Street - Room M10':
        firstLine = '215 East 161st Street';
        secondLine = 'Room M29';
        thirdLine = 'Bronx, NY 10451';
        break;
      case 'Brooklyn - 320 Jay Street - Room 4.37':
        firstLine = '320 Jay Street';
        secondLine = 'Room 4.37';
        thirdLine = 'Brooklyn, NY 11201';
        break;
      case 'Brooklyn - 510 Gates Avenue - 3rd Floor':
        firstLine = '510 Gates Avenue';
        secondLine = '3rd Floor';
        thirdLine = 'Brooklyn, NY 11216';
        break;
      case 'Harlem - 2090 Adam Clayton Powel Jr Boulevard - 8th Floor':
        firstLine = '2090 Adam Clayton Powell, Jr. Boulevard';
        secondLine = 'New York, NY 10027';
        break;
      case 'Jamaica Queens - 89 31 161st Street - 2nd Floor':
        firstLine = '89-31 161st Street';
        secondLine = '2nd Floor';
        thirdLine = 'Jamaica, NY 11432';
        break;
      default:
    }
    if (!firstLine) {
      return <div className="address" />;
    } else if (!thirdLine) {
      return (
        <div className="address">
          {firstLine}
          <br />
          {secondLine}
        </div>
      );
    }
    return (
      <div className="address">
        {firstLine}
        <br />
        {secondLine}
        <br />
        {thirdLine}
      </div>
    );
  }

  render() {
    if (this.props.category === 'staff') {
      return (
        <div className="staff-container">
          <PortraitPull
            first={this.props.first}
            email={this.props.email}
            imageUrl={this.props.imageUrl}
          />
          <div className="meta">
            <h2 className="name">
              {this.props.first} {this.props.last}
            </h2>
            <h3>{this.props.title}</h3>
            {this._addressDisplay(this.props.location)}
            <div className="email">
              <i className="fa fa-envelope-o" aria-hidden="true" />
              {this.props.email}
            </div>
            <PhonePull phone={this.props.phone} />
            <MobilePull phone={this.props.mobile} />
            <div className="supervisor">
              <SupervisorPull
                supervisorName={this.props.supervisorName}
                supervisorUrl={this.props.supervisorUrl}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="staff-container">
        <a href={this.props.url}>
          <PortraitPull
            first={this.props.first}
            email={this.props.email}
            imageUrl={this.props.imageUrl}
          />
        </a>
        <div className="meta">
          <h2 className="name">
            <a href={this.props.url}>
              {this.props.first} {this.props.last}
            </a>
          </h2>
          <h3>{this.props.title}</h3>
          {this._addressDisplay(this.props.location)}
          <div className="email">
            <i className="fa fa-envelope-o" aria-hidden="true" />
            {this.props.email}
          </div>
          <PhonePull phone={this.props.phone} />
          <MobilePull phone={this.props.mobile} />
          <div className="supervisor">
            <SupervisorPull
              supervisorName={this.props.supervisorName}
              supervisorUrl={this.props.supervisorUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

export { StaffBox };

StaffBox.propTypes = {
  location: PropTypes.string,
  category: PropTypes.string,
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  phone: PropTypes.string,
  mobile: PropTypes.string,
  imageUrl: PropTypes.string,
  supervisorName: PropTypes.string,
  supervisorUrl: PropTypes.string
};

StaffBox.defaultProps = {
  location: '',
  category: 'none',
  url: '#!',
  imageUrl: 'https://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg',
  supervisorName: '',
  supervisorUrl: '',
  phone: '',
  mobile: ''
};