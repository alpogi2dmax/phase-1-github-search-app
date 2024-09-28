document.addEventListener("DOMContentLoaded", () => {
    getSearch();
    getRepos();
    captureSearch()
});

function getSearch() {
    fetch('https://api.github.com/search/users?q=octocat')
    .then(res => res.json())
    .then(data => console.log(data))
}

function getRepos() {
    fetch('https://api.github.com/users/octocat/repos')
    .then(res => res.json())
    .then(data => console.log(data))
}

function captureSearch() {
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const input = document.querySelector('#search');
        console.log(input.value);

        document.querySelector('#user-list').innerHTML = "";
        document.querySelector('#repos-list').innerHTML = "";

        fetch(`https://api.github.com/search/users?q=${input.value}`)
        .then(res => res.json())
        .then(searchData => {
            console.log(searchData);
            searchData.items.forEach(search => renderOneSearch(search));
        })    
    })
    
}

function renderOneSearch(search) {
    let li = document.createElement('li');
    li.innerHTML = "";
    li.innerHTML = `
    <h2 class='name'>${search.login}</h2>
    <a href=${search.avatar_url}>${search.avatar_url}</a>
    <a href=${search.url}>${search.url}</a>
    `
    li.querySelector('.name').addEventListener('click', () => {
        let name = li.querySelector('.name');
        console.log(name.textContent);

        document.querySelector('#repos-list').innerHTML = "";    

        fetch(`https://api.github.com/users/${name.textContent}/repos`)
        .then(res => res.json())
        .then(reposData => {
            console.log(reposData);
            reposData.forEach(repos => renderOneRepos(repos));
        })
    });

    document.querySelector('#user-list').appendChild(li);
}

function renderOneRepos(repos) {
    let li = document.createElement('li');
    li.innerHTML = `
    <p>${repos.name}</p>
    `
    document.querySelector('#repos-list').appendChild(li);
}