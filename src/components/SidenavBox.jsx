import React from "react";

const APIHost = __API__;

class SideNavBox extends React.Component {
  _pullOutLinks(inp) {
    let numLinks = (inp.match(/a href/g) || []).length;
    let objArray = [];
    let title, url;
    /* making this all open in a new window for now,
    but I'll eventually come back and check the link's extension
    and domain to automatically determine if it should */
    function targetBlankCheck(inp) {
      if (inp.includes('target="_blank')) {
        return "_blank";
      } else {
        return "_blank";
      }
    }
    for (let i = 1; i < numLinks + 1; i++) {
      let newWindow = targetBlankCheck(inp.split("href")[i]);
      title = inp.split('">')[i].split("</a>")[0];
      url = inp.split('<a href="')[i].split('"')[0];
      objArray.push({ title: title, url: url, newWindow: newWindow });
    }
    return objArray.map((part, i) => (
      <a key={i} href={part.url} target={part.newWindow}>
        {part.title}
      </a>
    ));
  }
  render() {
    let editUrl =
      APIHost + "/wp-admin/post.php?post=" + this.props.id + "&action=edit";
    let permissions = this.props.permissions;
    return (
      <div className="individual-sidenav-container">
        <div className="resources-links">
          <div className="icon-secondary-container">
            <i className={this.props.icon + " fa"} aria-hidden="true" />
            <h2>{this.props.name}</h2>
          </div>
          <ul>{this._pullOutLinks(this.props.content)}</ul>
        </div>
        {this.props.permissions === "sure" ? (
          <div className="edit-sidenav">
            <a href={editUrl}>
              Edit <strong>{this.props.name}</strong>{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <span />
        )}
      </div>
    );
  }
}

export { SideNavBox };
