// work of search button & fetching data from url
const search=()=>{
    toggleSpinner('block');
    toggleOutput('none');
    resultCount('none');
    const searchField=document.getElementById('search-text');
    const searchText=searchField.value;
    searchField.value='';

    const url=`https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
    .then(res=>res.json())
    .then(books=>searchResult(books.docs));

   
    
};

// spinner Adding
const toggleSpinner=displayInput=>{
    const spinner=document.getElementById('spinner-id');
    spinner.style.display=displayInput;
   
}
const toggleOutput=displayInput=>{
    const spinner=document.getElementById('cards');
    spinner.style.display=displayInput;
}

const resultCount=(displayInput)=>{
    const searchCount=document.getElementById('search-count');
    searchCount.style.display=displayInput;
}


// showing details of books and showing them using cards 
const searchResult=books=>{
    if(books.length==0){
        const searchCount=document.getElementById('search-count');
        searchCount.innerText='No Result Found';
    }
    const cards=document.getElementById('cards');
    cards.textContent='';
   let i=0;
    for(const book of books){
        i++;
        const newbook=document.createElement('div');
        newbook.classList.add('col');
        newbook.innerHTML=`
        <div class="card">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">Author Name:${book.author_name} <br>First Publish Year:${book.first_publish_year} <br>Subject :${book.subject}</p>
        </div>
      </div>

        `;
        cards.appendChild(newbook);

        toggleSpinner('none');
        toggleOutput('flex');

        const searchCount=document.getElementById('search-count');
searchCount.innerHTML=`${i} Results Found`;
resultCount('block');
    }
}
