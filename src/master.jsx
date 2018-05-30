import React from 'react';
import { render } from 'react-dom';

// import { DeptFetch } from './components/DeptFetch.jsx';
// import { ProgramsUnitsList } from './components/ProgramsUnitsList.jsx';
import { SearchBox } from './components/SearchBox.jsx';

require('../sass/style.scss');

const APIHost = __API__; // eslint-disable-line no-undef

const data = `${APIHost}/wp-content/themes/cases_portal/data/casescsv.json`;
const directoryUrl = `${APIHost}/wp-json/portal/v2/bigstaff/`;
const avatarUrl = `${APIHost}/wp-json/portal/v2/users`;
const commsUrl = `${APIHost}/wp-json/portal/v2/comms`;

const apiRequestJason = fetch(data).then(response => response.json());
const apiRequestDirectory = fetch(directoryUrl).then(response => response.json());
const apiRequestAvatar = fetch(avatarUrl).then(response => response.json());

const promiseArray = [apiRequestJason, apiRequestDirectory, apiRequestAvatar];

const dataBlock = document.getElementById('primary');
const pageType = dataBlock.getAttribute('data-id');

function staffSorter(a, b) {
  // function for sorting by array by first name
  const nameA = a.first.toUpperCase();
  const nameB = b.first.toUpperCase();
  const lastA = a.last.toUpperCase();
  const lastB = b.last.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  if (lastA < lastB) return -1;
  if (lastA > lastB) return 1;
  return 0;
}
function deptProgSorter(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
}

Promise.all(promiseArray)
  .then(values => {
    const jasonData = values[0].info;
    const directoryData = values[1];
    const avatarData = values[2];
    function supervisorUrlPull(soup) {
      const soupEmail = `${soup}@cases.org`;
      const soupEntry = directoryData.filter(inp => inp.email === soupEmail)[0];
      return soupEntry !== undefined && soupEntry.url;
    }
    function supervisorNamePull(soup) {
      const soupEmail = `${soup}@cases.org`;
      const soupEntry = jasonData.filter(inp => inp.email === soupEmail)[0];
      return soupEntry !== undefined && `${soupEntry.first} ${soupEntry.last}`;
    }
    function avatarPuller(inp) {
      const userUploadedAvatar = avatarData.filter(avItem => avItem.email === inp.email);
      const newHireAvatar = directoryData.filter(avItem => avItem.email === inp.email);
      if (userUploadedAvatar.length > 0) {
        return userUploadedAvatar[0].avatarCode;
      } else if (newHireAvatar[0].image) {
        return newHireAvatar[0].image;
      }
      return 'http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg';
    }
    const staffDataCombined = jasonData
      .map(entry => {
        const result = directoryData.filter(dirItem => dirItem.email === entry.email);
        entry.url = result[0] !== undefined ? result[0].url : null;
        entry.imageUrl = result[0] !== undefined && avatarPuller(result[0]);
        entry.supervisorUrl = result[0] !== undefined && supervisorUrlPull(entry.supervisor);
        entry.supervisorName = result[0] !== undefined && supervisorNamePull(entry.supervisor);
        return entry;
      })
      .sort(staffSorter);
    const deptData = directoryData.filter(inp => inp.type === 'dept').sort(deptProgSorter);
    const programData = directoryData.filter(inp => inp.type === 'program').sort(deptProgSorter);
    const deptDataSearch = deptData.map(entry => {
      entry.first = entry.name;
      entry.last = entry.acronym;
      return entry;
    });
    const programDataSearch = programData.map(entry => {
      if (entry.acronym === null) {
        entry.acronym = '';
      }
      entry.first = entry.name;
      if (entry.acronym !== '') {
        entry.last = `(${entry.acronym})`;
      } else {
        entry.last = '';
      }
      return entry;
    });
    const searchData = staffDataCombined.concat(deptDataSearch).concat(programDataSearch);
    const final = { searchData };
    return final;
    // const supervisorFormatted = supervisor.replace(/\s/g, '');
    // const supervisorFormattedArray = supervisorFormatted.split(',');
    // jasonData.map(info => {
    //   if (supervisorFormattedArray.includes(info.email)) {
    //     supervisorArray.push(info);
    //   } else if (info.department === dept && info.program === '') {
    //     filteredArray.push(info);
    //   }
    // });
    // const sortedArray = filteredArray.sort(compareSearch);
    // const final = {
    //   searchBox: sortedArraySearch.concat(deptProgArray),
    //   supervisor: supervisorArray,
    //   main: sortedArray,
    //   progUnitList: progUnitListArray,
    //   deptName: dept
    // };
    // return final;
  })
  .then(yeah => {
    render(<SearchBox data={yeah.searchData} />, document.getElementById('particular-search'));
  });

// class DeptFetchApp extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       parts: [],
//       supervisorParts: [],
//       staffAPI: []
//     };
//   }
//   componentWillMount() {
//     masterData.then(yeah => {
//       this.setState({ parts: yeah.main });
//       this.setState({ supervisorParts: yeah.supervisor });
//     });
//   }
//   _removeSemicolon(inp) {
//     return inp.replace('&#038;', '&').replace('&#8217;', '’');
//   }

//   render() {
//     return (
//       <div>
//         <DeptFetch supervisorParts={this.state.supervisorParts} parts={this.state.parts} />
//       </div>
//     );
//   }
// }

// class ProgramsUnitsListApp extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       progUnitParts: [],
//       deptName: '',
//       loaded: false
//     };
//   }
//   componentWillMount() {
//     apiRequestProgram.then(yeah => {
//       let progUnitListArray = [];
//       yeah.map(info => {
//         if (dept === info.acf.parent_department[0].post_title) {
//           progUnitListArray.push(info);
//         }
//       });
//       function compareProgs(a, b) {
//         const titleA = a.title.rendered.toUpperCase();
//         const titleB = b.title.rendered.toUpperCase();
//         if (titleA < titleB) return -1;
//         if (titleA > titleB) return 1;
//         return 0;
//       }
//       progUnitListArray = progUnitListArray.sort(compareProgs);
//       this.setState({ progUnitParts: progUnitListArray });
//       this.setState({ deptName: dept });
//       this.setState({ loaded: true });
//     });
//   }
//   render() {
//     if (this.state.loaded) {
//       return (
//         <ProgramsUnitsList name={this.state.deptName} type="dept" data={this.state.progUnitParts} />
//       );
//     }

//     return <br />;
//   }
// }

// class SearchBoxApp extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       searchParts: [],
//       loaded: false
//     };
//   }
//   componentWillMount() {
//     masterData.then(yeah => {
//       this.setState({ searchParts: yeah.searchBox });
//       this.setState({ loaded: true });
//     });
//   }

//   render() {
//     if (this.state.loaded === true) {
//       return <SearchBox data={this.state.searchParts} />;
//     }

//     return <div role="search" className="sbx-custom__wrapper" />;
//   }
// }

// render(<DeptFetchApp />, document.getElementById('app-area'));
// render(<ProgramsUnitsListApp />, document.getElementById('sec-holder-one'));
