import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  urlCall = () => {
    getUrls().then((data) => {
      this.setState({
        urls: data.urls,
      });
    })
  }

  addUrl = (newURL) => {
    this.setState({
      urls: [...this.state.urls, newURL]
    });
  }

  deleteFromState = (id) => {
    this.setState({
      urls: this.state.urls.filter(url => url.id !== id)
    });
  }

  componentDidMount() {
    this.urlCall()
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl} />
        </header>

        <UrlContainer urls={this.state.urls} deleteFromState={this.deleteFromState} />
      </main>
    );
  }
}

export default App;
