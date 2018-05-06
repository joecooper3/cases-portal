import React from "react";
import { PortraitPull } from "./PortraitPull.jsx";

class RelatedStaffBox extends React.Component {
  constructor() {
    super();
    this.state = {
      staffUrl: "#!"
    };
  }

  render() {
    return (
      <div className="staff-container">
        <a href={this.props.url}>
          <PortraitPull
            first={this.props.first}
            email={this.props.email}
            imageUrl={this.props.imageUrl}
          />
        </a>
        <div className="meta">
          <h2 className="name">
            <a href={this.props.url}>
              {this.props.first} {this.props.last}
            </a>
          </h2>
          <h3>{this.props.title}</h3>
        </div>
      </div>
    );
  }
}

export { RelatedStaffBox };
