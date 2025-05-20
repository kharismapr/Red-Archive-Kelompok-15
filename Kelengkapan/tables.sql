CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

-- Tabel user
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT 'Welcome to my profile!',
    profile_picture VARCHAR(255) DEFAULT 'https://res.cloudinary.com/drm5dmz1y/image/upload/v1747056313/default_sezkhw.jpg',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel film
CREATE TABLE IF NOT EXISTS film (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    total_rating INT DEFAULT 0,
    reviews INT DEFAULT 1,
    length INTERVAL NOT NULL,
    release_date DATE NOT NULL,
    actor_name VARCHAR(255) NOT NULL,
    director_name VARCHAR(255) NOT NULL,
    cover_picture VARCHAR(255) DEFAULT 'https://res.cloudinary.com/drm5dmz1y/image/upload/v1747057110/default_missing_gehecc.jpg'
);

-- Table review (user meninggalkan 1 review per film)
CREATE TABLE IF NOT EXISTS review (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    film_id UUID NOT NULL,
    user_id UUID NOT NULL,
    rating INT NOT NULL,
    details VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (film_id) REFERENCES film(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (film_id, user_id)
);

-- Table archive
CREATE TABLE IF NOT EXISTS archive (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    review_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (review_id) REFERENCES review(id) ON DELETE CASCADE,
    UNIQUE (user_id, review_id)
);

-- Table thread (tempat berdisuksi mengenai suatu film)
CREATE TABLE IF NOT EXISTS thread (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    film_id UUID,
    original_poster_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    thread_info VARCHAR(255) DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (film_id) REFERENCES film(id) ON DELETE CASCADE,
    FOREIGN KEY (original_poster_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table thread discussions (isi dari thread sendiri)
CREATE TABLE IF NOT EXISTS post (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thread_id UUID NOT NULL,
    user_id UUID NOT NULL,
    comment VARCHAR(255) NOT NULL,
    score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (thread_id) REFERENCES thread(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table forum (tempat thread yang satu topik dengan forum)
CREATE TABLE IF NOT EXISTS forum (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    thread_count INT DEFAULT 0,
    post_count INT DEFAULT 0,
    last_post_id UUID DEFAULT NULL, 
    cover_picture VARCHAR(255) DEFAULT 'https://res.cloudinary.com/drm5dmz1y/image/upload/v1747057110/default_missing_gehecc.jpg',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (last_post_id) REFERENCES post(id) ON DELETE CASCADE
);
