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

## Socket.IO in Postman

Check WebSocket connection in Postman by creating new Postman Socket.IO. After creating new Socket.IO, change URL to `ws://localhost:{gateway-port}?userId={user-id}`, add `notification` "Events", turn on "Listen", and hit "Connect" button. After creating an order by some userId, Postman Socket.IO will show new notification response in realtime.
> Current gateway-port is 3001. Check `notification.gateway.ts` to change the gateway port.

## Technologies

- **Typescript**: Backend programming language
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications
- **TypeORM**: Object Relational Mapping (ORM) library for database interactions
- **JWT**: JSON Web Tokens for authentication and authorization
- **PostgreSQL**: A powerful relational database used for storing and managing application data
- **Swagger**: Used for API documentations
- **Redis**: Used as a message broker for queue processing and caching  
- **Socket.IO**: Enables real-time bidirectional event-based communication for notifications 
