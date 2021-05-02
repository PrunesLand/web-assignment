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

window.addEventListener("modelUpdated", function (e) {

    let hash = splitHash(window.location.hash)

    console.log('modelUpdated triggered')
    let posts = Model.getPosts();
    //below the three random posts works
    let threepost = Model.getRandomPosts(3)
    view.threePosts('highlight', threepost)

    // below the ten most recent posts descending
    let recent = Model.getRecentPosts()
    view.recentPosts('recentpost-item', recent)

    // below the ten most popular posts descending
    let popular = Model.getPopularPosts()
    view.popularPosts('popularpost-item', popular)

    bindings();
    //person click handler should change the hash url to the id of the perosn clicked
    //views of all posts should be within a single view function accepting all data for each view
    // if statement inside modelupdated function like the lecture video under bindings
    // 

})

window.addEventListener("likeAdded", function (e) {
    console.log('likeadded triggered')

    Model.updatePosts()
    bindings();
})

function person_click_handler() {
    let id = this.dataset.id;
    let post = Model.getPost(Number(id));
    console.log(post)
    view.postView('post', post)
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

function bindings() {
    let image = document.getElementsByClassName("tenImg")
    let like = document.getElementsByClassName("likeButton")
    for (let i = 0; i < image.length; i++) {
        image[i].onclick = person_click_handler;
    }
    for (let i = 0; i < like.length; i++) {
        like[i].onclick = like_click_handler;
    }
}


window.onload = function () {
    Model.updatePosts()

};


