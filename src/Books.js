import React, { Component } from 'react';
import SearchArea from './SearchArea';
import request from 'superagent';
import BookList from './BookList';

import Axios from 'axios';

class Books extends Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      searchField: '',
      sort: ''
    }
  }

  // TUTORTIAL METHOD FOR CALLING API DIRECTLY AND GETTING BACK DATA
  searchBook = (e) => {
    e.preventDefault();
    request
      .get("https://www.googleapis.com/books/v1/volumes")
      .query({ q: this.state.searchField })
      .then((data) => {
        console.log(data);
        const cleanData = this.cleanData(data)
        this.setState({ books: cleanData })
      })
  }


  // NEW METHOD FOR UPDATING QUERY
  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8080/book-query-result-controller/'), {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        
      })
    }
  }

  // MY METHOD FOR UPDATING QUERY ON BACK-END WITH USER INPUT
  // searchBook = (e) => {
  //   e.preventDefault();
  //   request
  //     .get("http://localhost:8080/book-query-result-controller/")
  //     .query({ q: this.state.searchField })
  //     .then((data) => {
  //       console.log(data);
  //       const cleanData = this.cleanData(data)
  //       this.setState({ books: cleanData })
  //     })
  // }

  handleSearch = (e) => {
    this.setState({ searchField: e.target.value })
  }
  
  handleSort = (e) => {
    console.log(e.target.value);
    this.setState({ sort: e.target.value })
  }

  cleanData = (data) => {
    const cleanedData = data.body.items.map((book) => {
      if(book.volumeInfo.hasOwnProperty('publishedDate') === false) {
        book.volumeInfo['publishedDate'] = '0000';
      }

      else if(book.volumeInfo.hasOwnProperty('imageLinks') === false) {
        book.volumeInfo['imageLinks'] = { thumbnail: 'https://image.shutterstock.com/image-vector/no-image-available-icon-flat-260nw-1240855801.jpg' }
      }

      return book;
    })

    return cleanedData;
  }

  render() {
    const sortedBooks = this.state.books.sort((a, b) => {
      if(this.state.sort === 'Newest') {
        return parseInt(b.volumeInfo.publishedDate.substring(0,4)) - parseInt(a.volumeInfo.publishedDate.substring(0,4))
      }

      else if(this.state.sort === 'Oldest') {
        return parseInt(a.volumeInfo.publishedDate.substring(0,4)) - parseInt(b.volumeInfo.publishedDate.substring(0,4))
      }
    })
    return (
      <div>
        <SearchArea searchBook={this.searchBook} handleSearch={this.handleSearch} handleSort={this.handleSort}/>
        <BookList books={sortedBooks} />
      </div>
    );
  }
}

// AXIOS
// Axios.post("httpgjgj", state.searchField)

export default Books;
