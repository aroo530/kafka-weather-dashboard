# Kafka Project README

This is a Kafka project that combines Kafka messaging with an Express server and an Angular frontend to display data received from the Kafka stream.

## Project Structure

The project is organized into two main folders:

### 1. Backend

In the `backend` folder, you will find the server-side components of the project, including the Kafka setup and the Express server with WebSocket functionality. To set up the backend, follow these steps:

1. Navigate to the `backend` folder:
   ```bash
   cd backend
Install the required dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
npm run start
2. Frontend
The frontend folder contains the Angular application responsible for displaying data received from the Kafka stream. To set up the frontend, follow these steps:

Navigate to the frontend folder:

bash
Copy code
cd frontend
Install the required dependencies, including --legacy-peer-deps:

bash
Copy code
npm install --legacy-peer-deps
Start the Angular app:

bash
Copy code
npm run start
Dependencies
To run this project successfully, make sure you have Kafka installed and running. You'll need to set up Kafka topics and producers to start streaming data to the server.

Project Purpose
This project is a demonstration of Kafka as a service, and while it may be over-engineered, it serves as a practical example of integrating Kafka with a backend and frontend.

Getting Started
Clone this repository to your local machine.

Follow the setup instructions for the backend and frontend as mentioned above.

Ensure that Kafka is installed and properly configured.

Start sending data to Kafka topics to see it in action.
