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

window.addEventListener("modelUpdated", function (e) {

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

function person_click_handler() {
    let id = this.dataset.id;
    let post = Model.getPost(id);
    console.log(id)
    view.postView('post', post)
}

function bindings() {
    let image = document.getElementsByClassName("tenImg")
    for (let i = 0; i < image.length; i++) {
        image[i].onclick = person_click_handler;
    }
}


window.onload = function () {
    Model.updatePosts()

};


