# Repo Ranger App

## Project Structure

```
fullstack-app
├── backend
│   ├── src
│   │   ├── app.ts
│   │   ├── controllers
│   │   │   └── index.ts
│   │   ├── routes
│   │   │   └── index.ts
│   │   └── types
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend
│   ├── src
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public
│   │   └── index.html
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd repo-ranger
   ```
2. **Running the Application:**
   - Navigate back to the root of the project:
     ```
     cd ..
     ```
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