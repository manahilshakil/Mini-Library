// Function to display books from local storage
function displayBooksFromStorage() {
    const books = getBooksFromStorage();
    books.forEach((book) => addBookToList(book));
  }
  
  // Function to add a book to the list and local storage
  function addBookToList(book) {
    const bookList = document.querySelector("#book-list");
  
    const bookItem = document.createElement("div");
    bookItem.classList.add("book");
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <button class="delete">Remove</button>
    `;
  
    bookList.appendChild(bookItem);
  }
  
  // Function to retrieve books from local storage
  function getBooksFromStorage() {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  }
  
  // Function to add a book to local storage
  function addBookToStorage(book) {
    const books = getBooksFromStorage();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  
  // Function to remove a book from local storage
  function removeBookFromStorage(title) {
    const books = getBooksFromStorage().filter((book) => book.title !== title);
    localStorage.setItem("books", JSON.stringify(books));
  }
  
  // Function to clear input fields
  function clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
  }
  
  // Event: Display Books from local storage on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", displayBooksFromStorage);
  
  // Event: Add a Book to list and local storage
  document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
  
    if (title && author) {
      const newBook = { title, author };
      addBookToList(newBook);
      addBookToStorage(newBook);
      clearFields();
    }
  });
  
  // Event: Remove a Book from list and local storage
  document.querySelector("#book-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const bookTitle = e.target.parentElement.querySelector("h3").textContent;
      e.target.parentElement.remove();
      removeBookFromStorage(bookTitle);
    }
  })