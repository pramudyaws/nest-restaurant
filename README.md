# Nest Restaurant

Nest Restaurant provides backend solution for managing restaurant foods, orders, user authentication & authorization, etc. Additionally, this project also integrated with Redis for queue processing and has realtime notification feature using [Socket.IO](https://socket.io/)

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# build
$ npm run build

# development
$ npm run start

# watch mode
$ npm run start:dev
```

## API Documentation

After running the project, visit `http://localhost:{PORT}/api-docs/v1` to see the Swagger API Documentation. 
> **Note:** Replace `{PORT}` with the actual port number defined in your `.env` file.

## Technologies

- **Typescript**: Backend programming language
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications
- **TypeORM**: Object Relational Mapping (ORM) library for database interactions
- **JWT**: JSON Web Tokens for authentication and authorization
- **PostgreSQL**: A powerful relational database used for storing and managing application data
- **Swagger**: Used for API documentations
- **Redis**: Used as a message broker for queue processing and caching  
- **Socket.IO**: Enables real-time bidirectional event-based communication for notifications 
