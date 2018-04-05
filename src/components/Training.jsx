import React from 'react';

class Training extends React.Component {

  _formatDate(inp) {
    let year = inp.substring(0,4);
    let month = inp.substring(4,6);
    let day = inp.substring(6,8);
    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    let removeOh = function(day) {
      if (day.substring(0,1) === '0') {
        return day.substring(1,2);
      }
      else {
        return day;
      }
    }
    let monthDisplay = monthNames[Number(month)-1];
    let dayDisplay = removeOh(day);
    return monthDisplay + " " + dayDisplay + ", " + year;
  }

  _formatTime(inp){
    let hour = parseInt(inp.substring(0,2));
    let minutes = inp.substring(3,5);
    let ampm;
    if (hour > 0 && hour < 12) {
      ampm = "AM";
    }
    else {
      ampm = "PM";
    }
    if (hour > 12) {
      hour = hour - 12;
    }
    return hour + ":" + minutes + " " + ampm;
  }

  render() {
    return (<li><div className="date">{this._formatDate(this.props.date)}</div>
    		<div className="location">{this.props.location}</div>
    		<div className="time">{this._formatTime(this.props.startTime)}&ndash;{this._formatTime(this.props.endTime)}</div>
    	</li>
    )
  }
}

export {Training};
