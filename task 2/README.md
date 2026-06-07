# Student Feedback API

A robust, internship-level RESTful API backend project built using **Node.js** and **Express.js** to manage student feedback records. It stores feedback data in an in-memory array database and features custom validation middlewares, logging interceptors, proper HTTP status codes, separation of routing concerns, and global error catch blocks.

---

## 📁 Project Structure

```
backend-api-project/
├── server.js            # Main entry point - sets up middleware, routers, and error handlers
├── routes/
│   └── feedback.js      # Feedback router - defines GET/POST endpoints, validation, and data store
├── package.json         # Package configuration, project scripts, and dependencies
└── README.md            # Project documentation and API testing examples
```

---

## 🛠️ Installation & Setup

Follow these steps to run the API locally on your system:

### 1. Prerequisite
Ensure that you have [Node.js](https://nodejs.org/) installed (version 16 or above recommended).

### 2. Install Dependencies
Open your terminal, navigate to the project root directory, and run the following command to download dependencies (`express` and `nodemon`):
```bash
npm install
```

### 3. Run the Server
You can launch the server using either the standard start command or the development command:

* **Production Start**: Run standard Node server execution:
  ```bash
  npm start
  ```
* **Development Mode (Auto-Reload)**: Runs using `nodemon` which watches code files and automatically restarts the process upon any save operations:
  ```bash
  npm run dev
  ```

Once active, the server will log confirmation to the console and bind to `http://localhost:3000`.

---

## 🧪 Postman API Testing Guide

Use the following detailed configurations to test the REST endpoints in **Postman**:

### 1. GET /feedback
Fetches the full collection of submitted feedback items.

* **Request Configuration**:
  * **Method**: `GET`
  * **URL**: `http://localhost:3000/feedback`
  * **Headers**: `Accept: application/json`

* **Expected Output (Status: `200 OK`)**:
  ```json
  [
    {
      "id": 1,
      "name": "Priyanshi",
      "message": "Great platform"
    }
  ]
  ```

---

### 2. POST /feedback (Success Case)
Submits a new student feedback item and registers it in the array.

* **Request Configuration**:
  * **Method**: `POST`
  * **URL**: `http://localhost:3000/feedback`
  * **Headers**: 
    * `Content-Type: application/json`
  * **Body** (Select **raw** -> **JSON**):
    ```json
    {
      "name": "Aarav Sharma",
      "message": "The documentation is extremely structured and helpful."
    }
    ```

* **Expected Output (Status: `201 Created`)**:
  ```json
  {
    "id": 2,
    "name": "Aarav Sharma",
    "message": "The documentation is extremely structured and helpful."
  }
  ```

---

### 3. POST /feedback (Failure Case - Empty Name)
Verifies client-side feedback constraints. Rejects the submission because the student's name is missing/empty.

* **Request Configuration**:
  * **Method**: `POST`
  * **URL**: `http://localhost:3000/feedback`
  * **Headers**: 
    * `Content-Type: application/json`
  * **Body** (Select **raw** -> **JSON**):
    ```json
    {
      "name": "",
      "message": "Loved the server responsiveness!"
    }
    ```

* **Expected Output (Status: `400 Bad Request`)**:
  ```json
  {
    "error": "Validation Error",
    "message": "Name cannot be empty and must be a valid string."
  }
  ```

---

### 4. POST /feedback (Failure Case - Empty Message)
Rejects the submission because the message body is missing/empty.

* **Request Configuration**:
  * **Method**: `POST`
  * **URL**: `http://localhost:3000/feedback`
  * **Headers**: 
    * `Content-Type: application/json`
  * **Body** (Select **raw** -> **JSON**):
    ```json
    {
      "name": "Vikram Sen",
      "message": "   "
    }
    ```

* **Expected Output (Status: `400 Bad Request`)**:
  ```json
  {
    "error": "Validation Error",
    "message": "Message cannot be empty and must be a valid string."
  }
  ```

---

### 5. GET /invalid-route (404 Fallback Case)
Verifies handling of requests requesting undefined endpoints.

* **Request Configuration**:
  * **Method**: `GET`
  * **URL**: `http://localhost:3000/some-nonexistent-route`

* **Expected Output (Status: `404 Not Found`)**:
  ```json
  {
    "error": "Not Found",
    "message": "Cannot find path 'GET /some-nonexistent-route' on this server."
  }
  ```
