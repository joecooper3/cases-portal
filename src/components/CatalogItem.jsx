import React from "react";

class CatalogItem extends React.Component {
  render() {
    return (
      <div className="catalog-item">
        <a href={this.props.url}>
          <h3>{this.props.title}</h3>
          <img src={this.props.imageUrl} />
        </a>
        <div className="details">
          <a href={this.props.pdfUrl} target="_blank">
            Download PDF <i className="fa fa-file-pdf-o" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }
}

export { CatalogItem };
