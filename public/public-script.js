// const getPosts = () => {
//     return fetch(`/posts`)
//         .then((response) => response.json())
// }
//
// const getDataBtn = document.querySelector('.get-data');
//
// getDataBtn.addEventListener('click', () => {
//     getPosts().then((data) => {
//         const allPosts = data;
//         console.log(allPosts);
//     });
// });

const socket = io();

const form = document.querySelector('.form');

const author = form.author;
const title = form.title;
const content = form.content;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userData = {
        author: author.value,
        title: title.value,
        content: content.value
    }
    console.log(userData);
    socket.emit('user data', userData);
});

socket.on('user data', (data) => {
    console.log(data);
});