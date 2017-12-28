import React from 'react';
import ReactDOM from 'react-dom';

class ItMe extends React.Component {
  render () {
    return ( <h2>I did it</h2> );
  }
}
ReactDOM.render(
  <ItMe />, document.getElementById('itititme')
);

const damn = 'yeah I guess so';

console.log('does ES6 work? ' + damn);
