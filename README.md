# MyMemo Website

MyMemo is a secure and user-friendly web application that allows users to write, save, and manage their notes effortlessly. This website ensures that users' notes are private and accessible only to them, thanks to robust authentication mechanisms.

## Features

- **User Authentication**: Users must authenticate to access their notes, ensuring privacy and security.
- **Single Page Interface**: Users can add and access their notes on a single page without the need to navigate to other pages.
- **Note Update Feature**: Users can easily edit or update their notes directly on the same page.

## Tech Stack

- **Database**: MongoDB
- **Backend Framework**: Express.js
- **Frontend Library**: React.js
- **Runtime Environment**: Node.js
- **Authentication**: JSON Web Token (JWT)
- **Version Control**: Git
- **CSS Framework**: Bootstrap
- **Frontend Deployment**: Vercel
- **Backend Deployment**: Render

## Project Highlights

- **Secure Routes with JWT**: Implemented JSON Web Tokens (JWT) to secure routes, ensuring that only authorized users can access their notes.
- **Token Management**: Learned to store authentication tokens in local storage and send them to the server for access to protected backend routes.
- **Deployment**: Successfully deployed the frontend on Vercel and the backend on Render, ensuring seamless connectivity between them.

## Live Demo

🚀 Feel free to check out the live project at [MyMemo](https://mymemo.vercel.app/). Remember to sign up or log in to save notes and enjoy!

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the Repository**

    ```sh
    git clone https://github.com/Pav125/Notes-mern.git
    cd Notes-mern
    ```

2. **Install Backend Dependencies**

    ```sh
    cd backend
    npm install
    ```

3. **Install Frontend Dependencies**

    ```sh
    cd ../frontend
    npm install
    ```

4. **Set Up Environment Variables**

    Create a `.env` file in the `backend` directory and add your MongoDB URI and JWT secret:

    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

5. **Start the Backend Server**

    ```sh
    cd backend
    npm start
    ```

6. **Start the Frontend Development Server**

    ```sh
    cd ../frontend
    npm start
    ```

7. **Access the Website**

    Open your browser and navigate to `http://localhost:3000`.

## Contribution Guidelines

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

For major changes, please open an issue to discuss what you would like to change.

## Contact

For feedback, questions, or collaboration opportunities, please reach out via devipavan824@gmail.com.
