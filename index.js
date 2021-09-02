// ------ Loading function --------
const toggleSpinner = displayStyle =>{
    document.getElementById('spinner').style.display = displayStyle;
}
// ======== arrow function is been used here ========
const searchBook = () =>{
    const searchField = document.getElementById('search-field');
    // display Loading
    toggleSpinner('block')
    const searchText = searchField.value;
    // Clear data
    searchField.value = '';
    if(searchText === ''){
        const searchlength = document.getElementById('search-length');
        searchlength.innerHTML =`Please write something to dispaly`
        toggleSpinner('none');
    }else{
    // Load Data
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
    .then(response => response.json())
    .then(datas => showBookResult(datas.docs ,datas.docs.length));
    }
}

const showBookResult = (data, length) =>{

    const searchlength = document.getElementById('search-length');
    searchlength.innerHTML = `You have got <span class="text-info">${length}</span> search result.`
    const searchResult = document.getElementById('sarch-result');
    searchResult.innerHTML = '';
    console.log(data);
    if(length === 0){
        searchlength.innerHTML = `NO result found`;
        toggleSpinner('none');
    }
// ============== arrow function and ES6 is been used here ===============
    data.forEach(datas => {
        // console.log(datas);
        const coldiv = document.createElement('div');
        coldiv.classList.add('col');
        coldiv.innerHTML = `
                        <div class="card h-100 border-dark">
                            <img src="https://covers.openlibrary.org/b/id/${datas.cover_i}-M.jpg" class="card-img-top img-fluid p-2" alt="...">

                        <div class="card-body">
                            <h5><span class="fw-bold">Name:</span> ${datas.title}<h5>
                            <h5><span class="fw-bold">Author Name:</span> ${datas.author_name[0]}<h5>
                            <h5><span class="fw-bold">First Publish year:</span> ${datas.first_publish_year}<h5>
                            <h5><span class="fw-bold">Book Publisher:</span> ${datas.publisher}<h5>
                        </div>
                        </div>`;
        searchResult.appendChild(coldiv);
        // hide Loading
        toggleSpinner('none');
    })
    
}
