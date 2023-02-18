// Initialize the array of issued books
let issuedBooks = [];

// Get the form and table elements from the HTML
const bookForm = document.getElementById("book-form");
const issuedBooksTable = document.getElementById("issued-books-table");
const issuedBooksTbody = document.getElementById("issued-books-tbody");

// Add an event listener to the form for when the "Issue Book" button is clicked
bookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get the values entered by the user in the form
  const bookName = document.getElementById("book-name").value;
  const issuedTo = document.getElementById("issued-to").value;

  // Create a new book object with the necessary details
  const newBook = {
    id: issuedBooks.length + 1,
    book_name: bookName,
    issued_to: issuedTo,
    issued_time: new Date(),
    status: "not returned",
  };

  // Add the new book object to the array of issued books
  issuedBooks.push(newBook);

  // Render the issued books in the table
  renderIssuedBooks();

  // Reset the form
  bookForm.reset();
});

// Add an event listener to the table for when the status cell is clicked
issuedBooksTable.addEventListener("click", function (e) {
  if (e.target.classList.contains("status-cell")) {
    e.target.contentEditable = true;
    e.target.focus();
  }
});

// Add an event listener to the table for when the status cell is edited
issuedBooksTable.addEventListener("blur", function (e) {
  if (e.target.classList.contains("status-cell")) {
    e.target.contentEditable = false;

    // Get the ID of the book from the table row
    const bookId = e.target.parentNode.dataset.bookId;

    // Get the book object from the array of issued books
    const book = issuedBooks.find((book) => book.id == bookId);

    // Update the status in the book object
    book.status = e.target.textContent.toLowerCase();

    // Render the issued books in the table
    renderIssuedBooks();
  }
});

// Render the issued books in the table
function renderIssuedBooks() {
  // Clear the existing table rows
  issuedBooksTbody.innerHTML = "";

  // Loop through the array of issued books and add a row to the table for each book
  issuedBooks.forEach((book) => {
    const row = document.createElement("tr");
    row.dataset.bookId = book.id;

    const idCell = document.createElement("td");
    idCell.textContent = book.id;
    row.appendChild(idCell);

    const bookNameCell = document.createElement("td");
    bookNameCell.textContent = book.book_name;
    row.appendChild(bookNameCell);

    const issuedToCell = document.createElement("td");
    issuedToCell.textContent = book.issued_to;
    row.appendChild(issuedToCell);

    const issuedTimeCell = document.createElement("td");
    issuedTimeCell.textContent = book.issued_time.toLocaleString();
    row.appendChild(issuedTimeCell);

    const statusCell = document.createElement("td");
    statusCell.classList.add("status-cell");
    statusCell.textContent = book.status;
    if (book.status == "returned") {
      statusCell.style.backgroundColor = "green";
    } else {
      statusCell.style.backgroundColor = "red";
    }
    row.appendChild(statusCell);

    issuedBooksTbody.appendChild(row);
  });
}
