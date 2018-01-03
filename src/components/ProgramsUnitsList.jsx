import React from 'react';

const requestUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/program';

class ProgramsUnitsList extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: [],
      dept: ''
    };
  }

  componentWillMount() {
    fetch(requestUrl).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        let titleBlock = document.getElementById('dept-title');
        let dept = titleBlock.getAttribute('data-id');
        this.setState({dept: dept});
        let filteredArray = [];
        data.map((info) => {
          if (dept === info.acf.parent_department[0].post_title) {
            filteredArray.push(info);
          }
        })
        this.setState({parts: filteredArray});
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }

  render() {
    if (this.state.parts.length < 1) {
      return (
        <span></span>
      )
    }
    else {
    return(
      <div>
      <h2>{this.state.dept} <br/>Programs & Units</h2>
      <ul>
    {this.state.parts.map((part, i) =>
      <a href={part.link} key={i}><li>{part.title.rendered}</li></a>
    )}
   </ul>
</div>
  )}
}
}

export {ProgramsUnitsList};
