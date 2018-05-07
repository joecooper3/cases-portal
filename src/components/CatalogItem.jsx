import React from "react";

class CatalogItem extends React.Component {
  render() {
    <div className="catalog-item">
      <a href={this.props.pdfUrl} target="_blank">
        <img src={this.props.imageUrl} />
        <h3>{this.props.title}</h3>
      </a>
    </div>;
  }
}

export { CatalogItem };
