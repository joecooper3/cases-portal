import React from 'react';
import PropTypes from 'prop-types';

function CatalogItem(props) {
  return (
    <div className="catalog-item">
      <a href={props.url}>
        <h3>{props.title}</h3>
        <img src={props.imageUrl} alt={props.title} />
      </a>
      <div className="details">
        <a href={props.pdfUrl} target="_blank" rel="noopener noreferrer">
          Download PDF <i className="fa fa-file-pdf-o" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

CatalogItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  pdfUrl: PropTypes.string.isRequired
};

export default CatalogItem;
