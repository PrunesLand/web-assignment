/*
 *
 * Module: <View>
 * < The purpose of this module is to store templates on presenting data to the user. In the MVC pattern, this is called the View and its purpose is to display the data to the user. the functions in this module is called in the main.js file to be execcuted.>
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

export function notLog(targetid, visible) {
    applyTemplate(targetid, 'not-logged', { "notlog": visible })
}

export function createForm(targetid, visible) {
    applyTemplate(targetid, 'create-post', visible)
}