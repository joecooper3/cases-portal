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
        <CommsCatalogSection data={onePagerArray} title="One-Pagers" />
        <CommsCatalogSection data={brochureArray} title="Brochures" />
        <CommsCatalogSection data={flyerArray} title="Flyers" />
        <CommsCatalogSection data={miscArray} title="Miscellaneous" />
      </div>
    );
  }
}
CommsCatalog.propTypes = {
  data: PropTypes.array.isRequired
};

export { CommsCatalog };
