import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CatalogItem from './CatalogItem.jsx';

class CommsArchive extends Component {
  render() {
    const moddedArray = this.props.data.map(doc => {
      const newValue = doc;
      if (doc.tinyImage[0]) {
        doc.pdfUrl = doc.tinyImage[0].replace('-pdf-150x150.jpg', '.pdf');
      }
      return newValue;
    });
    return (
      <div className="catalog-container">
        {moddedArray.map((doc, i) => (
          <CatalogItem
            key={i}
            title={doc.name}
            url={doc.url}
            pdfUrl={doc.pdfUrl}
            imageUrl={doc.image[0]}
          />
        ))}
      </div>
    );
  }
}

CommsArchive.propTypes = {
  data: PropTypes.array.isRequired
};

export default CommsArchive;
