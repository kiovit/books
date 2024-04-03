document.addEventListener("DOMContentLoaded", function () {
    const showButton = document.getElementById("showDialog");
    const addBookForm = document.getElementById("add-book-form");
    const cancelButton = document.getElementById("cancelBtn");
    const clearButton = document.getElementById("clear");

    showButton.addEventListener("click", () => {
        favDialog.showModal();
    });

    cancelButton.addEventListener("click", () => {
        event.preventDefault();
        clearFormFields();
        favDialog.close();
    });

    clearButton.addEventListener("click", () => {
        event.preventDefault();
        clearFormFields();
    });

    function clearFormFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('info').value = '';
        document.getElementById('read').checked = false;
    }

    const bookLibrary = [];

    function Book(title, author, pages, info, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.info = info;
        this.read = read;

        this.toggleReadStatus = function () {
            this.read = !this.read;
            renderBooks(); // Re-render books after the status is toggled
        };
    
    }
  

    function addBookToLibrary(newBook) {
        bookLibrary.push(newBook);
    }

    const littlePrince = new Book("Little Prince", "You", 2344, "Cool", false);
    addBookToLibrary(littlePrince);

    function renderBooks() {
        const bookListDiv = document.getElementById('book-list');
        bookListDiv.innerHTML = '';

        bookLibrary.forEach((book, index) => {
            const bookInfoParagraph = document.createElement('div');
            const titleDiv = document.createElement('div');
            titleDiv.textContent = `Title: ${book.title}`;
            const authorDiv = document.createElement('div');
            authorDiv.textContent = `Author: ${book.author}`;
            const pagesDiv = document.createElement('div');
            pagesDiv.textContent = `Pages: ${book.pages}`;
            const infoDiv = document.createElement('div');
            infoDiv.textContent = `Info: ${book.info}`;
            const readDiv = document.createElement('div');
            readDiv.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
            const buttonDiv = document.createElement("div");
            const deleteButton = document.createElement ("button");
            deleteButton.textContent= "Delete book";
            const readButton = document.createElement ("button");
            readButton.textContent= "Read";

            // Append each div to the bookInfoParagraph
            bookInfoParagraph.appendChild(titleDiv);
            bookInfoParagraph.appendChild(authorDiv);
            bookInfoParagraph.appendChild(pagesDiv);
            bookInfoParagraph.appendChild(infoDiv);
            bookInfoParagraph.appendChild(readDiv);
            bookInfoParagraph.appendChild(buttonDiv);
            buttonDiv.appendChild(deleteButton);
            buttonDiv.appendChild(readButton);

            // Add the book-info class to the bookInfoParagraph
            bookInfoParagraph.classList.add('book-info');
            titleDiv.classList.add('title');
            authorDiv.classList.add('author');
            pagesDiv.classList.add('pages');
            infoDiv.classList.add('info');
            readDiv.classList.add('read');
            deleteButton.classList.add('deleteButton');
            readButton.classList.add('readButton');
            buttonDiv.classList.add('buttonDiv');

            // Append the bookInfoParagraph to the bookListDiv
            bookListDiv.appendChild(bookInfoParagraph);
            
            deleteButton.addEventListener("click", () => {
                bookLibrary.splice(index, 1);
                renderBooks()
        
            });

            readButton.addEventListener('click', () => {
                book.toggleReadStatus();
            });
        });

    }

    

    function submitForm() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pagesInput = document.getElementById('pages').value;
        let pages = pagesInput ? parseInt(pagesInput) : null;
        const info = document.getElementById('info').value;
        const read = document.getElementById('read').checked;

        if (!pagesInput) {
            pages = "";
            renderBooks();
            console.log(bookLibrary);
        }

        // If pages is not null and it's a valid number, add the book
        if (!isNaN(pages) && pages !== null) {
            addBookToLibrary(new Book(title, author, pages, info, read));
            renderBooks();
            console.log(bookLibrary);
        }
    }

    addBookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        submitForm();
        clearFormFields();
        favDialog.close();
    });

    renderBooks();
});
