import React from 'react';
import { render } from 'react-dom';

import { DeptFetch } from './components/DeptFetch.jsx';
import { ProgramsUnitsList } from './components/ProgramsUnitsList.jsx';
import { SearchBox } from './components/SearchBox.jsx';

require('../sass/style.scss');

const APIHost = __API__; // eslint-disable-line no-undef

const data = `${APIHost}/wp-content/themes/cases_portal/data/casescsv.json`;
const staffUrl = `${APIHost}/wp-json/portal/v2/bigstaff/`;
const deptUrl = `${APIHost}/wp-json/wp/v2/department?_embed=true&per_page=100`;
const programUrl = `${APIHost}/wp-json/wp/v2/program?_embed=true&per_page=100`;
const avatarUrl = `${APIHost}/wp-json/portal/v2/users`;

const apiRequestJason = fetch(data).then(response => response.json());

const apiRequestStaff = fetch(staffUrl).then(response => response.json());

const apiRequestDept = fetch(deptUrl).then(response => response.json());

const apiRequestProgram = fetch(programUrl).then(response => response.json());

const apiRequestAvatar = fetch(avatarUrl).then(response => response.json());

const promiseArray = [
  apiRequestJason,
  apiRequestStaff,
  apiRequestDept,
  apiRequestProgram,
  apiRequestAvatar
];

const titleBlock = document.getElementById('dept-title');
const dept = titleBlock.getAttribute('data-id');

console.log('number on the board');

const masterData = Promise.all(promiseArray).then(values => {
  const supervisor = titleBlock.getAttribute('supervisor-id');
  const filteredArray = [];
  const supervisorArray = [];
  const progUnitListArray = [];
  const jasonData = values[0].info;
  const staffPages = values[1];
  const deptPages = values[2];
  const programPages = values[3];
  function compareSearch(a, b) {
    // function for sorting by array by first name
    const nameA = a.first.toUpperCase();
    const nameB = b.first.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }
  const sortedArraySearch = jasonData.sort(compareSearch);
  function supervisorUrlPull(soup) {
    const soupEmail = `${soup}@cases.org`;
    for (let i = 0; i < staffPages.length; i += 1) {
      if (staffPages[i].email === soupEmail) {
        return staffPages[i].url;
      }
    }
  }
  function supervisorNamePull(soup) {
    const soupEmail = `${soup}@cases.org`;
    for (let i = 0; i < jasonData.length; i += 1) {
      if (jasonData[i].email === soupEmail) {
        return `${jasonData[i].first} ${jasonData[i].last}`;
      }
    }
  }
  const supervisorFormatted = supervisor.replace(/\s/g, '');
  const supervisorFormattedArray = supervisorFormatted.split(',');
  jasonData.map(info => {
    if (supervisorFormattedArray.includes(info.email)) {
      supervisorArray.push(info);
    } else if (info.department === dept && info.program === '') {
      filteredArray.push(info);
    }
  });
  const sortedArray = filteredArray.sort(compareSearch);
  function dataMatcher(arr) {
    arr.forEach(item => {
      const result = staffPages.filter(staffItem => staffItem.email === item.email);
      item.url = result[0] !== undefined ? result[0].url : null;
      item.imageUrl =
        result[0] !== undefined && result[0].image !== undefined
          ? result[0].image
          : 'http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg';
      item.supervisorUrl = result[0] !== undefined ? supervisorUrlPull(item.supervisor) : null;
      item.supervisorName = result[0] !== undefined ? supervisorNamePull(item.supervisor) : null;
    });
  }
  dataMatcher(sortedArray);
  dataMatcher(supervisorArray);
  dataMatcher(sortedArraySearch);
  const deptProgArray = [];
  for (let i = 0; i < deptPages.length; i += 1) {
    deptProgArray.push({
      first: deptPages[i].title.rendered,
      last: '',
      type: 'dept',
      url: deptPages[i].link
    });
  }
  for (let i = 0; i < programPages.length; i += 1) {
    if (programPages[i].acf.acronym) {
      deptProgArray.push({
        first: programPages[i].title.rendered,
        last: `(${programPages[i].acf.acronym})`,
        type: 'program',
        url: programPages[i].link
      });
    } else {
      deptProgArray.push({
        first: programPages[i].title.rendered,
        last: '',
        type: 'program',
        url: programPages[i].link
      });
    }
  }
  const final = {
    searchBox: sortedArraySearch.concat(deptProgArray),
    supervisor: supervisorArray,
    main: sortedArray,
    progUnitList: progUnitListArray,
    deptName: dept
  };
  return final;
});

class DeptFetchApp extends React.Component {
  constructor() {
    super();
    this.state = {
      parts: [],
      supervisorParts: [],
      staffAPI: []
    };
  }
  componentWillMount() {
    masterData.then(yeah => {
      this.setState({ parts: yeah.main });
      this.setState({ supervisorParts: yeah.supervisor });
    });
  }
  _removeSemicolon(inp) {
    return inp.replace('&#038;', '&').replace('&#8217;', '’');
  }

  render() {
    return (
      <div>
        <DeptFetch supervisorParts={this.state.supervisorParts} parts={this.state.parts} />
      </div>
    );
  }
}

class ProgramsUnitsListApp extends React.Component {
  constructor() {
    super();
    this.state = {
      progUnitParts: [],
      deptName: '',
      loaded: false
    };
  }
  componentWillMount() {
    apiRequestProgram.then(yeah => {
      let progUnitListArray = [];
      yeah.map(info => {
        if (dept === info.acf.parent_department[0].post_title) {
          progUnitListArray.push(info);
        }
      });
      function compareProgs(a, b) {
        const titleA = a.title.rendered.toUpperCase();
        const titleB = b.title.rendered.toUpperCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      }
      progUnitListArray = progUnitListArray.sort(compareProgs);
      this.setState({ progUnitParts: progUnitListArray });
      this.setState({ deptName: dept });
      this.setState({ loaded: true });
    });
  }
  render() {
    if (this.state.loaded) {
      return (
        <ProgramsUnitsList name={this.state.deptName} type="dept" data={this.state.progUnitParts} />
      );
    }

    return <br />;
  }
}

class SearchBoxApp extends React.Component {
  constructor() {
    super();
    this.state = {
      searchParts: [],
      loaded: false
    };
  }
  componentWillMount() {
    masterData.then(yeah => {
      this.setState({ searchParts: yeah.searchBox });
      this.setState({ loaded: true });
    });
  }

  render() {
    if (this.state.loaded === true) {
      return <SearchBox data={this.state.searchParts} />;
    }

    return <div role="search" className="sbx-custom__wrapper" />;
  }
}

render(<DeptFetchApp />, document.getElementById('app-area'));
render(<ProgramsUnitsListApp />, document.getElementById('sec-holder-one'));
render(<SearchBoxApp />, document.getElementById('particular-search'));
