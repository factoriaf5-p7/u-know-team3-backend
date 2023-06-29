<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## MongoDB design 

### Schemas

USERS

````JSON

{
  "_id": ,
  "name": ,
  "last_name": ,
  "email": , 
  "password": ,
  "wallet_balance": ,
  "bought_courses": [
    {
      "course_id": ,
      "stars": ,
      "commented": false,
    },
    {
      "course_id": ,
      "stars": 4,
      "commented": true,
    },
  ] ,
  "created_courses": [],
  "chat_notifications_sent": ,
  "chat_notifications_recieved": ,
  "profile": ,
  "recovery_token": ,
}

````

COURSES

````JSON

{
  "_id": ,
  "name": ,
  "price": ,
  "topic": , 
  "difficulty": ,
  "tags": ,
  "bought": ,
  "create_date": ,
  "update_date": ,
  "content": ,
}

````

COMMENTS

````JSON

{
  "_id": ,
  "comment_text": ,
  "user_id": ,
  "course_id": ,
}

````

USER FOR TESTING

### JSON

````JSON

{
  "name": "Jhon",
  "last_name": "Connors",
  "email": "jhon@judgementday.com", 
  "password": "1234",
  "wallet_balance": 100,
  "bought_courses": ["Course1"],
  "created_courses": ["Course 2", "Course 3"],
  "chat_notifications_sent": [],
  "chat_notifications_recieved": [
    {
        "requested_from_user": 2,
        "requested_date": "2023-06-20 18:00"
    }
  ],
  "profile": "user",
  "recovery_token": ""
}

````

### JAVASCRIPT

````JS

{
  name: "Jhon",
  last_name: "Connors",
  email: "jhon@judgementday.com", 
  password: "1234",
  wallet_balance: 100,
  bought_courses: ["Course1"],
  created_courses: ["Course 2", "Course 3"],
  chat_notifications_sent: [],
  chat_notifications_recieved: [
    {
        requested_from_user: 2,
        requested_date: "2023-06-20 18:00"
    }
  ],
  profile: "user",
  recovery_token: ""
}

````

## Nodemailer

### Ethereal test account

````ENV

Name = 
Alexie Bradtke
Username =	
alexie35@ethereal.email
Password = 	
wdC2Ur2kNYY9sbFEUY

````

### Standard Response Objects

````JS
{
  message: STRING, // Mensaje que describe la operación
  status: NUMBER, // Código HTTP de estado según el resultado
  data: ANY // Cualquier dato que devuelven algunas operaciones. Si no hay datos a devolver es ''
}
````

## Stay in touch


## License

Nest is [MIT licensed](LICENSE).


Informe de covarage (que porcentaje tiene test y cuanto no)
=> Normalizar de datos que entran

DBREFS populate, usuario con todos los cursos creados => 

ualmtorres.github.io/nestjs-mongodb-tutorial
wanago.io => nest

CAMPO created_courses = unique
