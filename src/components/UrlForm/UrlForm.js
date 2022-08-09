import React, { Component } from 'react';
import { postUrl } from '../../apiCalls';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: '',
      formError: false,
      serverError: false,
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.title || !this.state.urlToShorten) {
      this.setState({ formError: true });
    } else {
      this.setState({ serverError: false, formError: false });
      this.clearInputs();
      const submitObject = {long_url: this.state.urlToShorten, title: this.state.title}
      postUrl(submitObject).then((data) => {
        console.log(data)
        this.props.addUrl(data)
        }).catch((err) => {
          this.setState({ serverError: true });
        })
    }
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <>
        <form>
          <input
            type='text'
            placeholder='Title...'
            name='title'
            value={this.state.title}
            onChange={e => this.handleNameChange(e)}
          />

          <input
            type='text'
            placeholder='URL to Shorten...'
            name='urlToShorten'
            value={this.state.urlToShorten}
            onChange={e => this.handleNameChange(e)}
          />

          <button onClick={e => this.handleSubmit(e)}>
            Shorten Please!
          </button>
        </form>
        {this.state.serverError && <h2>Something went wrong with the server</h2>}
        {this.state.formError && <h2>Please fill out all fields</h2>}
    </>
    )
  }
}

export default UrlForm;
