import React from 'react';
import PropTypes from 'prop-types';

import { PortraitPull } from './PortraitPull.jsx';

class RelatedStaffBox extends React.Component {
  render() {
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
        </div>
      </div>
    );
  }
}

export { RelatedStaffBox };

RelatedStaffBox.propTypes = {
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
  email: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

RelatedStaffBox.defaultProps = {
  url: '#!',
  title: '',
  imageUrl: 'http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg'
};
