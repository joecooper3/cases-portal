import React from 'react';

class MobilePull extends React.Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: 'whatever'
    };
  }

  _convert(props) {
    if (this.props.phone !== '0') {
      let phoneM = props.phone.replace(/[^0-9]/g, "");
      let phoneArea = phoneM.substr(0,3);
      let phonePre = phoneM.substr(3,3);
      let phoneFour = phoneM.substr(6,4);
      return (
        <div className="mobile">
        <i className="fa fa-mobile"></i>({phoneArea}) {phonePre}-{phoneFour}
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

export {MobilePull};
