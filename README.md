# Todo MERN Application

A full-stack Todo application with user authentication, email verification, and admin features.

## Features

- User authentication (signup/signin)
- Email verification with OTP
- Todo management (CRUD operations)
- Admin panel for user management
- Role-based access control
- API documentation with Swagger

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```
PORT=3000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

4. Seed the database with test data:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

## Setup Instructions (Docker)

1. Clone the repository

2. Create a `.env` file in the root directory and add the following environment variables:
```
PORT=5000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=your_jwt_secret_key
```

3. Build and run the Docker containers:
```bash
docker compose up --build
```

4. In a new terminal, seed the database with test data:
```bash
docker compose exec app npm run seed
```

5. The application should now be running at `localhost:5000`.