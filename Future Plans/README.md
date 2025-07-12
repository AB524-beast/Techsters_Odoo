# SkillSwap Platform

This is a complete full-stack web application for an item swapping platform. It includes a secure backend API with authentication, user profiles, item management, and swap requests, as well as a responsive frontend with dark mode support.

## Features

- User Sign-Up and Log-In with hashed passwords and JWT authentication.
- User profile management with editable personal details and item listings.
- Browse and search items available for swap.
- Initiate, accept, and reject swap requests.
- Dark mode toggle with preference persistence.
- Custom modal dialogs and notifications for user interactions.
- Secure session management with HTTP-only cookies.

## Technologies Used

- Backend: Node.js, Express, Firebase Firestore, JWT, bcrypt
- Frontend: HTML, Tailwind CSS, JavaScript (ES6+)
- Authentication: JWT with secure cookies
- Database: Firestore (NoSQL)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- Internet connection to load Tailwind CSS and FontAwesome CDN

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install express cors cookie-parser firebase-admin jsonwebtoken bcrypt
   ```

3. The Firebase Admin SDK is configured with an auto-generated service account key for demo purposes. For production, replace `firebaseConfig.js` with your own Firebase service account credentials.

4. Start the backend server:

   ```bash
   node server.js
   ```

   The server will run on port 5000 by default.

### Frontend Setup

1. Navigate to the `frontend` directory or the root directory containing `index.html`.

2. Since the frontend is static, you can open `index.html` directly in your browser or serve it with a simple HTTP server.

   For example, using `http-server` (install globally if needed):

   ```bash
   npm install -g http-server
   http-server -c-1
   ```

3. Open the URL provided by the server (e.g., `http://localhost:8080`) in your browser.

### Notes

- The backend CORS configuration allows requests from `http://localhost:3000`, `http://localhost:5500`, and file protocol (`null` origin) for local testing.
- The JWT secret and Firebase service account keys are auto-generated placeholders for demo purposes.
- Dark mode preference is synced between frontend localStorage and backend user profile.
- All API requests use HTTP-only cookies for authentication tokens.

## Usage

- On first load, you will see the landing page with Sign-Up and Log-In forms.
- After authentication, you will be redirected to the main dashboard with Browse, Profile, and Swaps sections.
- Use the Dark Mode toggle in the header to switch themes.
- Manage your profile and items, browse others' items, and initiate swap requests.
- Accept or reject incoming swap requests in the Swaps section.

## Security Considerations

- Passwords are hashed using bcrypt before storage.
- JWT tokens are stored in HTTP-only cookies to prevent XSS attacks.
- CORS and cookie settings are configured for local development; review and adjust for production.
- Avoid exposing sensitive keys in production; use environment variables or secret management.

## License

This project is provided as-is for demonstration purposes.
