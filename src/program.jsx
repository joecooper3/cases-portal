require("../sass/style.scss");

import React from "react";
import { render } from "react-dom";

import { ProgramFetch } from "./components/ProgramFetch.jsx";
import { ProgramsUnitsList } from "./components/ProgramsUnitsList.jsx";
import { SearchBox } from "./components/SearchBox.jsx";

const APIHost = __API__;

const data = APIHost + "/wp-content/themes/cases_portal/data/casescsv.json";
const staffUrl = APIHost + "/wp-json/portal/v2/bigstaff/";
const deptUrl = APIHost + "/wp-json/wp/v2/department?_embed=true&per_page=100";
const programUrl = APIHost + "/wp-json/wp/v2/program?_embed=true&per_page=100";

const apiRequestJason = fetch(data).then(function(response) {
  return response.json();
});

const apiRequestStaff = fetch(staffUrl).then(function(response) {
  return response.json();
});

const apiRequestDept = fetch(deptUrl).then(function(response) {
  return response.json();
});

const apiRequestProgram = fetch(programUrl).then(function(response) {
  return response.json();
});

const promiseArray = [
  apiRequestJason,
  apiRequestStaff,
  apiRequestDept,
  apiRequestProgram
];

const titleBlock = document.getElementById("dept-title");
const prog = titleBlock.getAttribute("data-id");

const __removeSemicolon = function(inp) {
  return inp.replace("&#038;", "&").replace("&#8217;", "’");
};

const masterData = Promise.all(promiseArray).then(values => {
  let supervisor = titleBlock.getAttribute("supervisor-id");
  let filteredArray = [];
  let supervisorArray = [];
  let progUnitListArray = [];
  let jasonData = values[0].info;
  let staffPages = values[1];
  let deptPages = values[2];
  let programPages = values[3];
  programPages.map(item => {
    item.title.rendered = __removeSemicolon(item.title.rendered);
    return item;
  });
  let sortedArraySearch = jasonData.sort(compareSearch);
  function compareSearch(a, b) {
    // function for sorting by array by first name
    let nameA = a.first.toUpperCase();
    let nameB = b.first.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }
  function supervisorUrlPull(soup) {
    let soupEmail = soup + "@cases.org";
    for (let i = 0; i < staffPages.length; i++) {
      if (staffPages[i].email == soupEmail) {
        return staffPages[i].url;
      }
    }
  }
  function supervisorNamePull(soup) {
    let soupEmail = soup + "@cases.org";
    for (let i = 0; i < jasonData.length; i++) {
      if (jasonData[i].email == soupEmail) {
        return jasonData[i].first + " " + jasonData[i].last;
      }
    }
  }
  let supervisorFormatted = supervisor.replace(/\s/g, "");
  let supervisorFormattedArray = supervisorFormatted.split(",");
  jasonData.map(info => {
    if (supervisorFormattedArray.includes(info.email)) {
      supervisorArray.push(info);
    } else if (info.program === prog) {
      filteredArray.push(info);
    }
  });
  let sortedArray = filteredArray.sort(compareSearch);
  function dataMatcher(arr) {
    arr.forEach(function(item) {
      var result = staffPages.filter(function(staffItem) {
        return staffItem.email === item.email;
      });
      item.url = result[0] !== undefined ? result[0].url : null;
      item.imageUrl =
        result[0] !== undefined && result[0].image !== undefined
          ? result[0].image
          : "http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg";
      item.supervisorUrl =
        result[0] !== undefined ? supervisorUrlPull(item.supervisor) : null;
      item.supervisorName =
        result[0] !== undefined ? supervisorNamePull(item.supervisor) : null;
    });
  }
  dataMatcher(sortedArray);
  dataMatcher(supervisorArray);
  dataMatcher(sortedArraySearch);
  let deptProgArray = [];
  for (let i = 0; i < deptPages.length; i++) {
    deptProgArray.push({
      first: deptPages[i].title.rendered,
      last: "",
      type: "dept",
      url: deptPages[i].link
    });
  }
  for (let i = 0; i < programPages.length; i++) {
    if (programPages[i].acf.acronym) {
      deptProgArray.push({
        first: programPages[i].title.rendered,
        last: "(" + programPages[i].acf.acronym + ")",
        type: "program",
        url: programPages[i].link
      });
    } else {
      deptProgArray.push({
        first: programPages[i].title.rendered,
        last: "",
        type: "program",
        url: programPages[i].link
      });
    }
  }
  //This portion pulls info for the breadcrumbs up top
  let currentProgObj = programPages.filter(item => {
    return prog === item.title.rendered;
  });
  console.log(programPages);
  let parentDeptObj = deptPages.filter(item => {
    return item.id === currentProgObj[0].acf.parent_department[0].ID;
  });
  const final = {
    searchBox: sortedArraySearch.concat(deptProgArray),
    supervisor: supervisorArray,
    main: sortedArray,
    parentDeptObj: parentDeptObj[0]
  };
  return final;
});

