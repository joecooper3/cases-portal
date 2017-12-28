import React from 'react';

const newsUrl = 'https://www.cases.org/wp-json/wp/v2/posts?_embed=true/';

class CasesOrgNews extends React.Component {
  constructor() {
    super();
    this.state = {
      firstNews: {
        title: {
          rendered: ''
        },
        excerpt: {
          rendered: ''
        }
      },
      firstImage: '',
      newsBits: []
    };
  }
  componentWillMount() {
    fetch(newsUrl).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then((data) => {
        const NUMBER_OF_LINKS_DISPLAYED = 5;
        let firstStory = data[0];
        let firstStoryImage = firstStory._embedded['wp:featuredmedia'][0]['media_details']['sizes']['medium_large']['source_url'];
        this.setState({firstImage: firstStoryImage});
        let dataFiltered = [];
        this.setState({firstNews: firstStory});
        for (let i = 1; i < NUMBER_OF_LINKS_DISPLAYED; i++) {
          dataFiltered.push(data[i]);
        }
        this.setState({newsBits: dataFiltered});
      });
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
  _dateConvert(date) {
    var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
  }
  render() {
    let firstDateUnbuilt = new Date(this.state.firstNews.date);
    let firstDate = this._dateConvert(firstDateUnbuilt);
    let excerpt = this.state.firstNews.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "");
    return (<ul className="news-stories">
      <a href={this.state.firstNews.link} target="_blank">
        <img src={this.state.firstImage}/>
      </a>
      <li className="first-bullet">
        <a href={this.state.firstNews.link} target="_blank">
          {this.state.firstNews.title.rendered}
        </a>
        <div className="date">{firstDate}</div>
        <p>{excerpt}</p>
      </li>
      {
        this.state.newsBits.map((bit, i) => <li key={i}>
          <a href={bit.link} target="_blank">
            {bit.title.rendered}
            <div className="date">
              {this._dateConvert(new Date (bit.date))}
            </div>
          </a>
        </li>)
      }
    </ul>);
  }
}

export {
  CasesOrgNews
};
