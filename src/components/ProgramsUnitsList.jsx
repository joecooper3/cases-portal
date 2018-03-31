import React from 'react';

class ProgramsUnitsList extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: [],
      dept: '',
      prog: ''
    };
  }

  componentWillMount() {
        let titleBlock = document.getElementById('dept-title');
        let pageType = this.props.type;
        if (pageType === 'dept') {
          this.setState({dept: this.props.name});
        } else if (pageType === 'program') {
          this.setState({prog: this.props.name});
          this.props.data.map((info) => {
            if (this.state.prog === this._removeSemicolon(info.title.rendered)) {
              let dept = info.acf.parent_department[0].post_title;
              this.setState({dept: dept});
            }
          })
        }
        this.setState({parts: this.props.data});
        console.log(this.props.data);
        console.log(this.props.name);
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
  ProgramsUnitsList
};
