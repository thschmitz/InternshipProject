USE realstate_new;

CREATE TABLE IF NOT EXISTS Posts (
    id int(11) NOT NULL PRIMARY KEY auto_increment,
    body text NOT NULL,
    created_at TIMESTAMP,
    price double NOT NULL,
    size double NOT NULL,
    title varchar(30) NOT NULL,
    restrooms int NOT NULL,
    bedrooms int NOT NULL,
    `type` varchar(10) NOT NULL,
    author_id int(11) NOT NULL,
    latitude varchar(45) NOT NULL,
    longitude varchar(45) NOT NULL,
    main_image varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
    id int(11) NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    email varchar(255) NOT NULL,
    `name` varchar(45) NOT NULL,
    `password` varchar(80) NOT NULL,
    `image` varchar(255) NOT NULL,
    `admin` tinyint NOT NULL,
    phone int(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS Feedbacks (
    id int(11) NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    post_id int(11) NOT NULL,
    author_id int(11) NOT NULL
);


CREATE TABLE IF NOT EXISTS Comments (
    id int(11) NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    body text NOT NULL,
    author_id int(11) NOT NULL,
    post_id int(11) NOT NULL
);

CREATE TABLE IF NOT EXISTS PostsImages (
    id int(11) NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    image_url varchar(255) NOT NULL,
    post_id int(11) NOT NULL
);

CREATE TABLE IF NOT EXISTS Labels (
	id int(11) NOT NULL PRIMARY KEY auto_increment,
    created_at TIMESTAMP,
    label varchar(15) NOT NULL,
    icon varchar(20) NOT NULL,
    `description` varchar(45) NOT NULL
)
