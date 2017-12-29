import React from 'react';

class Crumb extends React.Component {

  constructor() {
    super();
    this.state = {
      phoneNumber: 'whatever'
    };
  }
  _convert(props) {
         if (props.type === 'dept') {
           return (<div id="staff-dept">
             <a href="#!">{this.props.name}</a>
           </div>);
         }
         else if(props.type === 'program') {
           return (<div id="staff-program">
             <a href="#!">{this.props.name}</a>
           </div>);
         } else {
           return;
         }
       }

  render() {
    return (
      <div>
      {this._convert(this.props)}
    </div>
    );

  }
}

export default Crumb;
