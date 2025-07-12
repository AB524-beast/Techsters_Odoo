# Manual Testing Guide for SkillSwap Platform

This guide provides detailed manual test steps to verify the full functionality of the SkillSwap platform, covering frontend, backend, and integration aspects.

---

## 1. Frontend Testing

### Authentication Flows
- Open the landing page.
- Test **Sign-Up**:
  - Fill in the sign-up form with valid name, email, and password.
  - Submit and verify redirection to the main dashboard.
  - Confirm user name appears in profile section.
- Test **Log-In**:
  - Log out if logged in.
  - Use the login form with valid credentials.
  - Verify successful login and dashboard access.
- Test **Log-Out**:
  - Click the logout button.
  - Verify redirection to landing page and nav links hidden.

### Profile Management
- View your profile details.
- Click **Edit Profile**.
- Update fields: name, location, contact preference, dark mode.
- Save changes and verify updates reflect in profile view.
- Confirm dark mode toggle syncs with profile setting.

### Item Browsing and Searching
- Navigate to Browse section.
- Verify items load correctly.
- Use search input to filter items by name or description.
- Confirm filtered results match search term.

### Swap Requests
- Select an item from browse.
- Click **Request Swap**.
- In the modal, select one or more of your own items to offer.
- Send swap request and verify notification.
- Navigate to Swaps section.
- Verify incoming and outgoing requests display correctly.
- Accept and reject incoming swap requests.
- Confirm status updates and notifications.

### Dark Mode Toggle
- Use the dark mode toggle button in the header.
- Verify UI switches between light and dark themes.
- Refresh page and confirm theme preference persists.
- Confirm dark mode preference syncs with backend profile.

### Modal Dialogs and Notifications
- Verify all modals (swap request, accept/reject confirmation) appear correctly.
- Confirm notifications show success or error messages appropriately.

---

## 2. Backend API Testing

Use Postman or similar API client to test the following endpoints:

### Authentication
- POST `/api/auth/signup` with valid and invalid data.
- POST `/api/auth/login` with valid and invalid credentials.
- POST `/api/auth/logout`.
- GET `/api/auth/me` with and without valid token.

### Users
- GET `/api/users` to list users.
- GET `/api/users/:id` to get user profile.
- PUT `/api/users/:id` to update profile (test authorization).

### Items
- POST `/api/items` to create item (authenticated).
- GET `/api/items` with and without search query.
- GET `/api/items/:id` to get item details.
- PUT `/api/items/:id` to update item (owner only).
- DELETE `/api/items/:id` to delete item (owner only).

### Swaps
- POST `/api/swaps` to create swap request.
- GET `/api/swaps/incoming` and `/api/swaps/outgoing`.
- POST `/api/swaps/:id/accept` and `/api/swaps/:id/reject`.

Test error cases such as unauthorized access, invalid data, and non-existent resources.

---

## 3. Integration Testing

- Verify session persistence with HTTP-only cookies.
- Confirm frontend and backend dark mode preference synchronization.
- Test full user flow from signup to swap completion.

---

## Notes

- Ensure backend server is running on port 5000.
- Frontend can be served via local HTTP server or opened directly.
- Use browser developer tools to monitor network requests and console logs.

---

Please follow this guide to thoroughly test the application. If you encounter any issues or need automated test scripts, feel free to ask.
