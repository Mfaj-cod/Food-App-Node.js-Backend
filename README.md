# Food App API

A Node.js and Express REST API for a food ordering application. It includes user authentication, user profile management, restaurant APIs, and category APIs backed by MongoDB with Mongoose.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcryptjs
- dotenv
- nodemon
- morgan
- cors

## Project Structure

```text
.
|-- config/              # Database connection
|-- controllers/         # Route handlers
|-- middleware/          # Auth middleware
|-- models/              # Mongoose models
|-- routes/              # Express routers
|-- utils/               # Utility files
|-- server.js            # App entry point
|-- package.json
`-- README.md
```

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=8080
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the development server:

```bash
npm run server
```

The API runs on:

```text
http://localhost:8080
```

## Authentication

Protected routes require a JWT token in the request headers:

```http
Authorization: Bearer <token>
```

Use the login endpoint to get a token.

## API Routes

### Health/Test

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/v1/test/test-user` | Test user route |

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login and receive JWT token |

Register body example:

```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+919999999999",
  "address": ["city", "state", "country"],
  "answer": "security answer"
}
```

Login body example:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### User

All user routes require `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/v1/user/getUser` | Get logged-in user details |
| PUT | `/api/v1/user/updateUser` | Update logged-in user profile |
| POST | `/api/v1/user/updatePassword` | Update user password |
| DELETE | `/api/v1/user/deleteUser` | Delete logged-in user |

Update user body example:

```json
{
  "username": "John Updated",
  "phone": "+918888888888",
  "address": ["new city", "state", "country"]
}
```

Update password body example:

```json
{
  "email": "john@example.com",
  "oldPassword": "password123",
  "newPassword": "newPassword123"
}
```

### Restaurants

| Method | Endpoint | Protected | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/restaurant/newRestaurant` | Yes | Create a restaurant |
| GET | `/api/v1/restaurant/getAllRestaurants` | No | Get all restaurants |
| GET | `/api/v1/restaurant/get/:id` | No | Get one restaurant by id |
| DELETE | `/api/v1/restaurant/delete/:id` | No | Delete restaurant by id |

Create restaurant body example:

```json
{
  "title": "Food Point",
  "image": "https://example.com/restaurant.jpg",
  "foods": [],
  "time": "30 min",
  "pickup": true,
  "delivery": true,
  "isOpen": true,
  "logoURL": "https://example.com/logo.png",
  "rating": 4,
  "ratingCount": "120",
  "code": "FP001",
  "coords": {
    "id": "1",
    "lattitude": 28.7041,
    "lattitudeDelta": 0.01,
    "longitude": 77.1025,
    "longitudeDelta": 0.01,
    "address": "Delhi, India",
    "title": "Food Point"
  }
}
```

### Categories

All category routes require `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/category/create` | Create a category |
| GET | `/api/v1/category/getAll` | Get all categories |
| GET | `/api/v1/category/get/:id` | Get category by id |
| DELETE | `/api/v1/category/delete/:id` | Delete category by id |

Create category body example:

```json
{
  "title": "Pizza",
  "image": "https://example.com/pizza.jpg"
}
```

## Available Scripts

```bash
npm run server
```

Runs the API with nodemon.

```bash
npm test
```

Currently not configured.

## Notes

- Passwords are hashed with `bcryptjs` before saving.
- JWT tokens expire in 7 days.
- Do not commit `.env` or database credentials to version control.