class ProgramFetchApp extends React.Component {
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
    return inp.replace("&#038;", "&").replace("&#8217;", "’");
  }

  render() {
    return (
      <div>
        <ProgramFetch
          supervisorParts={this.state.supervisorParts}
          parts={this.state.parts}
        />
      </div>
    );
  }
}

class ProgramsUnitsListApp extends React.Component {
  constructor() {
    super();
    this.state = {
      progUnitParts: [],
      dept: "",
      progName: "",
      loaded: false
    };
  }
  componentWillMount() {
    apiRequestProgram.then(yeah => {
      let progUnitListArray = [];
      yeah.map(info => {
        if (prog === this._removeSemicolon(info.title.rendered)) {
          let dept = info.acf.parent_department[0].post_title;
          this.setState({ dept: dept });
        }
      });
      yeah.map(info => {
        if (
          this.state.dept ===
          this._removeSemicolon(info.acf.parent_department[0].post_title)
        ) {
          progUnitListArray.push(info);
        }
      });
      function compareProgs(a, b) {
        let titleA = a.title.rendered.toUpperCase();
        let titleB = b.title.rendered.toUpperCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      }
      progUnitListArray = progUnitListArray.sort(compareProgs);
      this.setState({ progUnitParts: progUnitListArray });
      this.setState({ progName: prog });
      this.setState({ loaded: true });
    });
  }
  _removeSemicolon(inp) {
    return inp.replace("&#038;", "&").replace("&#8217;", "’");
  }
  render() {
    if (this.state.loaded) {
      return (
        <ProgramsUnitsList
          name={this.state.progName}
          type="program"
          data={this.state.progUnitParts}
        />
      );
    } else {
      return <br />;
    }
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
    } else {
      return <div role="search" className="sbx-custom__wrapper" />;
    }
  }
}

class ProgramBreadcrumbsApp extends React.Component {
  constructor() {
    super();
    this.state = {
      parentDeptName: "",
      parentDeptURL: "",
      loaded: false
    };
  }
  componentWillMount() {
    masterData.then(yeah => {
      this.setState({ parentDeptName: yeah.parentDeptObj.title.rendered });
      this.setState({ parentDeptURL: yeah.parentDeptObj.link });
      this.setState({ loaded: true });
    });
  }
  _removeSemicolon(inp) {
    return inp.replace("&#038;", "&").replace("&#8217;", "’");
  }
  render() {
    if (this.state.loaded) {
      return (
        <div>
          <a href="http://portal.cases.org/staff-directory-by-department/">
            Staff Directory
          </a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
          <a href={this.state.parentDeptURL}>
            {this._removeSemicolon(this.state.parentDeptName)}
          </a>
          <i className="fa fa-angle-double-right" aria-hidden="true" />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

render(<ProgramFetchApp />, document.getElementById("app-area"));
render(<ProgramsUnitsListApp />, document.getElementById("sec-holder-one"));
render(<SearchBoxApp />, document.getElementById("particular-search"));
render(<ProgramBreadcrumbsApp />, document.getElementById("breadcrumbs"));
