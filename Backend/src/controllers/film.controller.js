const filmRepository = require('../repository/film.repository');
const r = require('../utils/utils');


// Retrieve all films
// No req.body
exports.getAll = async(req, res) => {
    try {
        const films = await filmRepository.getAll();
        if(films && films.length > 0) {
            r.resp(res, true, 200, "Films retrieved successfully", films);
        } else {
            r.resp(res, true, 200, "No films found", []);
        }
    } catch (error) {
        console.error("Error in getAll:", error);
        r.resp(res, false, 500, "Error retrieving films", { error: error.message });
    }
}


// Retrieve a film based on ID
// raw req.body
//     {
//         "film_id":
//     }
exports.getById = async(req, res) => {
    try {
        if (!req.params.id) {
            return r.resp(res, false, 400, "Film ID is required", null);
        }

        const film = await filmRepository.getById(req.params.id);
        if(film) {
            r.resp(res, true, 200, "Film retrieved successfully", film);
        } else {
            r.resp(res, false, 404, "Film not found", null);
        }
    } catch (error) {
        console.error("Error in getById:", error);
        r.resp(res, false, 500, "Error retrieving film", { error: error.message });
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

// Get film by slug
exports.getBySlug = async(req, res) => {
    try {
        const { slug } = req.params;
        if (!slug) {
            return r.resp(res, false, 400, "Film slug is required", null);
        }

        const film = await filmRepository.getBySlug(slug);
        
        if(film) {
            r.resp(res, true, 200, "Film retrieved successfully", film);
        } else {
            r.resp(res, false, 404, "Film not found", null);
        }
    } catch (error) {
        console.error("Error in getBySlug:", error);
        r.resp(res, false, 500, "Error retrieving film", { error: error.message });
    }
};