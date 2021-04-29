# Prime Digital Academy Solo Project: _App of Holding_

## Description

_Duration: 2 Week Sprint_

Often times, when you go to play disc golf you have to play alone. This can be unfortunate as one of the best aspects of the game is the friendly competition. I built Disc Buds to remedy this. This app allows the user to compete against a friends previous scores. They can go to a course and it will show them which of their friends have played the course. they can choose a friend to play against and as they enter a score for each hole it will show them their friend's score. After the final hole they will see their final scores and see who won. it also tracks your records against your friends so you can see how you have played against them.

This application implements the full use of CRUD methodologies as the framework for its RESTful API. This project is not intended for sale, but as a demonstration of my ability to write a full-stack application.

To see the fully functional site, please visit: [Disc Buds](https://disc-buds.herokuapp.com/#/home)

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [Postgres](https://www.postgresql.org/download/)
- [Postico](https://eggerapps.at/postico/)

## Installation

1. Create a database named `disc_buds`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!
7. You will need a login to the PDGA API in order for the course search to work. See more info at [PDGA API](https://www.pdga.com/dev)

## Usage
How does someone use this application? Tell a user story here.

1. As a user, I can create an account.
2. As a user, I search for friends to add.
3. As a user, I can search for courses to add.
4. As a user, I can play a course and see which of my friends have played that course.
5. As a user, I can play against my friends previous scores.
6. As a user, I can play against a random player from a course if I don't have a friend who has played that course.
7. As a user, I can view my head to head record against my friends.

## Built With

- HTML
- CSS
- Javascript
- React
- Redux
- Node.js
- Express
- PostgreSQL
- Material-UI
- [PDGA API](https://www.pdga.com/dev)


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality, especially Edan Schwartz and Chad Smith. Thanks to my family and friends who supported me. And a big thanks to the members of my cohort for helping me solve problems and work through bugs.

