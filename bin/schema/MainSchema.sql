CREATE TABLE Posts (
    id varchar(255) NOT NULL PRIMARY KEY,
    body varchar(255) NOT NULL,
    created_at datetime(6) NOT NULL DEFAULT NOW(),
    price double NOT NULL,
    size double NOT NULL,
    title varchar(255) NOT NULL,
    restrooms int NOT NULL,
    bedrooms int NOT NULL,
    `type` varchar(255) NOT NULL
);

CREATE TABLE Users (
    id varchar(255) NOT NULL PRIMARY KEY,
    created_at datetime(6) NOT NULL DEFAULT NOW(),
    email varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    image varchar(255) NOT NULL,
    `admin` tinyint NOT NULL
);

CREATE TABLE Feedbacks (
    id varchar(255) NOT NULL PRIMARY KEY,
    created_at datetime(6) NOT NULL DEFAULT NOW(),
    post_id varchar(255) NOT NULL,
    author_id varchar(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE RESTRICT,
    FOREIGN KEY (author_id) REFERENCES Users(id) ON DELETE RESTRICT
);


CREATE TABLE Comments (
    id varchar(255) NOT NULL PRIMARY KEY,
    created_at datetime(6) NOT NULL DEFAULT NOW(),
    body varchar(255) NOT NULL,
    author_id varchar(255) NOT NULL,
    post_id varchar(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE RESTRICT,
    FOREIGN KEY (author_id) REFERENCES Users(id) ON DELETE RESTRICT
);

CREATE TABLE PostsImages (
    id varchar(255) NOT NULL PRIMARY KEY,
    created_at datetime(6) NOT NULL DEFAULT NOW(),
    image_url varchar(255) NOT NULL,
    post_id varchar(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE RESTRICT
)
