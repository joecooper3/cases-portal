import React from 'react';
import PropTypes from 'prop-types';
import { RelatedStaffBox } from './RelatedStaffBox.jsx';

class RelatedStaff extends React.Component {
  static _shuffleArray(arr) {
    let currentIndex = arr.length;
    let tempValue = arr.length;
    let randomIndex = arr.length;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tempValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tempValue;
    }
    return arr;
  }

  render() {
    if (this.props.type === 'supervisor') {
      return (
        <div id="related-contacts">
          <div className="related-contacts-container">
            <h2 className="rel-staff-h2">
              <strong>
                {this.props.first} {this.props.last}
              </strong>{' '}
              supervises:
            </h2>
            {this.props.data.map((part, key) => (
              <RelatedStaffBox
                key={key}
                first={part.first}
                last={part.last}
                imageUrl={part.imageUrl}
                title={part.title}
                url={part.url}
              />
            ))}
          </div>
        </div>
      );
    }
    const randomizedArray = this.constructor._shuffleArray(this.props.data);
    return (
      <div id="related-contacts">
        <div className="related-contacts-container">
          <h2 className="rel-staff-h2">
            Other <strong>{this.props.deptProg}</strong> staff:
          </h2>
          {randomizedArray
            .slice(0, 3)
            .map((part, key) => (
              <RelatedStaffBox
                key={key}
                first={part.first}
                last={part.last}
                imageUrl={part.imageUrl}
                title={part.title}
                url={part.url}
              />
            ))}
        </div>
      </div>
    );
  }
}

export { RelatedStaff };

RelatedStaff.propTypes = {
  type: PropTypes.string.isRequired,
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  deptProg: PropTypes.string.isRequired
};
