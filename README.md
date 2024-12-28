# User List Application

**A React application that fetches and displays user data with pagination, detailed views, Redux Toolkit state management, and comprehensive unit testing.**

## Features

### User List Page
* Displays users in a paginated table format
* Click-through navigation to detailed user views

### User Details Page
* Comprehensive display of selected user information
* Clean and intuitive user interface
* Easy navigation back to the main list

### Error Handling
* Implements robust retry logic for failed API calls *(up to 3 attempts)*
* User-friendly error messages
* Graceful fallback states

### State Management
* Centralized state management using **Redux Toolkit**
* Efficient data caching and updates
* Optimized performance

## Getting Started

### Prerequisites
* Node.js 
* npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/user-list-app.git
cd user-list-app
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm start
```


### Testing

Run the test suite:
```bash
npm test
```


## Technical Details

### API Integration

The application integrates with **JSONPlaceholder API**:
* Endpoint: `https://jsonplaceholder.typicode.com/users`
* Supports `GET` operations for user data
* Implements error handling and retry logic

### UI Components

Built using **Radix UI** for consistent, accessible components:
* [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
* Customizable primitive components
* Full accessibility support

### Error Handling Strategy

The application implements a robust error handling approach:
1. Automatic retry of failed API calls *(max 3 attempts)*
2. User-friendly error messages
3. Graceful degradation of functionality
4. Clear feedback for user actions

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
