import React from 'react';
import { render } from 'react-dom';

import { CasesOrgNews } from './components/CasesOrgNews.jsx';
import { SearchBox } from './components/SearchBox.jsx';
import { NewStaff } from './components/NewStaff.jsx';
import AdminBox from './components/AdminBox.jsx';

require('../sass/style.scss');

const APIHost = __API__; // eslint-disable-line no-undef

const data = `${APIHost}/wp-content/themes/cases_portal/data/casescsv.json`;
const staffUrl = `${APIHost}/wp-json/portal/v2/bigstaff/`;
const deptUrl = `${APIHost}/wp-json/wp/v2/department?_embed=true&per_page=100`;
const programUrl = `${APIHost}/wp-json/wp/v2/program?_embed=true&per_page=100`;

const apiRequestJason = fetch(data).then(response => response.json());

const apiRequestStaff = fetch(staffUrl).then(response => response.json());

const apiRequestDept = fetch(deptUrl).then(response => response.json());

const apiRequestProgram = fetch(programUrl).then(response => response.json());

const promiseArray = [apiRequestJason, apiRequestStaff, apiRequestDept, apiRequestProgram];

const newStaffPermissions = document.getElementById('primary').getAttribute('newstaff') === 'sure';

Promise.all(promiseArray)
  .then(values => {
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
    function newStaffCompare(a, b) {
      // function for sorting by array by first name
      const dateA = a.startDate;
      const dateB = b.startDate;
      const nameA = a.last.toUpperCase();
      const nameB = b.last.toUpperCase();
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    }
    function removeBlanks(arr) {
      const newArr = [];
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].startDate) {
          newArr.push(arr[i]);
        }
      }
      return newArr;
    }
    const sortedArray = jasonData.sort(compareSearch);
    sortedArray.forEach(item => {
      const result = staffPages.filter(staffItem => staffItem.email === item.email);
      item.url = result[0] !== undefined ? result[0].url : null;
      item.imageUrl =
        result[0] !== undefined && result[0].image !== undefined
          ? result[0].image
          : 'http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg';
      item.startDate = result[0] !== undefined ? result[0].start_date : null;
      item.funFacts = result[0] !== undefined ? result[0].fun_facts : null;
    });
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
    const culledSortedArray = removeBlanks(sortedArray);
    const final = {
      searchBox: sortedArray.concat(deptProgArray),
      newStaff: culledSortedArray.sort(newStaffCompare)
    };
    return final;
  })
  .then(yeah => {
    render(
      <NewStaff parts={yeah.newStaff} perm={newStaffPermissions} />,
      document.getElementById('new-staff-container')
    );
    render(<SearchBox data={yeah.searchBox} />, document.getElementById('particular-search'));
  });
render(<CasesOrgNews />, document.getElementById('cases-website-stories'));

const permissions = document.getElementById('primary').getAttribute('perm');
if (permissions === 'sure') {
  render(<AdminBox />, document.getElementById('mission-statement'));
}
