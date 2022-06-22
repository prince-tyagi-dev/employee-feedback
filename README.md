# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup the project

Once the project has been downloaded to the machine.\
Go to the root directoty and run the `yarn` command to install the required packages related to the Web application.\
Now, go to the path: `src/server-api` and run the `yarn` command to install the required packages related to the JSON Server.

## Available Scripts

In the project root directory, you can run:

### `yarn start` (Web App)

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start` (JSON API Server)

Go to the path: `src/server-api`, run this command: `yarn start`, it will run the JSON Server to make the API runable to perform the CRUD operations.\
Open [http://localhost:3001](http://localhost:3001) to view the JSON Server page in the browser.\
Open [http://localhost:3001/employees](http://localhost:3001/employees) to view the Employees data in the JSON format.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test --coverage src`

Launches the test runner in the interactive watch mode and also creates a directory named `coverage`, in this directory there will be a index.html file
on the path: `coverage/lcov-report/index.html`, to show the coverage report for the each file.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
