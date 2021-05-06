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
    let recent = Model.getRecentPosts()


    // below the ten most popular posts descending
    let popular = Model.getPopularPosts()


    view.loginView("login", Auth.getUser())
    if (hash.path == "") {
        view.threePosts('highlight', threepost);
        view.recentPosts('recentpost-item', recent);
        view.popularPosts('popularpost-item', popular);
    } else if (hash.path == "posts") {

        view.postView('post', Model.getPost(Number(hash.id)))
        view.threePosts('highlight', null);
        view.recentPosts('recentpost-item', null);
        view.popularPosts('popularpost-item', null);

    } else if (hash.path == "all-posts") {
        view.threePosts('highlight', null);
        view.recentPosts('recentpost-item', recent);
        view.popularPosts('popularpost-item', null);

    } else if (hash.path == "my-posts") {
        if (Auth.getUser() !== null) {
            view.threePosts('highlight', null);
            view.recentPosts('recentpost-item', Model.getUserPosts(Auth.getUser().id));
            view.popularPosts('popularpost-item', null);
        }
        else {
            view.notLog('popularpost-item')
            view.threePosts('highlight', threepost);
            view.recentPosts('recentpost-item', null);
            view.popularPosts('popularpost-item', null);
        }

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
    console.log('All posts triggered')
    Model.updatePosts()
})
window.addEventListener('myPosts', function (e) {
    console.log('My posts triggered')


})

function person_click_handler() {
    Model.singlePost()
}
function allpost_click_handler() {
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

    let loginform = document.getElementById('loginform')
    loginform.onsubmit = login_form_handler

    let allpost = document.getElementById('allpost')
    allpost.onclick = allpost_click_handler

    let mypost = document.getElementById('mypost')
    mypost.onclick = mypost_click_handler

}


window.onload = function () {
    Model.updatePosts()

};


