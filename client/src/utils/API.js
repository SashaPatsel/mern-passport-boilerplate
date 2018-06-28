import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  //Post new user
  createUser: function(userData) {
    return axios.post("/api/user/signup", userData)
  },
  authenticateUser: function(userData) {
    return axios("auth/signup", 
    {
     method: "post",
     data: userData,
     withCredentials: true
    })
  },
  logout: function(){
    return axios("/auth/logout")
  },
  getUser: function(){
    return axios.get("/auth/user");
  }
};
