# Mentora Backend API

Mentora is a robust, production-ready backend platform designed to bridge the gap between **Mentors** and **Parents/Students**. It provides a comprehensive ecosystem for managing educational lessons, student bookings, class sessions, and AI-powered text summarization.

---

## Key Features

### Advanced Authentication
- **Role-Based Access Control (RBAC)**: Distinct permissions for `Mentor` and `Parent` roles.
- **Secure Auth**: JWT (JSON Web Tokens) for stateless authentication and Bcrypt for high-entropy password hashing.
- **Protected Routes**: Middleware to ensure only authorized users can perform sensitive actions.

### Educational Management
- **Lesson System**: Mentors can create and manage curriculum-based lessons.
- **Student Profiles**: Parents can manage multiple student profiles linked to their accounts.
- **Booking Engine**: A collaborative flow where parents book specific lessons for their children.
- **Session Tracking**: Detailed tracking of individual class sessions within a lesson.

### AI Integration (LLM)
- **Summarization Service**: Integrated OpenAI-ready service to provide concise, bulleted summaries of educational content.
- **Rate Limiting**: Intelligent safeguarding to prevent API abuse on heavy LLM endpoints.

---

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Security**: [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors)
- **AI**: [OpenAI SDK](https://github.com/openai/openai-node)
- **Utilities**: [Dotenv](https://github.com/motdotla/dotenv), [Nodemon](https://nodemon.io/)

---

## Project Structure

```text
mentora-backend/
├── src/
│   ├── app.js             # Main entry point & middleware configuration
│   ├── controllers/       # Business logic for each resource
│   ├── middleware/        # Auth guards and rate limiters
│   ├── models/            # Mongoose schemas (User, Lesson, Student, etc.)
│   ├── routes/            # Express route definitions
│   ├── services/          # External services (LLM/OpenAI)
│   └── utils/             # Helper functions and error handlers
├── tests/                 # Diagnostic and API test scripts
├── .env                   # Environment variables (Configuration)
└── package.json           # Dependencies and scripts
```

---

## Getting Started

### 1. Prerequisites
- MongoDB Atlas account or local MongoDB instance.
- Node.js installed.

### 2. Installation
```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
OPENAI_API_KEY=your_openai_key
NODE_ENV=development
```

### 4. Running the App
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/signup` | Register a new Parent or Mentor |
| POST | `/api/auth/login` | Login and receive JWT token |

### Mentors & Lessons
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/api/lessons` | List all available lessons | Public |
| POST | `/api/lessons` | Create a new lesson | Mentor Only |
| POST | `/api/sessions` | Add a session to a lesson | Mentor Only |

### Parents & Students
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/students` | Register a student profile | Parent Only |
| POST | `/api/bookings` | Book a lesson for a student | Parent Only |
| GET | `/api/bookings` | View my student bookings | Parent Only |

### AI Service
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/llm/summarize` | Summarize text content into bullet points |

---

## 🛡 Security Implementations

1.  **Helmet**: Protects the app from well-known web vulnerabilities by setting HTTP headers appropriately.
2.  **CORS**: Configured to ensure secure cross-origin resource sharing.
3.  **Data Validation**: Strict Mongoose schemas to ensure data integrity.
4.  **Error Handling**: Global error catching middleware to prevent sensitive stack trace leaks.
5.  **Rate Limiting**: Prevents brute-force and DoS attacks on critical endpoints.

---

## Testing

The project includes a diagnostic suite to ensure system health:
```bash
# Run full diagnostic (DB, Auth, Models)
node tests/diagnose.js

# Run API reproduction tests
node tests/reproduce_500.js
```

---
