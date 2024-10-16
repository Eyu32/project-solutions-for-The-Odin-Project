// input detail 
const addBook = document.querySelector('.add-book')
const bookDetailInput = document.querySelector('#book-detail-input')

addBook.addEventListener('click', () => {
    addBook.classList.toggle('add')
    bookDetailInput.classList.toggle('visible')
})

// search
const searchBar = document.forms['search-bar'].querySelector("#search")

searchBar.addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase()

    const books = container.getElementsByClassName('book')
    Array.from(books).forEach(book => {
        const title = book.querySelector('.title').innerText
        if (title.toLowerCase().indexOf(term) != -1){
            book.style.display = 'grid'
        }
        else{
            book.style.display = 'none'
        }
    })

})

// remove books

const container = document.querySelector('.container') 

container.addEventListener('click', function(e){

    const targetEle = e.target
    if (targetEle.id === 'trash'){
        const childEle = targetEle.parentElement
        container.removeChild(childEle)
    }
})

// check to read 
document.body.addEventListener('click', (e) => {
    const targetEle = e.target
    if (targetEle.className === 'check-to-read'){
        if (targetEle.innerText === 'Read'){
            targetEle.innerText = 'unRead'
        }
        else if (targetEle.innerText === 'unRead'){
            targetEle.innerText = 'Read'
        }
    }
})

// add book
const addBookForm = document.forms['#book-detail-input']
const addBtn = document.querySelector('#add-btn')

function resetForm(){
    const bookTitle = document.querySelector('#book-name')
    const authorName = document.querySelector('#author')
    const urlAddress = document.querySelector('#url')
    const pageNumber = document.querySelector('#page-no')
    // const checker = document.querySelector('.check-to-read').textContent
    bookTitle.value = ''
    authorName.value = ''
    urlAddress.value = ''
    pageNumber.value = ''
    document.querySelector('#read').innerText = 'unRead'

    bookDetailInput.classList.remove('visible')
    addBook.classList.remove('add')

}

addBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const newBook = createBook(); 
    newBook.createBookCard();  
    resetForm(); 
});


function Book(thumbnail, authorName, bookTitle, urlAddress, pageNumber, checker) {
    this.thumbnail = thumbnail;
    this.authorName = authorName;
    this.bookTitle = bookTitle;
    this.urlAddress = urlAddress;
    this.pageNumber = pageNumber;
    this.checker = checker;
}

Book.prototype.createBookCard = function() {
    const newBookCard = document.createElement('div');
    newBookCard.classList.add('book');

    const imgEle = document.createElement('img')
    if (this.thumbnail){
        const imageUrl = URL.createObjectURL(this.thumbnail)
        imgEle.setAttribute('src', imageUrl)
        imgEle.classList.add('img')
    }

    // author
    const author = document.createElement('p')
    author.innerText = `${this.authorName}`
    author.classList.add('author')

    // title of book
    const title = document.createElement('p')
    title.innerText = `${this.bookTitle}`
    title.classList.add('title')

    // creating parent for check to read and link to Book
    const bookFlex = document.createElement('div')
    bookFlex.classList.add('book-flex')

    // check to read
    const checkToRead = document.createElement('p')
    checkToRead.innerText = `${this.checker}`
    checkToRead.classList.add('check-to-read')
    bookFlex.appendChild(checkToRead)

    // link to Book 
    const linkToBook = document.createElement('a')
    linkToBook.setAttribute('href', `${this.urlAddress}`)
    linkToBook.setAttribute('target', `_blank`)
    linkToBook.innerText = 'Continue Reading '
    linkToBook.innerHTML += '<i class="fa-solid fa-arrow-up-right-from-square"></i>'
    linkToBook.classList.add('link-to-book')
    bookFlex.appendChild(linkToBook)

    // number of pages 
    const page = document.createElement('p')
    page.innerText = `${this.pageNumber} Pages`
    page.classList.add('pages')

    newBookCard.innerHTML += '<i class="fa-solid fa-trash-can fa-bounce" id="trash" style="color: #ea5353;"></i>'

    newBookCard.appendChild(imgEle);
    newBookCard.appendChild(author);
    newBookCard.appendChild(title);
    newBookCard.appendChild(bookFlex);
    newBookCard.appendChild(page);
    container.appendChild(newBookCard);
    
};

function createBook() {
    const thumbnail = document.querySelector('#thumbnail').files[0];
    const authorName = document.querySelector('#author').value;
    const bookTitle = document.querySelector('#book-name').value;
    const urlAddress = document.querySelector('#url').value;
    const pageNumber = document.querySelector('#page-no').value;
    const checker = document.querySelector('#read').innerText;

    const newBook = new Book(thumbnail, authorName, bookTitle, urlAddress, pageNumber, checker);
    return newBook
}
