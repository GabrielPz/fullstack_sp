
# Fullstack CSV Data Viewer

This repository contains a web application designed to allow users to upload, view, and search through CSV data displayed as cards on a single-page application (SPA). The application is built using React for the frontend and Node.js for the backend, all written in TypeScript.

## Getting Started

To run this project locally, clone the repository and follow the instructions below.

### Prerequisites

Ensure you have Node.js installed on your machine. You can download and install Node.js from [Node.js official site](https://nodejs.org/).

### Installing

To set up the project, you need to install dependencies for both the backend and frontend.

```
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

Running the Application
To start both the frontend and backend servers, use the following commands:

```
# Start the backend server
cd backend
npm run dev

# In another terminal, start the frontend server
cd frontend
npm run dev
```
The frontend will be available at http://localhost:4000/ and the backend at http://localhost:3000/.

## Features
#### Frontend
CSV Upload: A button to select a CSV file and another to upload the file to the backend.
Search Functionality: A search bar to filter through the data displayed.
Data Display: Displays data from the CSV as cards.
Responsive Design: Works well on both desktop and mobile devices.
### Backend
CSV Upload Endpoint: [POST /api/files] to accept and store uploaded CSV file data.
Data Search Endpoint: [GET /api/users] allows searching through loaded CSV data using a query parameter.

## Deployment
FRONTEND: https://fullstack-sp.vercel.app/
BACKEND: https://fullstack-sp.onrender.com/

## Technology Stack
- [x] Frontend: React (TypeScript)
- [x] Frontend: Next.js
- [x] Frontend: Axios
- [x] Frontend: Material UI
- [x] Frontend: React Dropzone
- [x] Frontend: Toastify
- [x] Backend: Node.js (TypeScript) without the use of opinionated frameworks
- [x] Backend: Prisma
- [x] Backend: SQLite


## File Structure
/frontend: Contains all frontend code including React components, styles, and tests.
/backend: Contains all backend code including API endpoints, configurations, and tests.
