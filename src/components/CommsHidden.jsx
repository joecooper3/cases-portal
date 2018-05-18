import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CatalogItem } from './CatalogItem.jsx';

class CommsHidden extends Component {
  render() {
    return (
      <span key="mega-frag" className="hidden-man">
        {this.props.data.map((doc, i) => (
          <CatalogItem
            key={i}
            title={doc.name}
            url={doc.url}
            pdfUrl={doc.pdfUrl}
            imageUrl={doc.image[0]}
          />
        ))}
        <p>
          <a href={this.props.url}>See all</a>
        </p>
      </span>
    );
  }
}

CommsHidden.propTypes = {
  data: PropTypes.array.isRequired,
  url: PropTypes.string
};

CommsHidden.defaultProps = {
  url: '#!'
};

export { CommsHidden };
