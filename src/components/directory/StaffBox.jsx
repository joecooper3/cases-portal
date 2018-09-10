import React from 'react';
import PropTypes from 'prop-types';

import PortraitPull from './PortraitPull.jsx';
import PhonePull from './PhonePull.jsx';
import MobilePull from './MobilePull.jsx';
import SupervisorPull from './SupervisorPull.jsx';

class StaffBox extends React.Component {
  _addressDisplay(street, floor, csz) {
    if (!street || !csz) {
      return <div className="address" />;
    } else if (!floor) {
      return (
        <div className="address">
          {street}
          <br />
          {csz}
        </div>
      );
    }
    return (
      <div className="address">
        {street}
        <br />
        {floor}
        <br />
        {csz}
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
            {this._addressDisplay(this.props.street, this.props.floor, this.props.csz)}
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

export default StaffBox;

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
  supervisorUrl: PropTypes.string,
  street: PropTypes.string,
  floor: PropTypes.string,
  csz: PropTypes.string
};

StaffBox.defaultProps = {
  location: '',
  category: 'none',
  url: '#!',
  imageUrl: 'https://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg',
  supervisorName: '',
  supervisorUrl: '',
  phone: '',
  mobile: '',
  street: '',
  floor: '',
  csz: ''
};
