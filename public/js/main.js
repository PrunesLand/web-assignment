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


    console.log(hash)

    if (hash.path == "") {
        view.threePosts('highlight', threepost);
        view.recentPosts('recentpost-item', recent);
        view.popularPosts('popularpost-item', popular);
    } else if (hash.path == "posts") {

        view.postView('post', Model.getPost(Number(hash.id)))
        view.threePosts('highlight', null);
        view.recentPosts('recentpost-item', null);
        view.popularPosts('popularpost-item', null);

    }
    bindings();

})

window.addEventListener("userLogin", function (e) {
    console.log("userlogin triggered")
    view.loginView("login", Auth.getUser())
})

window.addEventListener("likeAdded", function (e) {
    console.log('likeadded triggered')

    Model.updatePosts()
})

window.addEventListener("imageClicked", function (e) {
    console.log('Post selected')
    Model.updatePosts()
})
function person_click_handler() {
    Model.singlePost()
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
    event.preventDefault()
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

}


window.onload = function () {
    Model.updatePosts()
    view.loginView("login", Auth.getUser())
};


