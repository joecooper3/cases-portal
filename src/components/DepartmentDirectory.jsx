import React from "react";

class DepartmentDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      staffUrl: "#!"
    };
  }
  _removeSemicolon(inp) {
    return inp.replace("&#038;", "&").replace("&#8217;", "’");
  }
  render() {
    let completeClassName = `fa ${this.props.icon}`;
    if (this.props.kids.length > 0) {
      return (
        <div className="dept-dir-container">
          <a href={this.props.url} className="dept-header">
            <div className="dept-dir-circle">
              <i className={completeClassName} aria-hidden="true" />
            </div>
            <h2>{this.props.name}</h2>
          </a>
          <ul>
            {this.props.kids.map((kid, i) => {
              return (
                <li key={i}>
                  <a href={kid.link}>
                    {this._removeSemicolon(kid.title.rendered)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="dept-dir-container">
          <a href={this.props.url} className="dept-header">
            <div className="dept-dir-circle">
              <i className={completeClassName} aria-hidden="true" />
            </div>
            <h2>{this.props.name}</h2>
          </a>
        </div>
      );
    }
  }
}

export { DepartmentDirectory };
