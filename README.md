# SOA Project - Forum with API Rest architecture
---

This project is a modern forum application leveraging a RESTful API architecture to separate backend and frontend concerns, with real-time automatic loading of new topics and posts. It features a secured API that requires active user sessions for posting, ensuring user authentication and data protection.

---
## Quick Start

To get the project up and running on your local machine for development and testing purposes, follow these steps.

### With Docker

You can run the app by downloading the repository and by running this command at the root of the project to build and run the container :  

```bash
docker-compose up -d --build
```

Or you can run the project manually :

### Prerequisites

Ensure you have Node.js and Docker installed on your system. These are essential for running the backend services, MongoDB, and Redis.

```bash
Install Node.js (visit https://nodejs.org/ for installation instructions)
Install Docker (visit https://docs.docker.com/get-docker/ for installation instructions)
```

### Installation

Clone the repository and install the dependencies for both the backend and frontend.

```bash
# Clone the repository
git clone https://github.com/RissRyan/SOA-Project.git

# Navigate to the backend directory and install dependencies
cd backend
npm install

# Navigate to the frontend directory and install dependencies
cd ../front
npm install
```

### Starting the Services

You'll need to start MongoDB and Redis using Docker before launching the backend and frontend services.

```bash
# Start MongoDB
docker run -d --name mongo-bdd -p 27017:27017 mongo

# Start Redis
docker run -d --name redis-bdd -p 6379:6379 redis
```

### Running the Application

Open two terminal windows: one for the backend and one for the frontend.

```bash
# In the backend directory
npm run dev

# In the frontend directory
npm start
```

---
## Usage

The forum application allows users to browse topics and posts in real-time. New topics and posts are automatically loaded onto the page without requiring a refresh, thanks to Socket.IO integration.

---

## Architecture Overview

The backend connects to MongoDB and Redis, handling API requests and managing real-time events. The `routes/` directory contains the API endpoints. Socket.IO is used for real-time communication, with events like "newtopic" and "updatemessages" being emitted based on user interactions.

Upon creating a new topic, a "newtopic" event is emitted, and the backend broadcasts an "updatehub" event to all users in the "hub" room. Joining a topic page subscribes the user to specific topic updates, and posting a new message triggers an "updatemessages" event to users subscribed to that topic.

Based on the `app.js`, `Hub.js`, and `Topic.js` files, we have Socket.IO setup and event handlers which integrate with the REST API. Here's a structured overview of the API calls and Socket.IO events based on the code:

![Table of API Calls](readme_assets/table_routes.png "API Calls")

### Backend

Built with Node.js and Express, the backend serves as the API layer, interfacing with MongoDB for data persistence and Redis for session storage. Socket.IO in backend side is utilized for real-time communication between the client and making rooms for user.

Each topic has its socket.IO room and when an user join a topic   

### Frontend

The frontend is developed with React, creating a dynamic and responsive user interface. It interacts with the backend through API calls and subscribes to real-time updates using Socket.IO.

---
## Developement

The project's structure is designed to facilitate easy development and contribution. The backend and frontend code are contained in their respective directories, with entry points being `app.js` for the backend and the **Hub** and **Topic** components for the frontend.

---
## Build With

- **Node.js** - The runtime environment for the backend
- **Express** - The web application framework for the backend
- **MongoDB** - The NoSQL database used for data storage
- **Redis** - The in-memory database used for session storage
- **Socket.IO** - Enables real-time, bidirectional and event-based communication
- **React** - The frontend library for building user interfaces
- **Docker** - Containerization of the app

---
## Author

- PRUVOST Jordan - *Erasmus Student*
- RISS Ryan - *Erasmus Student*

GitHub : https://github.com/RissRyan/SOA-Project