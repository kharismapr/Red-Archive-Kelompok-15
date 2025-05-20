const postRepository = require('../repository/post.repository');
const r = require('../utils/utils');


// Retrieve all posts
// No req.body
exports.getAll = async(req, res) => {
    try {
        const post = await postRepository.getAll();
        if(post) {
            r.resp(res, true, 200, "Post retrieved successfully", post);
        } else {
            r.resp(res, false, 404, "Post not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving post", error);
    }
}



// Retrieve a post based on post_id
// raw req.body
//     {
//         "post_id":
//     }
exports.getById = async(req, res) => {
    try {
        const post = await postRepository.getById(req.body.post_id);
        if(post) {
            r.resp(res, true, 200, "Post retrieved successfully", post);
        } else {
            r.resp(res, false, 404, "Post not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving post", error);
    }
}


// User creates a post
// raw req.body
//     {
//         "name":,
//         "film_id": <OPTIONAL>,
//         "original_poster_id":,
//         "post_info":
//     }
exports.createPost = async(req, res) => {
    try {
        const post = await postRepository.createPost(req.body);
        if(post) {
            r.resp(res, true, 200, "Post inserted successfully", post);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error inserting post", error);
    }
}



// User updates a post
// raw req.body
//     {
//         "name":,
//         "image": <OPTIONAL> {IMAGE FILE}
//     }
exports.updatePost = async(req, res) => {
    try {
        let post;
        if(!req.file) {
            post = await postRepository.updatePost(req.body.name);
        } else {
            post = await postRepository.updatePost(req);
        }
        if(post) {
            r.resp(res, true, 200, "Post inserted successfully", post);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error inserting post", error);
    }
}


// Deletes a post by ID
// raw req.body
//     {
//         "id":
//     }
exports.deletePost = async(req, res) => {
    try {
        const post = await postRepository.deletePost(req.body.id);
        if(post) {
            r.resp(res, true, 200, "Post deleted successfully", post);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error deleting post", error);
    }
}