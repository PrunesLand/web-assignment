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
    view.threePosts('flowtow', posts)

    // bindings();
})

window.addEventListener('threeposts', function (e) {
    console.log('threeposts triggered')
    let threepost = Model.getRandomPosts(3)
    view.threePosts('flowtow', threepost)
})


window.onload = function () {
    Model.updatePosts()

};


