/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements view functions...">
 *
 * Student Name: Pranaya Anargya
 * Student Number: 45502773
 *
 */

function applyTemplate(targetid, templateid, data) {
    let target = document.getElementById(targetid)

    let template = Handlebars.compile(
        document.getElementById(templateid).textContent
    )

    target.innerHTML = template(data)
}

export function threePosts(targetid, data) {

    applyTemplate(targetid, "threeposts-list", { "data": data })


}

export function recentPosts(targetid, data) {

    applyTemplate(targetid, "recentposts-list", { "data": data })

}

export function popularPosts(targetid, data) {

    applyTemplate(targetid, "popularposts-list", { "data": data })

}

export function postView(targetid, data) {
    applyTemplate(targetid, "postview", data)
}

export function allPosts(targetid, data) {
    threePosts(targetid, data);
    recentPosts(targetid, data);
    popularPosts(targetid, data);
}

export function loginView(targetid, data) {
    applyTemplate(targetid, 'login-template', { "username": data })
}