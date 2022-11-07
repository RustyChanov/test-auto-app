const postsContainer = document.querySelector('.postContainer');

const getPosts = () => {
    return fetch(`/posts`)
        .then((response) => response.json())
        .then((allPosts) => {
            showPosts(allPosts);
        });
}

const showPosts = (posts) => {
    for (let post of posts) {
        const postContainer = document.createElement('div');
        postContainer.classList.add('post');
        for (let property in post) {
            const p = document.createElement('div');
            p.innerHTML = post[property];
            postContainer.append(p);
        }
        postsContainer.append(postContainer);
    }
}

getPosts();

// How to dynamically update data: an updating function should start within set period of time by fetching data through API and
// comparing current data array with a received one.
// If new data is different, then adding the new data by cycle and adding it to the right place by comparing the date and time.
// So push by using "slice" method new data