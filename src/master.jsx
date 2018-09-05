import React from 'react';
import { render } from 'react-dom';

import AdminBox from './components/frontpage/AdminBox.jsx';
import CasesOrgNews from './components/frontpage/CasesOrgNews.jsx';
import CommsArchive from './components/resources/CommsArchive.jsx';
import CommsCatalog from './components/resources/CommsCatalog.jsx';
import DepartmentDirectory from './components/directory/DepartmentDirectory.jsx';
import DeptFetch from './components/directory/DeptFetch.jsx';
import DirectorySearchResults from './components/search/DirectorySearchResults.jsx';
import DocsNav from './components/resources/DocsNav.jsx';
import NewStaff from './components/frontpage/NewStaff.jsx';
import ProgramFetch from './components/directory/ProgramFetch.jsx';
import ProgramsUnitsList from './components/directory/ProgramsUnitsList.jsx';
import RelatedStaff from './components/directory/RelatedStaff.jsx';
import SearchBox from './components/search/SearchBox.jsx';
import SideNavBox from './components/resources/SideNavBox.jsx';
import StaffBreadcrumbs from './components/directory/StaffBreadcrumbs.jsx';
import StaffFetch from './components/directory/StaffFetch.jsx';
import TrainingsBox from './components/resources/TrainingsBox.jsx';
import ProgramBreadcrumbs from './components/directory/ProgramBreadcrumbs.jsx';

require('../sass/style.scss');

function removeSpec(inp) {
  return inp
    .replace('&#038;', '&')
    .replace('&amp;', '&')
    .replace('&#8217;', "'")
    .replace('’', "'");
}
const APIHost = __API__; // eslint-disable-line no-undef
const dataBlock = document.getElementById('primary');
const pageType = dataBlock.getAttribute('data-id');
const titleBlock = document.getElementById('dept-title');

const pageTitle =
  pageType === 'frontpage' || pageType === 'staff'
    ? 'frontpage or staff'
    : removeSpec(titleBlock.innerHTML);

const data = `${APIHost}/wp-content/themes/cases_portal/data/casescsv.json`;
const directoryUrl = `${APIHost}/wp-json/portal/v2/bigstaff/`;
const avatarUrl = `${APIHost}/wp-json/portal/v2/users`;
const trainingUrl = `${APIHost}/wp-json/portal/v2/trainings/`;
const sidenavUrl = `${APIHost}/wp-json/portal/v2/sidenavs/`;
const commsUrl = `${APIHost}/wp-json/portal/v2/comms`;

const apiRequestJason = fetch(data).then(response => response.json());
const apiRequestDirectory = fetch(directoryUrl).then(response => response.json());
const apiRequestAvatar = fetch(avatarUrl).then(response => response.json());
const apiRequestTraining = fetch(trainingUrl).then(response => response.json());
const apiRequestSidenav = fetch(sidenavUrl).then(response => response.json());
const apiRequestComms = fetch(commsUrl).then(response => response.json());

let promiseArray = [];
if (pageType === 'compliance') {
  promiseArray = [
    apiRequestJason,
    apiRequestDirectory,
    apiRequestAvatar,
    apiRequestSidenav,
    apiRequestTraining
  ];
} else if (pageType === 'resources' && pageTitle === 'Communications') {
  promiseArray = [
    apiRequestJason,
    apiRequestDirectory,
    apiRequestAvatar,
    apiRequestSidenav,
    apiRequestComms
  ];
} else if (pageType === 'resources') {
  promiseArray = [apiRequestJason, apiRequestDirectory, apiRequestAvatar, apiRequestSidenav];
} else if (pageType === 'comms-archive') {
  promiseArray = [apiRequestJason, apiRequestDirectory, apiRequestAvatar, apiRequestComms];
} else {
  promiseArray = [apiRequestJason, apiRequestDirectory, apiRequestAvatar];
}

const defaultAvatar =
  'https://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg';

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
function deptProgSorter(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
}
function sidenavOrder(a, b) {
  if (a.position < b.position) return -1;
  if (a.position > b.position) return 1;
  return 0;
}

