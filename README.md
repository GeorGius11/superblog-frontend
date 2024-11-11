# Super-Blog Frontend

This is the frontend part of the Super-Blog app. The backend part is located here: [superblog-backend](https://github.com/GeorGius11/superblog-backend).

## Table of Contents

- [Description](#description)
- [Project Setup](#project-setup)
- [Run the Project](#running-the-project)
- [Build the Project for Production](#building-for-production)
- [Configure .env File](#configure-env-file)

## Description

The Super-Blog frontend is a Next.js application that interacts with the backend API for viewing, editing, and deleting blog posts.

## Project setup

Clone the repository and install dependencies:

```bash
$ git clone https://github.com/GeorGius11/superblog-frontend.git
$ cd superblog-frontend
$ npm install
```

## Running the Project

Start the development server:

```bash
$ npm run dev
```

Open http://localhost:3000 to view the app in your browser.

## Building for Production

Create an optimized production build:

```bash
$ npm run build
$ npm run start
```

## Configure .env File

Create a .env.local file in the root of the project to configure environment variables. Replace <your_backend_url> with the URL of the backend API.

```bash
NEXT_PUBLIC_API_URL=<your_backend_url>
```
