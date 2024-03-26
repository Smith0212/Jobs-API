# Job Management API Project

## Overview

The Job Management API Project is a Node.js and Express application designed for managing job data securely. It incorporates JWT-based authentication to restrict access to sensitive routes and provides features for user registration, login, token generation, and job management.

## Features

- User registration and login with JWT token generation
- Secure routes for job management with authentication middleware
- Creation, retrieval, update, and deletion (CRUD) operations for job data
- Error handling middleware for consistent error responses
- Additional security measures including rate limiting, XSS protection, and CORS handling

## Technologies Used

- Node.js
- Express
- MongoDB (for data storage)
- Mongoose (for MongoDB object modeling)
- JSON Web Tokens (JWT) for user authentication
- dotenv for environment variable management
- helmet for HTTP header security
- cors for Cross-Origin Resource Sharing (CORS) handling
- xss-clean for protection against Cross-Site Scripting (XSS) attacks
- express-rate-limit for rate limiting requests

## Setup and Usage

1. Clone the repository to your local machine:
git clone https://github.com/Smith0212/Jobs-API
cd your-project-directory

2. Install dependencies:
npm install

3. Set up environment variables by creating a `.env` file in the root directory with the following content:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here

4. Start the server:
npm start


5. Access the API endpoints using tools like Postman or any HTTP client.

## API Endpoints

| Method | Endpoint               | Description                           |
| ------ | ---------------------- | ------------------------------------- |
| POST   | `/api/v1/auth/register`| Register a new user                   |
| POST   | `/api/v1/auth/login`   | User login                            |
| GET    | `/api/v1/job`          | Retrieve all jobs of logged-in user   |
| POST   | `/api/v1/job`          | Create a new job                      |
| GET    | `/api/v1/job/:id`      | Retrieve a specific job by ID         |
| PATCH  | `/api/v1/job/:id`      | Update a specific job by ID           |
| DELETE | `/api/v1/job/:id`      | Delete a specific job by ID           |

## Error Handling

The application includes error handling middleware to provide consistent error responses for various scenarios, such as bad requests, validation errors, resource not found, and unauthenticated access attempts. Additionally, custom error classes have been implemented to handle specific error types and provide informative error messages.

### Custom Error Handling

The custom error handling mechanism ensures that errors are appropriately handled and returned to the client with meaningful error messages. Custom error classes include:

- **BadRequestError**: Indicates that the request sent by the client is invalid.
- **UnauthenticatedError**: Indicates that the client is not authenticated to access the requested resource.
- **NotFoundError**: Indicates that the requested resource was not found.

These custom error classes are used throughout the application to provide clear feedback to the user in case of errors.

### Validation Error Handling

Validation errors are handled using custom error handling middleware. When a validation error occurs, such as a missing or invalid field, the error handler middleware captures the error and returns a response with the appropriate status code and error message. This ensures that clients receive clear and actionable feedback when submitting invalid data.
