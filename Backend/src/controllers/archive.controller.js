const archiveRepository = require('../repository/archive.repository');
const r = require('../utils/utils');


// Retrieve all archives
// No req.body
exports.getAll = async(req, res) => {
    try {
        const archive = await archiveRepository.getAll();
        if(archive) {
            r.resp(res, true, 200, "Archive retrieved successfully", archive);
        } else {
            r.resp(res, false, 404, "Archive not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving archive", error);
    }
}


// Retrieve a archive based on user_id
// raw req.body
//     {
//         "user_id":
//     }
exports.getByUser = async(req, res) => {
    try {
        const archive = await archiveRepository.getByUser(req.body.user_id);
        if(archive) {
            r.resp(res, true, 200, "Archive retrieved successfully", archive);
        } else {
            r.resp(res, false, 404, "Archive not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving archive", error);
    }
}


// User creates a archive of a certain film
// raw req.body
//     {
//         "user_id":,
//         "review_id":
//     }
exports.createArchive = async(req, res) => {
    try {
        const archive = await archiveRepository.createArchive(req.body);
        if(archive) {
            r.resp(res, true, 200, "Archive inserted successfully", archive);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error inserting archive", error);
    }
}


// Deletes a archive by ID
// raw req.body
//     {
//         "id":
//     }
exports.deleteArchive = async(req, res) => {
    try {
        const archive = await archiveRepository.deleteArchive(req.body.id);
        if(archive) {
            r.resp(res, true, 200, "Archive deleted successfully", archive);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error deleting archive", error);
    }
}