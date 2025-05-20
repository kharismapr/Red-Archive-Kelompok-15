const threadRepository = require('../repository/thread.repository');
const r = require('../utils/utils');


// Retrieve all threads
// No req.body
exports.getAll = async(req, res) => {
    try {
        const thread = await threadRepository.getAll();
        if(thread) {
            r.resp(res, true, 200, "Thread retrieved successfully", thread);
        } else {
            r.resp(res, false, 404, "Thread not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving thread", error);
    }
}



// Retrieve a thread based on thread_id
// raw req.body
//     {
//         "thread_id":
//     }
exports.getById = async(req, res) => {
    try {
        const thread = await threadRepository.getById(req.body.thread_id);
        if(thread) {
            r.resp(res, true, 200, "Thread retrieved successfully", thread);
        } else {
            r.resp(res, false, 404, "Thread not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving thread", error);
    }
}


// User creates a thread
// raw req.body
//     {
//         "name":,
//         "film_id": <OPTIONAL>,
//         "original_poster_id":,
//         "thread_info":
//     }
exports.createThread = async(req, res) => {
    try {
        const thread = await threadRepository.createThread(req.body);
        if(thread) {
            r.resp(res, true, 200, "Thread inserted successfully", thread);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error inserting thread", error);
    }
}



// User updates a thread
// raw req.body
//     {
//         "name":,
//         "image": <OPTIONAL> {IMAGE FILE}
//     }
exports.updateThread = async(req, res) => {
    try {
        let thread;
        if(!req.file) {
            thread = await threadRepository.updateThread(req.body.name);
        } else {
            thread = await threadRepository.updateThread(req);
        }
        if(thread) {
            r.resp(res, true, 200, "Thread inserted successfully", thread);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error inserting thread", error);
    }
}


// Deletes a thread by ID
// raw req.body
//     {
//         "id":
//     }
exports.deleteThread = async(req, res) => {
    try {
        const thread = await threadRepository.deleteThread(req.body.id);
        if(thread) {
            r.resp(res, true, 200, "Thread deleted successfully", thread);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error deleting thread", error);
    }
}