const reviewRepository = require('../repository/review.repository');
const r = require('../utils/utils');


// Retrieve all reviews
// No req.body
exports.getAll = async(req, res) => {
    try {
        const review = await reviewRepository.getAll();
        if(review) {
            r.resp(res, true, 200, "Review retrieved successfully", review);
        } else {
            r.resp(res, false, 404, "Review not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving review", error);
    }
}


// Retrieve a review based on film ID or user_id or both
// raw req.body
//     {
//         "user_id": <OPTIONAL>
//         "film_id": <OPTIONAL>
//     }
exports.getSpecific = async(req, res) => {
    try {
        const review = await reviewRepository.getSpecific(req.body.film_id, req.body.user_id);
        if(review) {
            r.resp(res, true, 200, "Review retrieved successfully", review);
        } else {
            r.resp(res, false, 404, "Review not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving review", error);
    }
}


// User creates a review of a certain film
// raw req.body
//     {
//         "film_id":,
//         "user_id":,
//         "rating":,
//         "details":
//     }
//       - "details" is an elaboration text the user gives in their review
//           if empty pass ""
exports.createReview = async(req, res) => {
    try {
        // Validate required fields
        const { film_id, user_id, rating, details } = req.body;
        if (!film_id || !user_id || !rating) {
            return r.resp(res, false, 400, "Missing required fields", null);
        }

        // Validate rating is between 1-10
        if (rating < 1 || rating > 10) {
            return r.resp(res, false, 400, "Rating must be between 1 and 10", null);
        }

        const review = await reviewRepository.createReview({
            film_id,
            user_id,
            rating,
            details: details || ''
        });

        if(review) {
            r.resp(res, true, 201, "Review created successfully", review);
        } else {
            r.resp(res, false, 500, "Failed to create review", null);
        }
    } catch (error) {
        console.error("Error in createReview:", error);
        r.resp(res, false, 500, "Error creating review", { error: error.message });
    }
}


// Edits a review in the database
// raw req.body
//     {
//         "review_id":,
//         "film_id":,
//         "user_id":,
//         "rating":,
//         "details":
//     }
exports.updateReview = async(req, res) => {
    try {
        const review = await reviewRepository.updateReview(req.body);
        if(review) {
            r.resp(res, true, 200, "Review updated successfully", review);
        } else {
            r.resp(res, false, 404, "Review not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error updating review", error);
    }
}


// Deletes a review by ID
// raw req.body
//     {
//         "review_id":
//     }
exports.deleteReview = async(req, res) => {
    try {
        const review = await reviewRepository.deleteReview(req.body.review_id);
        if(review) {
            r.resp(res, true, 200, "Review deleted successfully", review);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error deleting review", error);
    }
}


// Get reviews by film ID
exports.getByFilmId = async(req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return r.resp(res, false, 400, "Film ID is required", null);
        }

        const reviews = await reviewRepository.getSpecific(id);
        if(reviews && reviews.length > 0) {
            r.resp(res, true, 200, "Reviews retrieved successfully", reviews);
        } else {
            r.resp(res, true, 200, "No reviews found", []);
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving reviews", error);
    }
};