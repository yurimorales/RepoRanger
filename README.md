# Repo Ranger App

RepoRanger is a full-stack application designed to facilitate the import and viewing of GitHub repositories. The application consists of a backend built with Express and TypeScript, and a frontend developed using React.

## Features

- Search for GitHub users and view their repositories.
- Import repositories from a CSV file and display them in a table.
- Background processing of imported data using RabbitMQ.
- Persistent storage of repository data in a MariaDB database.

## Project Structure

```
RepoRanger
├── backend
│   ├── src
│   │   ├── app.ts                # Entry point of the backend application
│   │   ├── controllers
│   │   │   └── index.ts          # Handles API requests
│   │   ├── jobs
│   │   │   └── repoImportJob.ts  # Processes imported repository data
│   │   ├── queue
│   │   │   └── rabbitmq.ts       # Sets up RabbitMQ connection
│   │   ├── routes
│   │   │   └── index.ts          # API routes setup
│   │   ├── models
│   │   │   └── repository.ts      # Repository model for the database
│   │   └── types
│   │       └── index.ts          # Type definitions
│   ├── package.json               # Backend dependencies and scripts
│   ├── tsconfig.json              # TypeScript configuration for backend
│   └── README.md                  # Documentation for the backend
├── frontend
│   ├── src
│   │   ├── App.tsx                # Main component for the frontend
│   │   ├── ImportView.tsx         # Component for importing and viewing repositories
│   │   ├── index.tsx              # Entry point of the frontend application
│   │   ├── api
│   │   │   └── index.ts           # API calls to the backend
│   │   └── types
│   │       └── index.ts           # Type definitions for frontend
│   ├── package.json               # Frontend dependencies and scripts
│   ├── tsconfig.json              # TypeScript configuration for frontend
│   └── README.md                  # Documentation for the frontend
├── docker-compose.yml              # Docker configuration for the application
└── README.md                      # Main documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd RepoRanger
   ```
2. **Running the Application:**
   - Start the application using Docker Compose:
     ```
     docker-compose up --build
     ```

## Services

- **Backend:** The TypeScript backend service that handles API requests.
- **Frontend:** The React frontend service that serves the user interface.
- **MariaDB:** The database service for storing application data.
- **RabbitMQ:** The messaging service for handling asynchronous communication.

## Usage

- Access the frontend application at `http://localhost:3000`.
- The backend API can be accessed at `http://localhost:5000/api`.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.