export { Model };
/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements ...">
 *
 * Student Name:    Pranaya Anargya
 * Student Number:  45502773
 *
 */

/* 
 * Model class to support the FlowTow application
 * this object provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates different events:
 *   "modelUpdated" event when new data has been retrieved from the API
 *   "postAdded" event when a request to add a new post returns
 *   "likeAdded" event when a request to add a new like returns
 *   "commentAdded" event when a request to add a new comment returns 
*/

import { Auth } from './service.js'

const Model = {
    postsUrl: '/posts',
    uploadUrl: '/upload',
    commentsUrl: '/comments',

    //this will hold the post data stored in the model
    data: {
        posts: []
    },

    // updatePosts - retrieve the latest list of posts from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    updatePosts: function () {
        fetch(this.postsUrl)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                (data) => {
                    this.data.posts = data
                    console.log(data)
                    console.log('It is fetched!')
                    let event = new CustomEvent("modelUpdated");
                    window.dispatchEvent(event);
                }
            )
    },

    // getPosts - return an array of post objects
    getPosts: function () {
        //before that you may need to sort the posts by their timestamp
        return this.data.posts;
    },

    // getPost - return a single post given its id
    getPost: function (postid) {
        let posts = this.getPosts()

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === postid) {
                return posts[i]
            }
        }

    },

    setPosts: function (posts) {
        this.data.posts = posts;
    },

    // addPost - add a new post by submitting a POST request to the server API
    // postData is an object containing all fields in the post object (e.g., p_caption)
    // when the request is resolved, creates an "postAdded" event
    addPost: function (postData) {

        fetch(this.uploadUrl, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${Auth.getJWT()}`
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log('the data is ', data)
                return fetch(this.postsUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `bearer ${Auth.getJWT()}`
                    },
                    body: JSON.stringify(postData)
                })
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                this.data.posts.push(data)
                let event = new CustomEvent('addPost');
                window.dispatchEvent(event)
            })
    },

    // getUserPosts - return just the posts for one user as an array
    getUserPosts: function (userid) {
        let posts = this.getPosts()

        let userposts = []

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].p_author.id === userid) {
                userposts.push(posts[i])
            }
        }
        return userposts;
    },

    // addLike - increase the number of likes by 1 
    //      by submitting a PUT request to the server API
    //      postId - is the id of the post
    // when the request is resolved, creates an "likeAdded" event
    addLike: function (postId, data) {
        let likeUrl = '/posts/' + String(postId)

        fetch(likeUrl, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log('test like button')
                console.log(data)
                let event = new CustomEvent("likeAdded");
                window.dispatchEvent(event)
            })

    },

    // addComment - add a comment to a post 
    //      by submitting a POST request to the server API
    //      commentData is an object containing the content of the comment, the author and the postid
    // when the request is resolved, creates an "commentAdded" event
    addComment: function (commentData) {

    },

    //getRandomPosts - return N random posts as an array
    getRandomPosts: function (N) {
        let posts = this.getPosts()

        let randomPosts = []

        for (let i = 0; i < N; i++) {
            randomPosts.push(this.getPost(posts[Math.floor(Math.random() * posts.length)].id))
        }
        return randomPosts;
    },

    // getRecentPosts - return the N most recent as an array
    //  posts, ordered by timestamp, most recent first
    getRecentPosts: function (N) {
        let posts = this.getPosts()

        let recentPost = []

        for (let i = 0; i <= 9; i++) {
            recentPost.push(posts[i])
        }

        recentPost.sort((a, b) => (a.published_at < b.published_at) ? 1 : -1)

        return recentPost
    },

    // getPopularPosts - return the N most popular as an array
    // posts, ordered by the number of likes
    getPopularPosts: function (N) {
        let posts = this.getPosts()

        let popularPost = []

        for (let i = 0; i <= 9; i++) {
            popularPost.push(posts[i])
        }

        popularPost.sort((a, b) => (a.p_likes < b.p_likes) ? 1 : -1)

        return popularPost
    },

    getLikes: function (postId) {
        let posts = this.getPosts()

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === postId) {
                return Number(posts[i].p_likes)
            }
        }
    },

    singlePost: function () {
        let event = new CustomEvent("imageClicked");
        window.dispatchEvent(event)
        this.updatePosts()

    },

    allPost: function () {
        let event = new CustomEvent("allPosts");
        window.dispatchEvent(event)
        this.updatePosts()

    },
    myPost: function () {
        let event = new CustomEvent("myPosts");
        window.dispatchEvent(event)
        this.updatePosts()

    }


}