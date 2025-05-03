let counter = 0; // post 0
const quantity = 40; // many post by fetch 

document.addEventListener('DOMContentLoaded', load); 

// check when user reach to the bottom 
window.onscroll = () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
        load(); 
    }
}; 

// load posts 
function load(){
    const start = counter; 
    const end = start + quantity -1; 
    counter = end + 1 ; 

    fetch(`/posts?start=${start}&end=${end}`)
        .then(response => response.json())
        .then(data =>{
            if(data.posts.length ===0){
                console.log("No more posts to load"); 
                return; 
            }
            data.posts.forEach(addPost); 
        }); 
}

// add post to the page 

function addPost(content){
    const post = document.createElement('div'); 
    post.className = 'post'; 
    post.innerHTML = content; 
    document.querySelector('#posts').append(post); 
}


