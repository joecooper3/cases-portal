require('../sass/style.scss');

import React from 'react';
import {render} from 'react-dom';

import {SearchBox} from './components/SearchBox.jsx';
import {Training} from './components/Training.jsx';
import {SideNavBox} from './components/SideNavBox.jsx';

const APIHost = __API__;

const data = APIHost + '/wp-content/themes/cases_portal/data/casescsv.json';
const staffUrl = APIHost + '/wp-json/portal/v2/bigstaff/';
const deptUrl = APIHost + '/wp-json/wp/v2/department?_embed=true&per_page=100';
const programUrl = APIHost + '/wp-json/wp/v2/program?_embed=true&per_page=100';
const trainingUrl = APIHost + '/wp-json/portal/v2/trainings/';
const sidenavUrl = APIHost + '/wp-json/portal/v2/sidenavs/';

const apiRequestJason = fetch(data).then(function(response) {
  return response.json();
});

const apiRequestStaff = fetch(staffUrl).then(function(response){
  return response.json();
});

const apiRequestDept = fetch(deptUrl).then(function(response) {
  return response.json();
});

const apiRequestProgram = fetch(programUrl).then(function(response) {
  return response.json();
});

const apiRequestTrainings = fetch(trainingUrl).then(function(response) {
  return response.json();
});

const apiRequestSidenav = fetch(sidenavUrl).then(function(response) {
  return response.json();
});

const promiseArray = [apiRequestJason, apiRequestStaff, apiRequestDept, apiRequestProgram];

const masterData = Promise.all(promiseArray).then(values => {
  let filteredArray = [];
  let jasonData = values[0].info;
  let staffPages = values[1];
  let deptPages = values[2];
  let programPages = values[3];
  function compareSearch(a,b) { // function for sorting by array by first name
    let nameA = a.first.toUpperCase();
    let nameB = b.first.toUpperCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB )
        return 1;
      return 0;
    }
  let sortedArray = jasonData.sort(compareSearch);
  sortedArray.forEach(function(item) {
    var result = staffPages.filter(function(staffItem) {
        return staffItem.email === item.email;
    });
  item.url = (result[0] !== undefined) ? result[0].url : null;
  });
  let deptProgArray = [];
  for (let i = 0; i < deptPages.length; i++) {
    deptProgArray.push({
      first: deptPages[i].title.rendered,
      last: '',
      type: 'dept',
      url: deptPages[i].link
    })
  }
  for (let i = 0; i < programPages.length; i++) {
    if (programPages[i].acf.acronym) {
    deptProgArray.push({
      first: programPages[i].title.rendered,
      last: "(" + programPages[i].acf.acronym + ")",
      type: 'program',
      url: programPages[i].link
    })
  }
  else {
    deptProgArray.push({
      first: programPages[i].title.rendered,
      last: '',
      type: 'program',
      url: programPages[i].link
    })
  }
}
  const final = sortedArray.concat(deptProgArray);
  return final;
});

function dateCompare(a,b) { // function for sorting training dates
  let dateA = a.date;
  let dateB = b.date;
    if (dateA < dateB)
      return -1;
    if (dateA > dateB)
      return 1;
    return 0;
  }

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
if(dd<10) {
    dd = '0'+dd
  }
if(mm<10) {
    mm = '0'+mm
}
today = yyyy + mm + dd;

class ComplianceTrainingDatesApp extends React.Component {
  constructor(){
    super();
    this.state = {
      complianceParts: []
    };
  }
  componentWillMount(){
    apiRequestTrainings.then(yeah => {
      let complianceArray = [];
      yeah.map(info => {
         if (info.training_type === 'Compliance' && info.date >= today) {
          complianceArray.push(info);
        }
      });
      this.setState({complianceParts: complianceArray.sort(dateCompare)});
    });
  }
  render() {
    return (
      <ul id="compliance-dates" className="dates-list">
        {this.state.complianceParts.map((part, i) =>
          <Training key={i} date={part.date} location={part.location} startTime={part.start_time}
          endTime={part.end_time}/>
      )}
    </ul>
    )
  }
}
class PrivacyTrainingDatesApp extends React.Component {
  constructor(){
    super();
    this.state = {
      privacyParts: []
    };
  }
  componentWillMount(){
    apiRequestTrainings.then(yeah => {
      let privacyArray = [];
      yeah.map(info => {
         if (info.training_type === 'Privacy' && info.date >= today) {
          privacyArray.push(info);
        }
      });
      this.setState({privacyParts: privacyArray.sort(dateCompare)});
    });
  }
  render() {
    return (
      <ul id="privacy-dates" className="dates-list">
        {this.state.privacyParts.map((part, i) =>
          <Training key={i} date={part.date} location={part.location} startTime={part.start_time}
          endTime={part.end_time}/>
      )}
    </ul>
    )
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
      this.setState({searchParts: yeah});
      this.setState({loaded: true});
    });  }

  render () {
    if (this.state.loaded === true) {
    return (
      <SearchBox data={this.state.searchParts} />
    );
  }
  else {
    return (
      <div role="search" className="sbx-custom__wrapper"></div>
    )
  }
  }
}

class SidenavApp extends React.Component {
  constructor() {
    super();
    this.state = {
      sidenavParts: []
    };
  }
  componentWillMount() {
    const titleBlock = document.getElementById('dept-title');
    const category = titleBlock.getAttribute('data-id');
    const permissions = titleBlock.getAttribute('perm');
    apiRequestSidenav.then(yeah => {
      let sidenavArray = [];
      yeah.map(info => {
        if (info.category === category) {
          sidenavArray.push(info);
        }
      });
      this.setState({sidenavParts: sidenavArray});
      this.setState({permissions: permissions});
    });
  }

  render () {
    return(
      this.state.sidenavParts.map((part, i) =>
        <SideNavBox key={i} id={part.id} name={part.name} icon={part.icon}
          content={part.content} permissions={this.state.permissions} />
      )
    )
  }
}

render(<ComplianceTrainingDatesApp/>, document.getElementById('compliance-dates'));
render(<PrivacyTrainingDatesApp/>, document.getElementById('privacy-dates'));
render(<SidenavApp/>, document.getElementById('sidenav-container'));
render(<SearchBoxApp/>, document.getElementById('particular-search'));