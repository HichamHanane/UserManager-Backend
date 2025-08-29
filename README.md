# UserManager Backend

This is a Node.js backend for user management, built with Express and MongoDB.

## Features

- User registration and login with JWT authentication
- Role-based access control (admin/user)
- CRUD operations for users (admin only)
- Input validation
- Cookie-based session management

## Project Structure

```
Controllers/
    AuthController.js      # Authentication logic
    userController.js      # User CRUD logic
Middleware/
    verifyRole.js          # Role-based access middleware
    verifyToken.js         # JWT authentication middleware
Models/
    User.js                # Mongoose user schema
Routes/
    authRoutes.js          # Auth endpoints
    userRouts.js           # User endpoints
app.js                    # Express app entry point
.env                      # Environment variables
package.json              # Project metadata and dependencies
```

## Setup

1. **Install dependencies:**
    ```sh
    npm install
    ```

2. **Configure environment variables:**
    - Create a `.env` file with:
      ```
      DB_URL=your_mongodb_connection_string
      PORT=8080
      ```

3. **Start the server:**
    ```sh
    npm start
    ```

## API Endpoints

### Auth

- `POST /api/register` — Register a new user
- `POST /api/login` — Login
- `POST /api/logout` — Logout
- `GET /api/profile` — Get logged-in user profile
- `GET /api/check-token` — Check token validity

### Users (admin only)

- `GET /api/users` — List all users
- `POST /api/users` — Add a user
- `DELETE /api/users/:id` — Delete a