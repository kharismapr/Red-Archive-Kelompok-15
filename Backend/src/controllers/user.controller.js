const userRepository = require('../repository/user.repository');
const r = require('../utils/utils');
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const hashcg = (str, mode, hash) => {
    // Buat hash
    if(mode === 1) {
        return bcrypt.hashSync(str, salt);
    } else
    // Compare hash
    if (mode === 2) {
        return bcrypt.compareSync(str, hash);
    }
}

const isValid = (i) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwRegex = /^(?=.*\d)(?=.*\W)[\w\W\d]{8,}$/;
    if(
        emailRegex.test(i.email)
        /* && pwRegex.test(i.password) */
        === 
        true
    ) 
    {return true;} 
    else 
    {return false;}
}

// Registers user's data into the database
// raw req.body
// {
//     "name":,
//     "email":,
//     "password":
// }
exports.registerUser = async (req, res) => {
    try {
        let info = req.body;
        if(!isValid(info)) {
            r.resp(res, false, 400, "Input is invalid.", null);
        } else {
            let temp = hashcg(info.password, 1, null);
            info.password = temp;
            const user = await userRepository.registerUser(info);
            if(user) {
                r.resp(res, true, 200, "User created successfully", user);
            } else {
                r.resp(res, false, 400, "Email already used", null);
            }
        }
    } catch (error) {
        r.resp(res, false, 500, "Error registering user", error);
    }
}


// Checks wheter there is a user with the following email and password
// raw req.body
// {
//     "email":,
//     "password":
// }
exports.loginUser = async(req, res) => {
    try {
        let info = req.body;
        let plaintext = info.password;
        const user = await userRepository.loginUser(info.email);
        if(!user) {
            r.resp(res, false, 400, "Incorrect password or email", null);
        } else {
            let hashpw = user.password;
            console.log(plaintext, hashpw);
            console.log(hashcg(plaintext, 2, hashpw));
            if(hashcg(plaintext, 2, hashpw) === true) {
                r.resp(res, true, 200, "Login successful", user);
            } else {
                r.resp(res, false, 400, "Incorrect password or email", null);
            }
        }
    } catch (error) {
        r.resp(res, false, 500, "Error logging in", error);
    }
}



// Retrieves user by e-mail
// raw req.body
// {
//     "email":,
// }
exports.getEmail = async(req, res) => {
    if(!req.body.email) {
        return r.resp(res, false, 400, "Email is required", null);
    }
    
    try {
        const user = await userRepository.getEmail(req.body.email);
        if(user) {
            r.resp(res, true, 200, "User found", user);
        } else {
            r.resp(res, false, 404, "User not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error retrieving user", error);
    }
}



// Updates data of specific user
// raw req.body
//     {
//         "id":,
//         "user":,
//         "email":,
//         "password":,
//         "description":
//     }
exports.updateUser = async(req, res) => {
    if(!req.body.id || !req.body.name || !req.body.password || !req.body.email) {
        return r.resp(res, false, 400, "ID, name, password and email are required", null);
    }
    
    try {
        let info = req.body;
        if(!isValid(info)) {
            r.resp(res, false, 400, "Input is invalid.", null);
        } else {
            let temp = hashcg(info.password, 1, null);
            info.password = temp;
            const user = await userRepository.updateUser(info);
            if(user) {
                r.resp(res, true, 200, "User updated successfully", user);
            } else {
                r.resp(res, false, 404, "User not found", null)
            }
        }
    } catch (error) {
        r.resp(res, false, 500, "Error updating user", error);
    }
}



// Overwrites profile picture of user
// form-data req.body
//     {
//         "id":,
//         "image": {IMAGE FILE}
//     }
exports.uploadProfile = async(req, res) => {
    if(!req.file) {
        return r.resp(res, false, 400, "Image is required", null);
    }
    try {
        const user = await userRepository.uploadProfile(req);
        if(user) {
            r.resp(res, true, 200, "User updated successfully", user);
        } else {
            r.resp(res, false, 404, "User not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error updating user", error);
    }
}



// Delete user by ID
// raw req.body
//     {
//         "id":
//     }
exports.deleteUser = async(req, res) => {
    if(!req.body.id) {
        return r.resp(res, false, 400, "User ID is required", null);
    }
    
    try {
        const user = await userRepository.deleteUser(req.body.id);
        if(user) {
            r.resp(res, true, 200, "User deleted successfully", user);
        } else {
            r.resp(res, false, 404, "User not found", null)
        }
    } catch (error) {
        r.resp(res, false, 500, "Error deleting user", error);
    }
}