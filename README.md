# Moondream AI Assistant Chatbot

## Project Description

This project is an AI-powered chatbot using the Moondream model, designed to assist users with various general-purpose tasks. The chatbot is built with a Node.js backend and an Angular frontend, providing a seamless and interactive user experience.

Key features include:
- Task listing and management
- Setting reminders
- Performing basic calculations and financial operations
- Language translation
- User authentication and chat history storage (incoming versions)

The chatbot leverages the power of the Moondream AI model to provide intelligent and context-aware responses to user queries.

## Technologies Used

- Frontend: Angular 17 with standalone components
- Backend: Node.js with Express
- Database: MongoDB with Mongoose
- AI Model: Moondream (running locally with Ollama)
- Authentication: JWT (JSON Web Tokens)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (usually comes with Node.js)
- MongoDB
- Ollama (for running the Moondream model locally)

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/bit-rec98/dot.bot.git
   cd dot.bot
   ```

2. Set up the backend:
   ```
   cd backend
   npm install
   cp .env.example .env
   ```
   Edit the `.env` file and add your MongoDB URI and JWT secret.

3. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```
   Create a `environment.ts` file and add your URLs for configuring the ollamaApiUrl, the ollamaModel, the backend Api Url and to set the file to `false` for **production**.

4. Install and set up Ollama:
   - Follow the instructions at https://ollama.com/ to install Ollama for your operating system.
   - Pull the Moondream model:
     ```
     ollama pull moondream
     ```

5. Configure the Moondream model:
   - Create a file named `moondream.yaml` in your Ollama models directory:
     - On macOS/Linux: `~/.ollama/models`
     - On Windows: `C:\Users\YourUsername\.ollama\models`
   - Copy the configuration provided in the project documentation into this file.

## Running the Application

1. Start the MongoDB server (if not already running).

2. Start the Ollama server with the custom Moondream model:
   ```
   ollama run moondream
   ```

3. Start the backend server:
   ```
   cd backend
   npm start
   ```

4. In a new terminal, start the Angular development server:
   ```
   cd frontend
   ng serve
   ```

5. Open your browser and navigate to `http://localhost:4200` to use the chatbot.

## Usage

- Register a new account or log in with existing credentials. (incoming versions)
- Start chatting with the AI assistant by typing your queries or commands in the chat input.
- The assistant can help with tasks, reminders, calculations, and translations.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.