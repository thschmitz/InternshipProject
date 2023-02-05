# RealStateServer

![GitHub last commit](https://img.shields.io/github/last-commit/thschmitz/RealStateServer?label=Commited&logo=Github&style=flat-square)
![GitHub](https://img.shields.io/github/license/thschmitz/RealStateServer?color=%2300ff0&label=License&logo=AdGuard&logoColor=%2368BC71)

## App Start
- "sudo mongod" on terminal
- Run the main file of the spring application

## Documentation

| Request | RequestMethod | Description | Body | Header |
| --- | :---: | :---: | :---: | :---: |
| **User** | --- | --- | --- | --- |
| `/users` | `GET` |  List all users registered | --- | --- |
| `/users` | `POST` | Create a new user | Name, Password, Email, Image | --- |
| `/users/{id}` | `GET` | Show the user that has the mentioned id | --- | --- |
| `/users/{id}` | `PUT` | Update the user that has the mentioned id | Name, Password, Email, Image | JWT |
| `/users/{id}` | `DELETE` | Delete the user that has the mentioned id | --- | JWT |
| `/users/{id}/posts` | `GET` | Show all the posts from the user that has the mentioned id | --- | JWT |
| `/users/login` | `POST` | Make the loggin for an determinate user | Email, Password | --- |
| `/users/session` | `GET` | Take the session for a user according to it's token | --- | JWT |
| `/users/namesearch?text={text}` | `GET` | Search for a user which has the name passed | Text | --- |
| **Post** | --- | --- | --- |
| `/posts` | `GET` | List all posts registered | --- | --- |
| `/posts` | `POST` | Create a new post | Title, Body, Imagem, Status, Price, Size | JWT |
| `/posts/{id}` | `GET` | Show the posts that has the mentioned id | --- | --- |
| `/posts/{id}` | `DELETE` | Delete the post that has the mentioned id | --- | JWT |
| `/posts/{id}` | `PUT` | Update the posts that has the mentioned id | Title, Body, Imagem, Status, Price, Size | JWT |
| `/posts/like/{id}` | `POST` | Like the posts that has the mentioned id | --- | JWT |
| `/posts/{id}/comments` | `POST` | Like the posts that has the mentioned id | --- | JWT |
| `/posts/titlesearch` | `GET` | Search for a post which has the title passsed | Title | --- |
| `/posts/bodysearch` | `GET` | Search for a post which has the body passsed | Body | --- |
| **Comment** | --- | --- | --- |
| `/comments` | `GET` | List all comments registered | --- | --- |
| `/comments/{id}` | `GET` | Show the comment that has the mentioned id | --- | --- |
| `/comments/{id}` | `POST` | Create a new comment and put it into the post that has the mentioned id | --- | JWT |
| `/comments/{id}` | `DELETE` | Delete the comment that has the mentioned id | --- | JWT |
