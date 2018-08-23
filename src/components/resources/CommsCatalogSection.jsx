import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import { CommsHidden } from './CommsHidden.jsx';
import { CatalogItem } from './CatalogItem.jsx';

const COLLAPSED_ITEM_NUM = 3;
const EXPANDED_ITEM_NUM = 9;

class CommsCatalogSection extends Component {
  constructor() {
    super();
    this.state = {
      readMore: false,
      readMoreText: 'See more'
    };
    this._isExpanded = this._isExpanded.bind(this);
    this._moreToggle = this._moreToggle.bind(this);
  }
  _isExpanded() {
    return `fa fa-caret-down${this.state.readMore ? ' expanded' : ''}`;
  }
  _moreToggle() {
    if (this.state.readMore) {
      this.setState({ readMoreText: 'See more' });
    } else {
      this.setState({ readMoreText: 'See less' });
    }
    this.setState(prevState => ({
      readMore: !prevState.readMore
    }));
  }
  render() {
    return (
      <React.Fragment>
        <a href={this.props.seeAllUrl} className="catalog-header">
          <h2>{this.props.title}</h2>
        </a>
        {this.props.data
          .slice(0, COLLAPSED_ITEM_NUM)
          .map((doc, i) => (
            <CatalogItem
              key={i}
              title={doc.name}
              url={doc.url}
              pdfUrl={doc.pdfUrl}
              imageUrl={doc.image[0]}
            />
          ))}
        <CSSTransitionGroup
          transitionName="slide"
          transitionAppear={false}
          transitionAppearTimeout={500}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {this.state.readMore && (
            <CommsHidden
              data={this.props.data.slice(COLLAPSED_ITEM_NUM, EXPANDED_ITEM_NUM)}
              url={this.props.seeAllUrl}
              title={this.props.title}
            />
          )}
        </CSSTransitionGroup>
        {this.props.data.length > COLLAPSED_ITEM_NUM ? (
          <div className="button-container">
            <button onClick={this._moreToggle}>
              {this.state.readMoreText} <i className={this._isExpanded()} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

CommsCatalogSection.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  seeAllUrl: PropTypes.string.isRequired
};

export { CommsCatalogSection };
