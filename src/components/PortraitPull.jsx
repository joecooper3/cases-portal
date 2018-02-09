import React from 'react';

const requestUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/staff?_embed=true&per_page=50';

class PortraitPull extends React.Component {
  constructor() {
    super();
    this.state = {
      backgroundImage: 'url("http://localhost:8888/cases-portal/wp-content/themes/cases_portal/images/silhouette.svg")'
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
