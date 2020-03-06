import React, { Component } from 'react';
import SearchArea from './SearchArea';
import request from 'superagent';
import BookList from './BookList';

import axios from 'axios';

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

  // searchBook = (e) => {
  //   e.preventDefault();
  //   request
  //     .get("https://www.googleapis.com/books/v1/volumes")
  //     .query({ q: this.state.searchField })
  //     .then((data) => {
  //       console.log(data);
  //       const cleanData = this.cleanData(data)
  //       this.setState({ books: cleanData })
  //     })
  // }



  
  // searchBook = (e) => {
  //   axios
  //   .post("https://www.googleapis.com/books/v1/volumes")
  //   .then(function(response){
  //     console.log(response)
  //   });
  // }


  searchBook = (e) => {
    e.preventDefault();
    request
      .post("http://localhost:8080/book-query-result-controller/",   { example: 'data' })    
      .send({
        "domain": "https://www.googleapis.com/books/v1",
        "searchCategory": "volumes",
        "searchTerm": "'" + this.state.searchField + "'",
        "searchTopic": "",
        "searchTopicValue": "",
        "apiKey":"AIzaSyDoc04NEgl3jof9iclXzaoXvKlTI3gRS38"
      })
      .then((data) => {
        console.log(data);
        const cleanData = this.cleanData(data)
        this.setState({ books: cleanData })
      })
  }


   //AXIOS GET METHOD
// function handleSubmit() {
// axios.get("https://www.googleapis.com/books/v1/volumes")
// .then(function(response){
//   console.log(response)
// });
// }


  // NEW METHOD FOR UPDATING QUERY (PUT REQUEST ATTEMPT)
  // https://www.youtube.com/watch?v=ZUhuMS1dFh8

  // handleSubmit(event) {
  //   event.preventDefault();
  //   fetch('https://www.googleapis.com/books/v1/volumes', {
  //     method: 'POST',
  //     headers: {
  //       'Accept':'application/json',
  //       'Content-Type':'application/json'
  //     },
  //     body:JSON.stringify({
  //       searchField: event.target.searchField //Need to figure out if 'searchField' is correct value
  //     })
  //   })
  //   .then(res=> res.json())
  //   .then((result)=>
  //   {
  //     console.log(result);
  //     const cleanData = this.cleanData(result)
  //     this.setState({ books: this.cleanData })
  //   },
  //   )
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
      //3 = checks value ignores type 
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

      else {
        return -1;
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

// //AXIOS GET METHOD
// function handleSubmit() {
// axios.get("https://www.googleapis.com/books/v1/volumes")
// .then(function(response){
//   console.log(response)
// });
// }

export default Books;
