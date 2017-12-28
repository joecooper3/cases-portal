import React from 'react';

const data = 'http://localhost:8888/cases-portal/wp-content/themes/cases_portal/data/convertcsv.json';
const requestUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/staff?_embed=true';

class SupervisorPull extends React.Component {
  constructor() {
    super();
    this.state = {
      supervisorName: '',
      supervisorUrl: '#!',
      supervisorSpan: ''
    };
  }
  componentWillMount() {
    fetch(data).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        data.info.map((info) => {
          if (this.props.supervisor === info.id) {
            let supervisorName = info.first + ' ' + info.last;
            let supervisorEmail = info.email;
            this.setState({supervisorName: supervisorName});
            fetch(requestUrl).then((response) => {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
              }
              response.json().then((data) => {
                for (let i = 0; i < data.length; i++) {
                let staffObject = data[i];
                if (staffObject.acf.email === supervisorEmail) {
                let supervisorUrl = staffObject.link;
                this.setState({supervisorUrl: supervisorUrl});
              }
              }
            })
            }).catch(function(err) {
              console.log('Fetch error the second', err);
            })
          }
        })
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  _formatSpan(name,url) {
    if (url !== '#!') {
    return (
      <span>
      Supervisor: <a href={url}>{name}</a>
    </span>
    );
    }
  }

  render() {
    return (
      <span>
        {this._formatSpan(this.state.supervisorName, this.state.supervisorUrl)}
  </span>);
  }
}

export {SupervisorPull};
