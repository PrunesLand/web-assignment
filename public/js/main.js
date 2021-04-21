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
    view.threePosts('flowtow', threepost)

    // below the ten most recent posts descending
    let recent = Model.getRecentPosts()
    view.recentPosts('recentpost-item', recent)

    // below the ten most popular posts descending
    let popular = Model.getPopularPosts()
    view.popularPosts('popularpost-item', popular)

    bindings();

})

window.addEventListener("likeAdded", function (e) {
    console.log('likeadded triggered')


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
    Model.addLike(id)
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


