import React, { Component } from 'react';
import SearchArea from './SearchArea';
import request from 'superagent';
import Axios from 'axios';

class Books extends Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      searchField: ''
    }
  }

  searchBook = (e) => {
    e.preventDefault();
    request
      .post("http://localhost:8080/book-query-result-controller/")
      //.query({ q: this.state.searchField })
      .then((data) => {
        console.log(data);
      })
  }

  handleSearch = (e) => {
    this.setState({ searchField: e.target.value })
  }

  render() {
    return (
      <div>
        <SearchArea searchBook={this.searchBook} handleSearch={this.handleSearch}/>
      </div>
    );
  }
}

// AXIOS
Axios.post("httpgjgj", state.searchField)

export default Books;
