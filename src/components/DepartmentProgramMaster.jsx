import React from 'react';

const APIHost = __API__;

const progRequestUrl = APIHost + '/wp-json/wp/v2/program?per_page=50';
const deptRequestUrl = APIHost + '/wp-json/wp/v2/department?per_page=50';

class DepartmentProgramMaster extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: [],
      dept: '',
      prog: ''
    };
  }

  componentWillMount() {
    fetch(progRequestUrl).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        let filteredArray = [];
        data.map((info) => {
            filteredArray.push(info);
        })
        function compare(a, b) {
          let titleA = a.title.rendered.toUpperCase();
          let titleB = b.title.rendered.toUpperCase();
          if (titleA < titleB)
            return -1;
          if (titleA > titleB)
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


  _removeSemicolon(inp) {
    return inp.replace("&#038;", "&").replace("&#8217;", "’");
  }

  render() {
    if (this.state.parts.length < 1) {
      return (<span></span>)
    } else {
      return (<div id="programs-units">
        <h2>{this.state.dept}
          <br/>Programs & Units</h2>
        <ul>
          {this.state.parts.map((part, i) => {if(this._removeSemicolon(part.title.rendered) === this.state.prog) {
            return (<a href="#!" key={i} className="active-program">
              <li>
              {this._removeSemicolon(part.title.rendered)}</li>
            </a>)
          } else {
            return (<a href={part.link} key={i}>
              <li>{this._removeSemicolon(part.title.rendered)}</li>
            </a>)
          }
        })}
        </ul>
      </div>)
    }
  }
}

export {
  DepartmentProgramMaster
};
