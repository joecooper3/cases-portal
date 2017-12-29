import React from 'react';

const requestUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/staff?_embed=true&per_page=50';

class PortraitPull extends React.Component {
  constructor() {
    super();
    this.state = {
      backgroundImage: ''
    };
  }
  componentWillMount() {
    fetch(requestUrl).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        for (let i = 0; i < data.length; i++) {
        let staffObject = data[i];
        if (staffObject.acf.email === this.props.email) {
        let imageUrl = 'url("' + staffObject._embedded['wp:featuredmedia'][0]['source_url'] + '")';
        this.setState({backgroundImage: imageUrl});
      }
    }
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  render() {
    return(
      <div className="portrait" style={this.state}>
      </div>

  );}
}

export {PortraitPull};
