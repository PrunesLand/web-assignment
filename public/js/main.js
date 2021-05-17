/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name: Pranaya
 * Student Number:  45502773
 *
 */
import { Model } from './model.js'
import * as view from './views.js'
import { splitHash } from './util.js'
import { Auth } from './service.js'

window.addEventListener("modelUpdated", function (e) {

    let hash = splitHash(window.location.hash)

    console.log('modelUpdated triggered')
    //below the three random posts works
    let threepost = Model.getRandomPosts(3)


    // below the ten most recent posts descending
    let recent = Model.getRecentPosts(9)


    // below the ten most popular posts descending
    let popular = Model.getPopularPosts(9)


    view.loginView("login", Auth.getUser())
    if (hash.path === '') {
        view.threePosts('highlight', threepost);
        view.recentPosts('recentpost-item', recent, true);
        view.popularPosts('popularpost-item', popular, true);
    }
    if (hash.path == 'posts') {
        view.postView('highlight', Model.getPost(Number(hash.id)))
        view.popularPosts('popularpost-item', null, false);
        view.recentPosts('recentpost-item', null, false);

    }

    bindings();

})

window.addEventListener("userLogin", function (e) {
    console.log("userlogin triggered")
    console.log(Auth.getUser().username)
    view.loginView("login", Auth.getUser())
    console.log(Model.getUserPosts(Auth.getUser().id))
})

window.addEventListener("likeAdded", function (e) {
    console.log('likeadded triggered')

    Model.updatePosts()
})

window.addEventListener("imageClicked", function (e) {
    console.log('Post selected')
    Model.updatePosts()
})

window.addEventListener('failedLogin', function (e) {
    console.log('Failed login triggered')
    view.failMessage('error-message')
})
window.addEventListener('allPosts', function (e) {
    let allpost = Model.getPosts();
    console.log('All posts triggered')
    if (Auth.getUser() !== null) {
        view.createForm('createPost', false)
    }
    view.recentPosts('recentpost-item', allpost, true);
    view.popularPosts('popularpost-item', null, false);
    view.threePosts('highlight', null);
    view.notLog('noLog', false)
    bindings();
    e.preventDefault()
})
window.addEventListener('myPosts', function (e) {
    console.log('My posts triggered')
    if (Auth.getUser() !== null) {
        view.createForm('createPost', true)
        view.recentPosts('recentpost-item', Model.getUserPosts(Auth.getUser().id));
    }
    else {
        view.notLog('noLog', true)
        view.threePosts('highlight', null);
        view.recentPosts('recentpost-item', null, false);
        view.popularPosts('popularpost-item', null, false);
    }
    e.preventDefault()

})
window.addEventListener('addPost', function (e) {
    console.log('Add post triggered')


})

function person_click_handler() {
    Model.singlePost()
}
function allpost_click_handler(event) {
    Model.allPost()

}
function mypost_click_handler() {
    Model.myPost()
}
function like_click_handler() {
    let id = this.dataset.id;
    let likes = Model.getLikes(Number(id));
    const like_data = {
        "p_likes": likes + 1
    }
    Model.addLike(id, like_data)

    console.log(likes)
}

function addPost_handler(event) {
    console.log('This form is ', this)

    const url = this.elements['p_url'].value;
    const caption = this.elements['p_caption'].value;
    const author = Auth.getUser().username
    console.log(author)
    const postData = {
        "p_url": url,
        "p_caption": caption,
        "p_author": author
    }

    event.preventDefault()
    Model.addPost(postData)


}

function login_form_handler(event) {

    console.log('the login form is ', this)

    const username = this.elements['username'].value
    const password = this.elements['password'].value

    //send authInfo to backend for user authentication
    Auth.login(username, password)
    event.preventDefault()
}

function bindings() {
    let image = document.getElementsByClassName("tenImg")
    let like = document.getElementsByClassName("likeButton")
    for (let i = 0; i < image.length; i++) {
        image[i].onclick = person_click_handler;
    }
    for (let i = 0; i < like.length; i++) {
        like[i].onclick = like_click_handler;
    }

    // let loginform = document.getElementById('loginform')
    // loginform.onsubmit = login_form_handler

    let allpost = document.getElementById('allpost')
    allpost.onclick = allpost_click_handler

    let mypost = document.getElementById('mypost')
    mypost.onclick = mypost_click_handler

    // let addpost = document.getElementById('postform')
    // addpost.onsubmit = addPost_handler

    if (!Auth.getUser()) {
        let loginform = document.getElementById('loginform')
        loginform.onsubmit = login_form_handler
    } else {
        let addpost = document.getElementById('postform')
        addpost.onsubmit = addPost_handler
    }
}


window.onload = function () {
    Model.updatePosts()

};


