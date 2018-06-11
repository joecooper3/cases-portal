import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class DocsNav extends Component {
  constructor() {
    super();
    this.state = {
      prevTitle: '',
      nextTitle: '',
      prevUrl: '',
      nextUrl: ''
    };
  }
  componentDidMount() {
    if (this.props.category) {
      fetch(`${__API__}/wp-json/wp-api-menus/v2/menu-locations/${this.props.category}`) // eslint-disable-line no-undef
        .then(response => response.json())
        .then(menuArr => {
          const currentPageObj = menuArr.filter(item => this.props.id === item.object_id)[0];
          const currentPageNumber = currentPageObj.order;
          const currentPageMenuId = currentPageObj.ID;
          if (currentPageNumber > 1) {
            const prevPageNumber = currentPageNumber - 1;
            const prevPage = menuArr.filter(item => prevPageNumber === item.order)[0];
            this.setState({ prevTitle: prevPage.title });
            this.setState({ prevUrl: prevPage.url });
          }
          if (currentPageNumber < menuArr.length) {
            const nextPageNumber = currentPageNumber + 1;
            const nextPage = menuArr.filter(item => nextPageNumber === item.order)[0];
            this.setState({ nextTitle: nextPage.title });
            this.setState({ nextUrl: nextPage.url });
          }
          const currentDocMenuItem = document.getElementById(`menu-item-${currentPageMenuId}`);
          const activeP = document.createElement('span');
          const activePText = document.createTextNode(this.props.pageTitle);
          activeP.appendChild(activePText);
          currentDocMenuItem.innerHTML = '';
          currentDocMenuItem.classList.add('active');
          currentDocMenuItem.appendChild(activeP);
        });
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.prevTitle && (
          <div className="nav-previous">
            <div className="title">Previous Page</div>
            <a href={this.state.prevUrl}>← {this.state.prevTitle}</a>
          </div>
        )}
        {!this.state.prevTitle && this.state.nextTitle && <div style={{ width: `50%` }} />}
        {this.state.nextTitle && (
          <div className="nav-next">
            <div className="title">Next Page</div>
            <a href={this.state.nextUrl}>{this.state.nextTitle} →</a>
          </div>
        )}
      </Fragment>
    );
  }
}

export { DocsNav };

DocsNav.propTypes = {
  id: PropTypes.number.isRequired,
  category: PropTypes.string,
  pageTitle: PropTypes.string
};

DocsNav.defaultProps = {
  category: '',
  pageTitle: ''
};
