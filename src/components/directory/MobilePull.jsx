import React from 'react';
import PropTypes from 'prop-types';

class MobilePull extends React.Component {
  _convert(props) {
    if (this.props.phone !== '0' && this.props.phone !== '' && this.props.phone) {
      const phoneM = props.phone.replace(/[^0-9]/g, '');
      const phoneArea = phoneM.substr(0, 3);
      const phonePre = phoneM.substr(3, 3);
      const phoneFour = phoneM.substr(6, 4);
      return (
        <div className="mobile">
          <i className="fa fa-mobile" />({phoneArea}) {phonePre}-{phoneFour}
        </div>
      );
    }
  }

  render() {
    return <div>{this._convert(this.props)}</div>;
  }
}

export { MobilePull };

MobilePull.propTypes = {
  phone: PropTypes.string
};

MobilePull.defaultProps = {
  phone: ''
};
