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

function redraw() {

    // let content = "<h2>API Test</h2><ul>";
    // content += "<li><a href='/#'>Three Posts</a></li>";
    // content += "<li><a href='/#'>Recent Posts</a></li>";
    // content += "<li><a href='/#'>Popular Posts</a></li>";
    // content += "<li><a href='/posts/1'>A Single Post</a></li>"; 
    // content += "</ul>";

    // // update the page
    // document.getElementById("target").innerHTML = content;



    fetch('posts')
        .then(
            response => {
                response.json();
                console.log("Response", response)
            }


        )
        .then(
            data => console.log(data)
        )


}

window.onload = function () {
    Model.updatePosts();
    // redraw();
};


