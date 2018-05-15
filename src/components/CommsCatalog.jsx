import React from 'react';
import PropTypes from 'prop-types';

import { CommsCatalogSection } from './CommsCatalogSection.jsx';

class CommsCatalog extends React.Component {
  render() {
    const moddedArray = this.props.data.map(doc => {
      const newValue = doc;
      if (doc.tinyImage[0]) {
        doc.pdfUrl = doc.tinyImage[0].replace('-pdf-150x150.jpg', '.pdf');
      }
      return newValue;
    });
    const onePagerArray = moddedArray.filter(doc => doc.type === 'onepager');
    const brochureArray = moddedArray.filter(doc => doc.type === 'brochure');
    const flyerArray = moddedArray.filter(doc => doc.type === 'flyer');
    const miscArray = moddedArray.filter(doc => doc.type === 'flowchart' || doc.type === 'misc');
    return (
      <div className="catalog-container">
        <h2>One-Pagers {onePagerArray.length}</h2>
        <CommsCatalogSection data={onePagerArray} />
        <h2>Brochures {brochureArray.length}</h2>
        <CommsCatalogSection data={brochureArray} />
        <h2>Flyers {flyerArray.length}</h2>
        <CommsCatalogSection data={flyerArray} />
        <h2>Miscellaneous {miscArray.length}</h2>
        <CommsCatalogSection data={miscArray} />
      </div>
    );
  }
}
CommsCatalog.propTypes = {
  data: PropTypes.array.isRequired
};

export { CommsCatalog };
