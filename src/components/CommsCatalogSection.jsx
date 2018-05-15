import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CatalogItem } from './CatalogItem.jsx';

class CommsCatalogSection extends Component {
  constructor() {
    super();
    this.state = {
      readMore: false
    };
    this._moreToggle = this._moreToggle.bind(this);
  }
  _moreToggle() {
    this.setState(prevState => ({
      readMore: !prevState.readMore
    }));
  }
  render() {
    return (
      <React.Fragment>
        {this.props.data
          .slice(0, 6)
          .map((doc, i) => (
            <CatalogItem
              key={i}
              title={doc.name}
              url={doc.url}
              pdfUrl={doc.pdfUrl}
              imageUrl={doc.image[0]}
            />
          ))}
        {this.state.readMore
          ? this.props.data
              .slice(6, 20)
              .map((doc, i) => (
                <CatalogItem
                  key={i}
                  title={doc.name}
                  url={doc.url}
                  pdfUrl={doc.pdfUrl}
                  imageUrl={doc.image[0]}
                />
              ))
          : null}
        {this.props.data.length > 6 ? (
          <div className="button-container">
            <button onClick={this._moreToggle}>See more</button>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

CommsCatalogSection.propTypes = {
  data: PropTypes.array.isRequired
};

export { CommsCatalogSection };
