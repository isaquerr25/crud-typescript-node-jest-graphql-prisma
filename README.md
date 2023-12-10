## Docker Compose

This project supports Docker Compose for easy deployment and containerization. Docker Compose is a tool for defining and running multi-container Docker applications.

### Prerequisites

Before using Docker Compose, ensure that you have Docker and Docker Compose installed on your machine. If not, you can download and install them from the official [Docker website](https://www.docker.com/get-started).

### Running with Docker Compose

To run the project using Docker Compose, follow these steps:

1. Create container of app need:

Start the Docker containers:

```sh
docker-compose up -d
```

## Prisma Migrations

This project uses [Prisma](https://www.prisma.io/) for database migrations and schema management. Prisma Migrate helps you evolve your database schema over time.

### Applying Migrations

To apply Prisma migrations, follow these steps:

1. Make sure your database connection is configured in the `.env` file or using environment variables.

2. Run the following command to create a new migration:

```sh
npx prisma migrate dev 
```

The above command will create a new migration in the prisma/migrations directory. To apply the migration and update the database schema, run:

```sh
npx prisma migrate deploy
```

```sh
npx prisma generate
```

# Crud-typescript-node-jest-graphql-prisma-redis 

Brief description of your project.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed:

- Node.js: [Download](https://nodejs.org/)
- npm (Node Package Manager): It comes with Node.js installation.

### Installation

1. Clone the repository:

```sh
 git clone https://github.com/your-username/your-project.git
```

Install dependencies:

```sh
npm install
```

Running the Application

Follow these steps to run the application locally:
Start the development server:

```sh
npm run dev
```

    This command will launch the application, and you can access it at http://localhost:4000/graphql.

Usage

Explain how to use the features of your application. Provide code examples and describe any relevant endpoints or commands.
Contributing

If you would like to contribute to the project, follow these steps:

    Fork the repository on GitHub.
    Clone your forked repository to your local machine.
    Create a new branch for your feature or bug fix.
    Make changes and commit them.
    Push your changes to your fork on GitHub.
    Submit a pull request to the main repository.

## Testing

This project includes tests to ensure the reliability and correctness of the code. The testing is done using the **your-testing-framework** testing framework.

### Running Tests

To run the tests, follow these steps:

Run the tests:

```sh
npm test
```

Obs: to test work need run the server and container app available
