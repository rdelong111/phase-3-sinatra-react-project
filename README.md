# Phase 3 Project

## Introduction
For this project, I created a site about something that I am currently obsessing over at the moment in my life which is disc golf. I knew that I could use my current obsession to create tables in Ruby and have multiple associations with golfers, discs, and manufacturers. I'm not always around my disc golf bag, and I wanted a way to see/remember what I owned. With this project I could add all of my inventory after adding and use however I need, such as creating a bag for a round. I can also add other people and create bags for them if ever asked.

### Requirements
- Use Active Record to interact with a database.
- Have at least two models with a one-to-many relationship.
- At a minimum, set up the following API routes in Sinatra:
  - create and read actions for both models
  - full CRUD capability for one of the models
- Build a separate React frontend application that interacts with the API to
  perform CRUD actions.
- Use good OO design patterns. You should have separate classes for each of your
  models, and create instance and class methods as necessary.
- Routes in your application (both client side and back end) should follow RESTful conventions.
- Use your back end optimally. Pass JSON for related associations to the front end from the back end. You should use active record methods in your controller to grab the needed data from your database and provide as JSON to the front end. You should NOT be relying on filtering front end state or a separate fetch request to retrieve related data.

## Before you open the app...
Navigate to the project folder on TWO separate terminals.

### Backend Setup
On one terminal, navigate to the project server directory:
```console
$ cd project-server
```

To install the required gems:
```console
$ bundle i
```

Once gems are installed, run the server:
```console
$ bundle exec rake server
```

This will run your server on port
[http://localhost:9292](http://localhost:9292).

### Frontend Setup
On the other terminal, navigate to the project client directory:
```console
$ cd project-client
```

To install the required dependencies:
```console
$ npm i
```

Once dependencies are installed AND the server is running:
```console
$ npm start
```

## Resources
Copyright © 1998-2022. Professional Disc Golf Association. All Rights Reserved.

- [PDGA Website](https://www.pdga.com/)
- [Player Info Ex](https://www.pdga.com/player/225221)
