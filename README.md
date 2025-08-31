# WServer

## Project Description

This project is a **Node.js + Express** backend using **MongoDB (Mongoose)** for data storage. It implements a full user authentication flow with JWT tokens, email activation, and CRUD functionality for game entities (games, races, characters).

### Features

* User registration with validation and password hashing.
* User login with **JWT Access / Refresh Tokens**.
* Logout with refresh token removal from the database.
* Email confirmation with activation link.
* Token refresh using refresh token.
* Get list of users (protected route).
* CRUD operations for entities:

  * **Races**
  * **Games**
  * **Characters**

### Technologies

* **Node.js** – server runtime
* **Express.js** – web framework
* **MongoDB + Mongoose** – database
* **JWT (jsonwebtoken)** – token-based authentication
* **bcrypt** – password hashing
* **express-validator** – input validation
* **nodemailer** – sending activation emails
* **cookie-parser** – token storage in cookies
* **cors** – CORS support
* **uuid** – unique activation links

### Installation & Run

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd wserver
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:

   ```env
   PORT=5000
   CLIENT_URL=http://localhost:3000
   API_URL=http://localhost:5000
   JWT_ACCESS_SECRET=your_access_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your_email@example.com
   SMTP_PASSWORD=your_password
   ```

4. Start the development server:

   ```bash
   npx nodemon index.js
   ```

5. The server will be available at:

   ```
   http://localhost:5000
   ```

### Project Structure

```
├── controllers/       # Controllers (UserController)
├── dtos/              # Data Transfer Objects
├── exceptions/        # Error handling (ApiError)
├── middleware/        # Middlewares (auth, errorHandler)
├── models/            # Mongoose models (User, Token, Race, Game, Character)
├── routes/            # Express routes
├── service/           # Business logic (userService, tokenService, mailService)
├── index.js           # Entry point
└── package.json
```

### Routes

* `POST /auth/registration` – register
* `POST /auth/login` – login
* `POST /auth/logout` – logout
* `GET /auth/activate/:link` – email activation
* `GET /auth/refresh` – refresh tokens
* `GET /auth/users` – get users (authorized only)

#### Additional resources

* `POST /races` – create race
* `GET /races` – get all races
* `GET /races/:title` – get race by title
* `POST /games` – create game
* `GET /games` – get all games
* `POST /characters` – get characters by race
* `POST /characters/add` – add new character

---

### Author

WServer – educational project demonstrating authentication with JWT and MongoDB.
