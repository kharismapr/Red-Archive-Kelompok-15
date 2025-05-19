const filmRepository = require('../repository/film.repository');
const r = require('../utils/utils');


// Retrieve all films
// No req.body
exports.getAll = async(req, res) => {
    try {
        const film = await filmRepository.getAll();
        if(film) {
            r.resp(res, true, 200, "Film retrieved successfully", film);
        } else {
            r.resp(res, false, 404, "Film not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving film", error);
    }
}


// Retrieve a film based on ID
// raw req.body
//     {
//         "film_id":
//     }
exports.getById = async(req, res) => {
    try {
        const film = await filmRepository.getById(req.body.film_id);
        if(film) {
            r.resp(res, true, 200, "Film retrieved successfully", film);
        } else {
            r.resp(res, false, 404, "Film not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving film", error);
    }
}


// Inserts a film into the database
// form-data req.body
//     {
//         "image": {FILE},
//         "name": {TEXT},
//         "genre": {TEXT},
//         "length": {TEXT},
//         "actor_name": {TEXT},
//         "director_name": {TEXT},
//         "release_date": {TEXT},
//     }
//       - Image for cover_picture
//       - Format of "length":
//           (Insert 0 if non-applicable)
//            HH:MM:SS
//       - Format of "release_date":
//            'YYYY-MM-DD'
exports.insertFilm = async(req, res) => {
    if(!req.file) {
        return r.resp(res, false, 400, "Cover image is required", null);
    }
    try {
        const film = await filmRepository.insertFilm(req);
        if(film) {
            r.resp(res, true, 200, "Film inserted successfully", film);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error inserting film", error);
    }
}


// Edits a film in the database
// form-data req.body
//     {
//         "id": {TEXT},
//         "image": {FILE} <OPTIONAL>,
//         "name": {TEXT},
//         "genre": {TEXT},
//         "length": {TEXT},
//         "actor_name": {TEXT},
//         "director_name": {TEXT},
//         "release_date": {TEXT},
//     }
//       - Format is the same as insertFilm()
exports.updateFilm = async(req, res) => {
    try {
        const film = await filmRepository.updateFilm(req);
        if(film) {
            r.resp(res, true, 200, "Film edited successfully", film);
        } else {
            r.resp(res, false, 404, "Film not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error editing film", error);
    }
}


// Deletes a film by ID
// raw req.body
//     {
//         "film_id":
//     }
exports.deleteFilm = async(req, res) => {
    try {
        const film = await filmRepository.deleteFilm(req.body.id);
        if(film) {
            r.resp(res, true, 200, "Film deleted successfully", film);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error deleting film", error);
    }
}