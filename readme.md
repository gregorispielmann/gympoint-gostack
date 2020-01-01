<p align="center">
  <a href="" rel="noopener">
 <img width=200px src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png" alt="Project logo"></a>
</p>

<h3 align="center">GymPoint</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> This app is a full gym manager called GymPoint.
<br>
In this challenge was built some basic funcionalities to the gym manager and students.  The concept was a web app to control students, registrations, plans and help orders made by students. After we made a Mobile App for the students made checkins at the gym and to publish help orders to the gym. 
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This project was made to be a full stack application including front-end, back-end and mobile and will be used to the [Rocketseat](https://github.com/rocketseat) Gostack 9 certification.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

- [Docker](https://www.docker.com/) - Container Platform
- [Yarn](https://yarnpkg.com/lang/en/) - Package Manager

### Installing

A step by step series of examples that tell you how to get a development env running.

### Cloning Repo

```
$ git clone https://github.com/gregorispielmann/gympoint-gostack.git
```

### Containers

First of all you need to create the containers (Postgres and redis), after install docker run the following command on your terminal

```
$ docker run --name gympoint -e POSTGRES_PASSWORD=docker -p 5454:5432 -d postgres:11
To create the container for Postgres DB

And then

$ docker run --name redisgympoint -p 6363:6379 -d -t redis:alpine
To create the container to Redis
```

### Backend

To initialize the backend, enter backend folder and run yarn to install all dependencies. After this run the commands above to run the backend.

```
$ yarn dev
This will start backend in dev mode
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo.

## 🔧 Running the tests <a name = "tests"></a>

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@rockeseat](https://rocketseat.com.br/bootcamp) - Idea & Initial template
- [@gregorispielmann](https://github.com/gregorispielmann) - Back-end, Front-end and Mobile App development

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
