import React from 'react';
import PropTypes from 'prop-types';

import MobilePull from './MobilePull.jsx';
import PhonePull from './PhonePull.jsx';
import PortraitPull from './PortraitPull.jsx';

class DirectoryStaffBox extends React.Component {
  render() {
    const { program } = this.props;
    const { type } = this.props;
    if (type) {
      return (
        <a href={this.props.url}>
          <div className="staff-container">
            {this.props.type === 'dept' ? (
              <div className="dept-prog-circle dept-prog-circle-dept">Dept.</div>
            ) : (
              <div className="dept-prog-circle dept-prog-circle-program">Prog.</div>
            )}
            <div className="name-pos">
              <h2 className="name">
                {this.props.first} {this.props.last}
              </h2>
            </div>
          </div>
        </a>
      );
    } else if (program) {
      return (
        <a href={this.props.url}>
          <div className="staff-container">
            <PortraitPull
              first={this.props.first}
              email={this.props.email}
              imageUrl={this.props.imageUrl}
            />
            <div className="name-pos">
              <h2 className="name">
                {this.props.first} {this.props.last}
              </h2>
              <h3>{this.props.title}</h3>
              <h3 className="dept-prog">{this.props.program}</h3>
            </div>
            <div className="contact">
              <div className="email">
                <i className="fa fa-envelope-o" aria-hidden="true" />
                {this.props.email}
              </div>
              <PhonePull phone={this.props.phone} />
              <MobilePull phone={this.props.mobile} />
            </div>
          </div>
        </a>
      );
    }
    return (
      <a href={this.props.url}>
        <div className="staff-container">
          <PortraitPull
            first={this.props.first}
            email={this.props.email}
            imageUrl={this.props.imageUrl}
          />
          <div className="name-pos">
            <h2 className="name">
              {this.props.first} {this.props.last}
            </h2>
            <h3>{this.props.title}</h3>
            <h3 className="dept-prog">{this.props.department}</h3>
          </div>
          <div className="contact">
            <div className="email">
              <i className="fa fa-envelope-o" aria-hidden="true" />
              {this.props.email}
            </div>
            <PhonePull phone={this.props.phone} />
            <MobilePull phone={this.props.mobile} />
          </div>
        </div>
      </a>
    );
  }
}

export default DirectoryStaffBox;

DirectoryStaffBox.propTypes = {
  program: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  department: PropTypes.string,
  phone: PropTypes.string,
  mobile: PropTypes.string,
  title: PropTypes.string,
  email: PropTypes.string
};

DirectoryStaffBox.defaultProps = {
  type: '',
  program: '',
  department: '',
  url: '#!',
  imageUrl: '',
  phone: '',
  mobile: '',
  title: '',
  email: ''
};
