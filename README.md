User List React Application
This React application fetches a list of users from an API and displays them in a tabular format. It supports pagination, detailed user views, error handling, and state management using Redux Toolkit. It also includes unit tests for critical components.

Features
User List Page: Displays a list of users in a table with pagination. Clicking on a user navigates to the user details page.
User Details Page: Displays detailed information of the selected user.
Error Handling: Implements retry logic for API calls up to 3 times in case of failure. Displays proper error messages when the data cannot be loaded.
State Management: Uses Redux Toolkit for state management to handle the application’s state efficiently.
Unit Tests: Includes unit tests for critical components such as the user list, API calls, and navigation logic.
Setup Instructions
Prerequisites
Node.js (version 14 or above)
npm or yarn
Installation
Clone this repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/user-list-app.git
cd user-list-app
Install the required dependencies:

bash
Copy code
npm install

# or

yarn install
Running the Application
To start the development server, run the following command:

bash
Copy code
npm start


Running Unit Tests
To run the unit tests, use the following command:

bash
Copy code
npm test

# or

yarn test
This will run the Jest tests and display the results in your terminal.

Folder Structure
The project is organized into the following folder structure:


API Used
This application uses the following API to fetch user data:

API Endpoint: https://jsonplaceholder.typicode.com/users
UI Library
The UI is built using the Radix UI library for primitive components:

Radix UI: Radix UI Documentation
Error Handling
The application retries the API call up to 3 times if the initial request fails. If the data still cannot be fetched, an error message is displayed to the user.

License
This project is open-source and available under the MIT License.
