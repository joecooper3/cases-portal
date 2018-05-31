import React from 'react';
import PropTypes from 'prop-types';

class PortraitPull extends React.Component {
  render() {
    return (
      <div className="portrait" style={{ backgroundImage: `url("${this.props.imageUrl}")` }} />
    );
  }
}

export { PortraitPull };

PortraitPull.propTypes = {
  imageUrl: PropTypes.string
};

PortraitPull.defaultProps = {
  imageUrl: 'http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg'
};
