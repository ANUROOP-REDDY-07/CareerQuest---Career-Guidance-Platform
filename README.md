# Career Guidance Platform

A comprehensive MERN stack application designed to help users explore career paths, take assessments, view roadmaps, and find colleges. It also features an AI-powered career mentor chatbot.

## Features

- **Career Assessment**: Take a test to find suitable career paths based on your interests and skills.
- **Career Exploration**: Browse a detailed list of careers with descriptions, required skills, and roadmaps.
- **Roadmaps**: Visual guides to achieve specific career goals.
- **College Finder**: Find colleges relevant to your chosen career path.
- **AI Career Mentor**: Chat with an AI bot (powered by DuckDuckGo search) to get instant specific career advice.
- **Responsive Design**: Built with React and modern CSS for a seamless experience across devices.

## Tech Stack

- **Frontend**: React, Vite, React Router, Framer Motion, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Standard CSS

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running locally (or a MongoDB Atlas URI)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd "Career Guidance"
    ```

2.  **Install Server Dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/career-guidance
# Add any other required capabilities keys if necessary
```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd server
    npm start
    ```
    The server will run on `http://localhost:5000` (default).

2.  **Start the Frontend Client:**
    Open a new terminal window:
    ```bash
    cd client
    npm run dev
    ```
    The client will run on `http://localhost:5173` (or the port shown in the terminal).

3.  **Access the App:**
    Open your browser and navigate to the client URL.

## Project Structure

- `client/`: React frontend application.
- `server/`: Node.js/Express backend API.
- `server/models/`: Mongoose models.
- `server/routes/`: API routes (including the chat bot logic).
