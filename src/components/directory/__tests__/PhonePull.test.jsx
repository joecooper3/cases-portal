import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PhonePull } from '../PhonePull';

configure({ adapter: new Adapter() });

const wrapper = shallow(<PhonePull />);
const renderWrapper = inp => render(<PhonePull phone={inp} />);

const numAllDashes = '234-567-8901';
const numIgnoreLetters = 'it is (212) 553-6680 ext. 680';
const numStartsWithOne = '1111112125536400';
const numTooShort = '538922';

describe('phone pull', () => {
  it('should be a div', () => {
    expect(wrapper.contains(<div />)).toBe(true);
  });
  it('should replace dashes with correct formatting', () => {
    expect(renderWrapper(numAllDashes).text()).toEqual('(234) 567-8901');
  });
  it('should ignore letters and extraneous characters', () => {
    expect(renderWrapper(numIgnoreLetters).text()).toEqual('(212) 553-6680');
  });
  it('should ignore the country code (i.e., the 1 at the front of the #)', () => {
    expect(renderWrapper(numStartsWithOne).text()).toEqual('(212) 553-6400');
  });
  it('should not display if the # is too short', () => {
    expect(renderWrapper(numTooShort).text()).toEqual('');
  });
});
