
# Blogging Platform 📝

## Overview 📖
This is a simple blogging platform built using Node.js and Bootstrap for the front-end. Users can sign up, create blogs, view blogs, and manage their profiles.

## Features ✨
- **User Authentication 🔐**: Sign up and sign in using email and password.
- **Create Blogs ✍️**: Users can create, edit, and delete blogs.
- **View Blogs 📖**: Browse through a list of blogs with modern UI/UX.
- **Profile Management 👤**: View and manage personal profile, including blog posts and comments.

## Technologies Used 💻
- Node.js
- Express
- Bootstrap (for front-end styling)
- MongoDB (for database)
- EJS (template engine)

## Getting Started 🚀

### Prerequisites
- Node.js installed on your local machine
- MongoDB running

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repository-name.git  
    cd your-repository-name  
    ```

2. Install dependencies:
    ```bash
    npm install  
    ```

3. Configure environment variables:
    Create a `.env` file in the root directory and add necessary environment variables:
    ```plaintext
    MONGO_URI=your_mongo_db_connection_string  
    SESSION_SECRET=your_secret_key  
    ```

4. Start the server:
    ```bash
    npm start  
    ```

### Usage
Access the application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

## Contributing 🤝
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add new feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Create a pull request.

## License
This project is licensed under the MIT License.
