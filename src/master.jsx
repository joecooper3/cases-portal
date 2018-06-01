import React from 'react';
import { render } from 'react-dom';

import { DeptFetch } from './components/DeptFetch.jsx';
import { DirectorySearchResults } from './components/DirectorySearchResults.jsx';
import { ProgramFetch } from './components/ProgramFetch.jsx';
import { ProgramsUnitsList } from './components/ProgramsUnitsList.jsx';
import { RelatedStaff } from './components/RelatedStaff.jsx';
import { SearchBox } from './components/SearchBox.jsx';
import { StaffBreadcrumbs } from './components/StaffBreadcrumbs.jsx';
import { StaffFetch } from './components/StaffFetch.jsx';
import { ProgramBreadcrumbs } from './components/ProgramBreadcrumbs.jsx';

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
const defaultAvatar =
  'http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg';

function staffSorterFirst(a, b) {
  // function for sorting array by first name
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
function staffSorterLast(a, b) {
  // function for sorting array by last name
  const nameA = a.first.toUpperCase();
  const nameB = b.first.toUpperCase();
  const lastA = a.last.toUpperCase();
  const lastB = b.last.toUpperCase();
  if (lastA < lastB) return -1;
  if (lastA > lastB) return 1;
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
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
        const raw = userUploadedAvatar[0].avatarCode;
        const trimmed = raw.split('src=\"')[1].split('" alt')[0]; // eslint-disable-line 
        return trimmed;
      } else if (newHireAvatar[0].image) {
        return newHireAvatar[0].image;
      }
      return defaultAvatar;
    }
    function removeSpec(inp) {
      return inp.replace('&#038;', '&').replace('&#8217;', '’');
    }
    const staffDataCombined = jasonData
      .map(entry => {
        const result = directoryData.filter(dirItem => dirItem.email === entry.email);
        entry.url = result[0] !== undefined ? result[0].url : null;
        entry.imageUrl = result[0] !== undefined ? avatarPuller(result[0]) : defaultAvatar;
        entry.supervisorUrl = supervisorUrlPull(entry.supervisor);
        entry.supervisorName = supervisorNamePull(entry.supervisor);
        return entry;
      })
      .sort(staffSorterFirst);
    const deptData = directoryData.filter(inp => inp.type === 'dept').sort(deptProgSorter);
    const programData = directoryData
      .filter(inp => inp.type === 'program')
      .sort(deptProgSorter)
      .map(entry => {
        const result = deptData.filter(deptItem => entry.parent_dept_id === deptItem.id)[0];
        entry.parent_dept_url = result.url;
        return entry;
      });
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
    if (pageType === 'dept' || pageType === 'program') {
      const pageSupervisor = dataBlock.getAttribute('supervisor-id');
      const deptProgName = dataBlock.getAttribute('page-name');
      const supervisorArray = staffDataCombined.filter(item => item.email === pageSupervisor);
      if (pageType === 'dept') {
        const staffArray = staffDataCombined.filter(
          item =>
            item.department === deptProgName && item.email !== pageSupervisor && item.program === ''
        );
        const progListArray = programData.filter(item => item.parent_dept_name === deptProgName);
        final.staffArray = staffArray.sort(staffSorterLast);
        final.progListArray = progListArray;
      }
      if (pageType === 'program') {
        const parentPageName = programData.filter(item => item.name === deptProgName)[0]
          .parent_dept_name;
        const parentPageUrl = programData.filter(item => item.name === deptProgName)[0]
          .parent_dept_url;
        const staffArray = staffDataCombined.filter(
          item => item.program === deptProgName && item.email !== pageSupervisor
        );
        const progListArray = programData.filter(item => item.parent_dept_name === parentPageName);
        final.staffArray = staffArray.sort(staffSorterLast);
        final.progListArray = progListArray;
        final.progBreadcrumbs = {
          deptUrl: parentPageUrl,
          deptName: parentPageName
        };
      }
      final.pageSupervisor = pageSupervisor;
      final.deptProgName = deptProgName;
      final.supervisorArray = supervisorArray;
    }
    if (pageType === 'staff') {
      const currentStaffEmail = dataBlock.getAttribute('staff-email').toLowerCase();
      const currentStaffId = currentStaffEmail.split('@')[0];
      const currentStaffObj = staffDataCombined.filter(item => item.email === currentStaffEmail)[0];
      const deptUrl = deptData.filter(item => item.name === currentStaffObj.department)[0].url;
      const deptName = currentStaffObj.department;
      const deptOrProg =
        programData.filter(item => item.name === currentStaffObj.program)[0] !== undefined
          ? 'prog'
          : 'dept';
      const programUrl =
        deptOrProg === 'prog'
          ? programData.filter(item => item.name === currentStaffObj.program)[0].url
          : null;
      const programName = currentStaffObj.program !== '' ? currentStaffObj.program : null;
      const type = currentStaffObj.program !== '' ? 'program' : 'dept';
      const supervisingArray = staffDataCombined.filter(item => item.supervisor === currentStaffId);
      const topLevelDeptProg = programName !== null ? programName : deptName;
      final.staffBreadcrumbs = { deptUrl, deptName, programUrl, programName, type };
      final.currentStaff = currentStaffObj;
      final.relatedStaff = {
        first: currentStaffObj.first,
        last: currentStaffObj.last,
        deptProg: topLevelDeptProg
      };
      if (supervisingArray.length > 0) {
        final.relatedStaff.type = 'supervisor';
        final.relatedStaff.dataArray = supervisingArray;
      } else {
        final.relatedStaff.type = type;
        if (type === 'program') {
          final.relatedStaff.dataArray = staffDataCombined.filter(
            item => item.program === topLevelDeptProg && item.id !== currentStaffId
          );
        } else if (type === 'dept') {
          final.relatedStaff.dataArray = staffDataCombined.filter(
            item => item.department === topLevelDeptProg && item.id !== currentStaffId
          );
        }
      }
    }
    console.log(final);
    return final;
  })
  .then(yeah => {
    render(<SearchBox data={yeah.searchData} />, document.getElementById('particular-search'));
    if (pageType === 'dept') {
      render(
        <DeptFetch supervisorParts={yeah.supervisorArray} parts={yeah.staffArray} />,
        document.getElementById('app-area')
      );
    }
    if (pageType === 'program') {
      render(
        <ProgramFetch supervisorParts={yeah.supervisorArray} parts={yeah.staffArray} />,
        document.getElementById('app-area')
      );
      render(
        <ProgramBreadcrumbs data={yeah.progBreadcrumbs} />,
        document.getElementById('breadcrumbs')
      );
    }
    if (pageType === 'dept' || pageType === 'program') {
      render(
        <ProgramsUnitsList name={yeah.deptProgName} data={yeah.progListArray} />,
        document.getElementById('sec-holder-one')
      );
    }
    if (pageType === 'staff') {
      render(
        <StaffBreadcrumbs data={yeah.staffBreadcrumbs} />,
        document.getElementById('staff-breadcrumbs')
      );
      render(<StaffFetch data={yeah.currentStaff} />, document.getElementById('app-area'));
      render(
        <RelatedStaff
          type={yeah.relatedStaff.type}
          data={yeah.relatedStaff.dataArray}
          first={yeah.relatedStaff.first}
          last={yeah.relatedStaff.last}
          deptProg={yeah.relatedStaff.deptProg}
        />,
        document.getElementById('related-staff')
      );
    }
    if (pageType === 'directory') {
      render(
        <DirectorySearchResults data={yeah.searchData} />,
        document.getElementById('directory-totality')
      );
    }
  });
