# GymGo

Este projeto fornece a API back-end para uma plataforma de associação de academia, semelhante ao Gympass. O aplicativo permite que os usuários façam check-in em suas academias afiliadas e acompanhem suas sessões de treino.

## Requirements

### Functional requirements

- [x] It must be possible to register;
- [x] It must be possible to authenticate;
- [x] It must be possible to obtain the profile of a logged-in user;
- [x] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [x] It must be possible for the user to obtain their check-in history;
- [x] It must be possible for the user to search for nearby gyms;
- [x] It must be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check in to a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym.

### Business rules

- [x] The user must not be able to register with a duplicate email;
- [x] The user must not be able to check in more than once on the same day;
- [x] The user must not be able to check in if they are not close (100 meters) to the gym;
- [x] Check-in can only be validated up to 20 minutes after being created;
- [x] Check-in can only be validated by administrators;
- [x] The gym can only be registered by administrators;

### Non-functional requirements

- [x] The user's password must be encrypted;
- [x] The application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [x] The user must be identified by a JWT (JSON Web Token);

## Stack

- Node.js
- Typescript
- Fastify
- Prisma ORM
- PostgreSQL
- Dayjs
- Zod

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

MIT by [Wolney Oliveira](https://github.com/wolney-fo)
