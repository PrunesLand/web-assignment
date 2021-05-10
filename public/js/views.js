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

export function recentPosts(targetid, data, visible) {

    applyTemplate(targetid, "recentposts-list", { "data": data, "visible": visible })

}

export function popularPosts(targetid, data, visible) {

    applyTemplate(targetid, "popularposts-list", { "data": data, "visible": visible })

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
    applyTemplate(targetid, 'login-template', { "user": data })
}

export function failMessage(targetid) {
    applyTemplate(targetid, 'fail-login', { "fail": true })
}

export function notLog(targetid) {
    applyTemplate(targetid, 'not-logged', { "notlog": true })
}

export function createForm(targetid, visible) {
    applyTemplate(targetid, 'create-post', visible)
}