Promise.all(promiseArray)
  .then(values => {
    const jasonData = values[0];
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
      if (userUploadedAvatar[0] !== undefined && userUploadedAvatar[0].avatarCode !== undefined) {
        const raw = userUploadedAvatar[0].avatarCode;
        const trimmed = raw.split('src=\"')[1].split('" alt')[0]; // eslint-disable-line 
        return trimmed;
      } else if (newHireAvatar[0].image) {
        return newHireAvatar[0].image;
      }
      return defaultAvatar;
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
    if (pageType === 'frontpage') {
      const newStaffArray = staffDataCombined.map(entry => {
        const result = directoryData.filter(dirItem => dirItem.email === entry.email);
        entry.startDate = result[0] !== undefined ? result[0].start_date : null;
        entry.funFacts = result[0] !== undefined ? result[0].fun_facts : null;
        return entry;
      });
      final.newStaff = newStaffArray
        .filter(entry => entry.startDate !== null)
        .sort(newStaffCompare);
    }
    if (pageType === 'dept' || pageType === 'program') {
      const pageSupervisor = dataBlock.getAttribute('supervisor-id');
      const deptProgName = dataBlock.getAttribute('page-name');
      const pageSupervisorArr = pageSupervisor.replace(/\s/g, '').split(',');
      const supervisorArray = staffDataCombined.filter(item =>
        pageSupervisorArr.includes(item.email)
      );
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
        const parentPageName = programData.filter(item => item.name === removeSpec(deptProgName))[0]
          .parent_dept_name;
        const parentPageUrl = programData.filter(item => item.name === removeSpec(deptProgName))[0]
          .parent_dept_url;
        const staffArray = staffDataCombined.filter(
          item =>
            item.program === removeSpec(deptProgName) && !pageSupervisorArr.includes(item.email)
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
    if (pageType === 'compliance' || pageType === 'resources') {
      const sidenavData = values[3];
      if (pageTitle === 'Communications') {
        const commsData = values[4];
        final.commsData = commsData;
      }
      final.sidenavData = sidenavData
        .filter(item => item.category === pageTitle)
        .sort(sidenavOrder);
      final.permissions = dataBlock.getAttribute('perm') === 'sure';
    }
    if (pageType === 'compliance') {
      const trainingsData = values[4];
      const complianceDates = trainingsData.filter(item => item.training_type === 'Compliance');
      const privacyDates = trainingsData.filter(item => item.training_type === 'Privacy');
      final.complianceDates = complianceDates;
      final.privacyDates = privacyDates;
    }
    if (pageType === 'department-directory') {
      final.deptProg = deptDataSearch.map(dept => {
        const createdKids = programDataSearch.filter(prog => prog.parent_dept_id === dept.id);
        dept.kids = createdKids;
        return dept;
      });
    }
    if (pageType === 'comms-archive') {
      const commsCategory = document.getElementById('comms-archive').getAttribute('data-id');
      const commsData = values[3].filter(item => item.type === commsCategory);
      final.commsData = commsData;
    }
    if (pageType === 'docs') {
      final.docsCat = dataBlock.getAttribute('cat');
      final.docsId = parseInt(dataBlock.getAttribute('post-id'));
    }
    return final;
  })
  .then(yeah => {
    render(<SearchBox data={yeah.searchData} />, document.getElementById('particular-search'));
    if (pageType === 'frontpage') {
      const permissions = document.getElementById('primary').getAttribute('perm');
      const newStaffPermissions =
        document.getElementById('primary').getAttribute('newstaff') === 'sure';
      if (permissions === 'sure') {
        render(<AdminBox />, document.getElementById('mission-statement'));
      }
      render(<CasesOrgNews />, document.getElementById('cases-website-stories'));
      render(
        <NewStaff parts={yeah.newStaff} perm={newStaffPermissions} />,
        document.getElementById('master-new-staff-container')
      );
    }
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
      const progUnitHeader =
        pageType === 'dept' ? yeah.deptProgName : yeah.progListArray[0].parent_dept_name;
      render(
        <ProgramsUnitsList
          name={removeSpec(yeah.deptProgName)}
          data={yeah.progListArray}
          title={progUnitHeader}
        />,
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
    if (pageType === 'compliance' || pageType === 'resources') {
      render(
        yeah.sidenavData.map(part => (
          <SideNavBox
            key={part.id}
            id={part.id}
            name={part.name}
            icon={part.icon}
            content={part.content}
            permissions={yeah.permissions}
          />
        )),
        document.getElementById('sidenav-container')
      );
      if (pageTitle === 'Communications') {
        render(<CommsCatalog data={yeah.commsData} />, document.getElementById('comms-catalog'));
      }
    }
    if (pageType === 'compliance') {
      render(
        <TrainingsBox type="compliance" data={yeah.complianceDates} />,
        document.getElementById('compliance-dates')
      );
      render(
        <TrainingsBox type="privacy" data={yeah.privacyDates} />,
        document.getElementById('privacy-dates')
      );
    }
    if (pageType === 'department-directory') {
      render(
        <div id="department-directory">
          <h1>Staff Directory by Department</h1>
          {yeah.deptProg.map(dep => (
            <DepartmentDirectory
              key={dep.id}
              name={dep.name}
              url={dep.url}
              kids={dep.kids}
              icon={dep.icon}
            />
          ))}
        </div>,
        document.getElementById('department-directory')
      );
    }
    if (pageType === 'comms-archive') {
      render(
        <CommsArchive data={yeah.commsData} />,
        document.getElementById('comms-archive-container')
      );
    }
    if (pageType === 'docs') {
      render(
        <DocsNav id={yeah.docsId} category={yeah.docsCat} pageTitle={pageTitle} />,
        document.getElementById('docs-nav')
      );
    }
  });
// Disables the editing of a person's email address on the change password page
if (pageType === 'default' && pageTitle === 'Change Your Password') {
  document.getElementById('email').disabled = true;
}
