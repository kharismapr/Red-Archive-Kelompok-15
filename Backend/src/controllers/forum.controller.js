const forumRepository = require('../repository/forum.repository');
const r = require('../utils/utils');


// Retrieve all forums
// No req.body
exports.getAll = async(req, res) => {
    try {
        const forum = await forumRepository.getAll();
        if(forum) {
            r.resp(res, true, 200, "Forum retrieved successfully", forum);
        } else {
            r.resp(res, false, 404, "Forum not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving forum", error);
    }
}



// Retrieve a forum based on forum_id
// raw req.body
//     {
//         "forum_id":
//     }
exports.getById = async(req, res) => {
    try {
        const forum = await forumRepository.getById(req.body.forum_id);
        if(forum) {
            r.resp(res, true, 200, "Forum retrieved successfully", forum);
        } else {
            r.resp(res, false, 404, "Forum not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving forum", error);
    }
}


// User creates a forum of a certain film
// form-data req.body
//     {
//         "name":,
//         "image": {IMAGE FILE}
//     }
exports.createForum = async(req, res) => {
    if(!req.file) {
        return res.status(400).send("Missing image file");
    }
    try {
        const forum = await forumRepository.createForum(req);
        if(forum) {
            r.resp(res, true, 200, "Forum inserted successfully", forum);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error inserting forum", error);
    }
}



// User updates a forum
// form-data req.body
//     {
//         "name":,
//         "image": <OPTIONAL> {IMAGE FILE}
//     }
exports.updateForum = async(req, res) => {
    try {
        let forum;
        if(!req.file) {
            forum = await forumRepository.updateForum(req.body.name);
        } else {
            forum = await forumRepository.updateForum(req);
        }
        if(forum) {
            r.resp(res, true, 200, "Forum inserted successfully", forum);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error inserting forum", error);
    }
}


// Deletes a forum by ID
// raw req.body
//     {
//         "id":
//     }
exports.deleteForum = async(req, res) => {
    try {
        const forum = await forumRepository.deleteForum(req.body.id);
        if(forum) {
            r.resp(res, true, 200, "Forum deleted successfully", forum);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error deleting forum", error);
    }
}