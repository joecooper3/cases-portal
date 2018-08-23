import React from 'react';
import PropTypes from 'prop-types';

class PhonePull extends React.Component {
  _convert(props) {
    if (
      this.props.phone !== '0' &&
      this.props.phone !== '' &&
      this.props.phone &&
      this.props.phone.length >= 10
    ) {
      let phoneRaw = props.phone.replace(/[^0-9]/g, '');
      while (phoneRaw[0] === '1') {
        phoneRaw = phoneRaw.substr(1);
      }
      if (phoneRaw.length < 10) {
        return;
      }
      const phoneArea = phoneRaw.substr(0, 3);
      const phonePre = phoneRaw.substr(3, 3);
      const phoneFour = phoneRaw.substr(6, 4);
      return (
        <div className="phone">
          <i className="fa fa-phone" aria-hidden="true" />({phoneArea}) {phonePre}-{phoneFour}
        </div>
      );
    }
  }

  render() {
    return <div>{this._convert(this.props)}</div>;
  }
}

export { PhonePull };

PhonePull.propTypes = {
  phone: PropTypes.string
};

PhonePull.defaultProps = {
  phone: '0'
};
