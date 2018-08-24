import React from 'react';
import PropTypes from 'prop-types';

const APIHost = __API__; // eslint-disable-line no-undef

function SideNavBox(props) {
  function _pullOutLinks(inp) {
    const numLinks = (inp.match(/a href/g) || []).length;
    const objArray = [];
    let title;
    let url;
    /* making this all open in a new window for now,
    but I'll eventually come back and check the link's extension
    and domain to automatically determine if it should */
    function targetBlankCheck(inp2) {
      if (inp2.includes('target="_blank')) {
        return '_blank';
      }
      return '_blank';
    }
    for (let i = 1; i < numLinks + 1; i += 1) {
      const newWindow = targetBlankCheck(inp.split('href')[i]);
      title = inp.split('">')[i].split('</a>')[0]; // eslint-disable-line prefer-destructuring
      url = inp.split('<a href="')[i].split('"')[0]; // eslint-disable-line prefer-destructuring
      objArray.push({ title, url, newWindow });
    }
    return objArray.map((part, i) => (
      <a key={i} href={part.url} target={part.newWindow}>
        {part.title}
      </a>
    ));
  }
  const editUrl = `${APIHost}/wp-admin/post.php?post=${props.id}&action=edit`;
  const { permissions } = props;
  return (
    <div className="individual-sidenav-container">
      <div className="resources-links">
        <div className="icon-secondary-container">
          <i className={`${props.icon} fa`} aria-hidden="true" />
          <h2>{props.name}</h2>
        </div>
        <ul>{_pullOutLinks(props.content)}</ul>
      </div>
      {permissions && (
        <div className="edit-sidenav">
          <a href={editUrl}>
            Edit <strong>{props.name}</strong>{' '}
            <i className="fa fa-long-arrow-right" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}

SideNavBox.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  permissions: PropTypes.bool
};

SideNavBox.defaultProps = {
  icon: 'fa-link',
  permissions: false
};

export default SideNavBox;
