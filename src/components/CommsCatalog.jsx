import React from "react";

import { CatalogItem } from "./CatalogItem.jsx";

class CommsCatalog extends React.Component {
  render() {
    let moddedArray = this.props.data.map(doc => {
      let newValue = doc;
      doc.pdfUrl = doc.tinyImage[0].replace("-pdf-150x150.jpg", ".pdf");
      return newValue;
    });
    console.log(moddedArray);
    let onePagerArray = moddedArray.filter(doc => {
      return doc.type === "onepager";
    });
    let brochureArray = moddedArray.filter(doc => {
      return doc.type === "brochure";
    });
    return (
      <div className="catalog-container">
        <h2>One-Pagers</h2>
        {onePagerArray.map((doc, i) => {
          return (
            <CatalogItem
              key={i}
              title={doc.name}
              url={doc.url}
              pdfUrl={doc.pdfUrl}
              imageUrl={doc.image[0]}
            />
          );
        })}
        <h2>Brochures</h2>
        {brochureArray.map((doc, i) => {
          return (
            <CatalogItem
              key={i}
              title={doc.name}
              url={doc.url}
              pdfUrl={doc.pdfUrl}
              imageUrl={doc.image[0]}
            />
          );
        })}
      </div>
    );
  }
}

export { CommsCatalog };
