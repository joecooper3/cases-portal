import React from 'react';

class SideNavBox extends React.Component {

  _pullOutLinks(inp) {
    let numLinks = (inp.match(/a href/g) || []).length;
    let objArray = [];
    let title, url;
    function targetBlankCheck(inp) {
      if (inp.includes('target\=\"_blank')) {
        return '_blank';
      }
      else {
        return '_self';
      }
    }
    for (let i = 1; i < numLinks+1; i++) {
      let newWindow = targetBlankCheck(inp.split('href')[i]);
      title = inp.split('\"\>')[i].split('\<\/a\>')[0];
      url = inp.split('\<a href\=\"')[i].split('\"')[0];
      objArray.push({title: title, url: url, newWindow: newWindow});
    }
    return (
      objArray.map((part,i) =>
        <a key={i} href={part.url} target={part.newWindow}>{part.title}</a>
      )
    );
  }
  render() {
    return (
      <div className="resources-links">
    	<div className="icon-secondary-container">
    		<i className={this.props.icon + " fa"} aria-hidden="true"></i>
    		<h2>{this.props.name}</h2>
    </div>
    <ul>
      {this._pullOutLinks(this.props.content)}
    </ul>
    </div>
    )
  }
}

export {SideNavBox};
