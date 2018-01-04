import React from 'react';

const requestUrl = 'http://localhost:8888/cases-portal/wp-json/wp/v2/program?per_page=50';

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
        function compare(a,b) {
          let titleA = a.title.rendered.toUpperCase();
          let titleB = b.title.rendered.toUpperCase();
            if (titleA < titleB)
              return -1;
            if (titleA > titleB )
              return 1;
            return 0;
          }
        let sortedArray = filteredArray.sort(compare);
        this.setState({parts: sortedArray});
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }

  _removeSemicolon(inp){
    return inp.replace("&#038;","&");
  }

  render() {
    if (this.state.parts.length < 1) {
      return (
        <span></span>
      )
    }
    else {
    return(
      <div id="programs-units">
      <h2>{this.state.dept} <br/>Programs & Units</h2>
      <ul>
    {this.state.parts.map((part, i) =>
      <a href={part.link} key={i}><li>{this._removeSemicolon(part.title.rendered)}</li></a>
    )}
    {console.log("forget about life")}
   </ul>
</div>
  )}
}
}

export {ProgramsUnitsList};
