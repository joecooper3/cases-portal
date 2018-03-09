import React from 'react';

class PhonePull extends React.Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: 'whatever'
    };
  }

  _convert(props) {
    if (this.props.phone !== '0' && this.props.phone !== '' && this.props.phone) {
      let phoneM = props.phone.replace(/[^0-9]/g, "");
      let phoneArea = phoneM.substr(0,3);
      let phonePre = phoneM.substr(3,3);
      let phoneFour = phoneM.substr(6,4);
      return (
        <div className="phone">
        <i className="fa fa-phone" aria-hidden="true"></i> ({phoneArea}) {phonePre}-{phoneFour}
      </div>
      );
    }
    else {
      return;
    }
  }

  render() {

    return(
      <div>
     {this._convert(this.props)}
    </div>

  );}
}

export {PhonePull};
