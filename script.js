const addBookMarkBtn = document.querySelector('.btn')
const modalContainerElem = document.querySelector('.modal-container')
const modalCloseBtn = document.querySelector('#modal-btn')
const mainContainerElem = document.querySelector('.main-container');
const titleElem = document.querySelector('#title');
const urladdressElem = document.querySelector('#address');
const formElem = document.querySelector('.form-modal')
const bookmarkContainerElem = document.querySelector('.container')
let deleteBookMarkElem;

let websiteTitleValue;
let websiteAddressValue;
let bookmarksList = [];


addBookMarkBtn.addEventListener('click', function () {
    modalContainerElem.hidden = false;
})
modalCloseBtn.addEventListener('click', function () {
    modalContainerElem.hidden = true;
})

window.addEventListener('click', function (e) {

    if (e.srcElement.classList.value === 'main-container') {
        if (modalContainerElem.hidden === false) {
            modalContainerElem.hidden = true
        }

    }
})
function validateValues(websiteTitleValue, websiteAddressValue) {
    if (!websiteTitleValue || !websiteAddressValue) {
        alert('Please Submit Both Values')
        return false;
    }
    return true;

}
function saveToLocalStroage(bookmarksList) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksList));
}

function fetchFromLocalStroge() {

    if (   localStorage.getItem('bookmarks')?.length === 0) {
        let bookmarksList1 = JSON.parse(localStorage.getItem('bookmarks'))

        bookmarksList.push(...bookmarksList1)

    }
    else {
        
        bookmarksList.push({
            title: "Google",
            url: "https://www.google.com/"
        })
    }

    loadBookMarkDataDom(bookmarksList);

}

fetchFromLocalStroge();

function deleteBookMark(data)
{
    const bookmarksListFilter =  bookmarksList.filter((ele)=>{
        if(!(ele.title === data))
        {
           return ele
        }
    } )
    bookmarksList = bookmarksListFilter;
    localStorage.setItem('bookmarks',JSON.stringify(bookmarksList));
    loadBookMarkDataDom(bookmarksList);

}

function loadBookMarkDataDom(bookmarksList) {

    bookmarkContainerElem.innerHTML = "";
    bookmarksList.forEach((ele)=>{
        const containerItemsElem = document.createElement('div');
        containerItemsElem.classList.add('container-items')
        const anchorElem = document.createElement('a');
        anchorElem.setAttribute('href',`${ele.url}`);
        anchorElem.setAttribute('target', '_blank');
        anchorElem.innerText = ele.title;
        const deleteIconElem = document.createElement('i');
        deleteIconElem.classList.add('fa-solid' ,'fa-xmark' , 'delete-btn' );
        deleteIconElem.setAttribute('onclick', `deleteBookMark('${ele.title}')`);
        containerItemsElem.appendChild(anchorElem);
        containerItemsElem.appendChild(deleteIconElem);
        bookmarkContainerElem.appendChild(containerItemsElem);
    })


    
}


function formDateSubmitHandler(e) {

    e.preventDefault()
    websiteTitleValue = titleElem.value;
    websiteAddressValue = urladdressElem.value;
    let validation = validateValues(websiteTitleValue, websiteAddressValue)
    if (!websiteAddressValue.includes('https://', 'http://')) {
        websiteAddressValue = `https://${websiteAddressValue}`
    }
    if (!validation) {
        return;
    }

    const bookmarksObj = {
        title: websiteTitleValue,
        url: websiteAddressValue
    }
    bookmarksList.push(bookmarksObj);
    saveToLocalStroage(bookmarksList);
    loadBookMarkDataDom(bookmarksList)
    formElem.reset();
    modalContainerElem.hidden = true;
}

formElem.addEventListener('submit', formDateSubmitHandler)
