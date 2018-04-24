require("../sass/style.scss");

import React from "react";
import { render } from "react-dom";

import { SearchBox } from "./components/SearchBox.jsx";
import { DepartmentDirectory } from "./components/DepartmentDirectory.jsx";

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

const masterData = Promise.all(promiseArray).then(values => {
  let filteredArray = [];
  let jasonData = values[0].info;
  let staffPages = values[1];
  let deptPages = values[2];
  let programPages = values[3];
  function compareSearch(a, b) {
    // function for sorting by array by first name
    let nameA = a.first.toUpperCase();
    let nameB = b.first.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }
  let sortedArray = jasonData.sort(compareSearch);
  sortedArray.forEach(function(item) {
    var result = staffPages.filter(function(staffItem) {
      return staffItem.email === item.email;
    });
    item.url = result[0] !== undefined ? result[0].url : null;
    item.imageUrl =
      result[0] !== undefined && result[0].image !== undefined
        ? result[0].image
        : "http://portal.cases.org/wp-content/themes/cases_portal/images/silhouette.svg";
  });
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
  const final = sortedArray.concat(deptProgArray);
  return final;
});

const compareSearchDept = function(a, b) {
  // function for sorting by array by first name
  let nameA = a.title.rendered.toUpperCase();
  let nameB = b.title.rendered.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};

const deptProgPromiseArray = [apiRequestDept, apiRequestProgram];

const deptProgData = Promise.all(deptProgPromiseArray).then(values => {
  let deptPages2 = values[0];
  let programPages2 = values[1];
  let deptWithKids = deptPages2
    .map(deptItem => {
      deptItem.kids = programPages2
        .filter(progItem => {
          return deptItem.id === progItem.acf.parent_department[0].ID;
        })
        .sort(compareSearchDept);
      return deptItem;
    })
    .sort(compareSearchDept);
  let allDeptProg = deptPages2.concat(programPages2);
  console.log(deptWithKids);
  return deptWithKids;
});

class SearchBoxApp extends React.Component {
  constructor() {
    super();
    this.state = {
      searchParts: [],
      loaded: false,
      loaded2: false
    };
  }
  componentWillMount() {
    masterData.then(yeah => {
      this.setState({ searchParts: yeah });
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

class DepartmentDirectoryApp extends React.Component {
  constructor() {
    super();
    this.state = {
      deptProgParts: [],
      deptProgLoaded: false
    };
  }
  componentWillMount() {
    deptProgData.then(yeah => {
      this.setState({ deptProgParts: yeah });
      this.setState({ deptProgLoaded: true });
    });
  }

  _removeSemicolon(inp) {
    return inp.replace("&#038;", "&").replace("&#8217;", "’");
  }

  render() {
    if (this.state.deptProgLoaded === true) {
      return (
        <div id="department-directory">
          <h1>Staff Directory by Department</h1>
          {this.state.deptProgParts.map((dep, i) => {
            return (
              <DepartmentDirectory
                key={i}
                name={this._removeSemicolon(dep.title.rendered)}
                url={dep.link}
                kids={dep.kids}
                icon={dep.acf.department_icon}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div id="department-directory">
          <h1>Staff Directory by Department</h1>
        </div>
      );
    }
  }
}

render(<SearchBoxApp />, document.getElementById("particular-search"));
render(
  <DepartmentDirectoryApp />,
  document.getElementById("department-directory")
);
