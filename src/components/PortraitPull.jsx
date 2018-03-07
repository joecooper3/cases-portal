import React from 'react';

class PortraitPull extends React.Component {
  constructor() {
    super();
    this.state = {
      backgroundImage: 'url("http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg")'
    };
  }
  render() {
    if (this.props.imageUrl) {
    return (
      <div className="portrait" style={{backgroundImage: 'url("'+ this.props.imageUrl + '")'}}>
      </div> );
    }
    else {
      return (
        <div className="portrait" style={{backgroundImage: this.state.backgroundImage}}>
        </div>
      );
      }
    }
}

export {PortraitPull};
