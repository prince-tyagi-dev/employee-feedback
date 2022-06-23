# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Requirement

As per the assessment document `Frontend Assignment - Employee CRUD.pdf`, there should be Admin and Employee panels, both can log in to the system with the below features:

### Admin:
* Admin can log in to the system using its credentials and see the below pages.
* Manage Employee page with Add/Edit/Delete actions.
* Manage the Performance Review page to add the performance review for the employees.\
Admin can assign the performance review to a particular Employee (as a Reviewer).

### Employee:
* Manage the Feedback page, where all the assigned performance Reviews will be visible to provide the Feedback, there will be the Add/Edit option to provide the Feedback.
* Employee can log in to the system using its credentials.

### Validations:
* There will be some basic validations of required and type, eg. To save an Employee information, there will be some required fields: `First Name,
Last Name, Age, Email, Username, Password`.
* To save the Performance Review, there will be the required validation for the Performance Review.
* When an Employee will provide the Review, there will be a required validation for the Feedback field.
* Some fields have the type validation like `Age` should be a number and can have between 18 to 70 years, `Email` should be the type of a valid email address.
* On the Login screen, the password field should be the type of the password field so no one can see the password while typing.
* In the Admin panel > Employee Add/Edit page, the password field will be the normal text field, so the Admin can be sure what password is typing.

## `Demo`

To watch the demo see this video URL: https://drive.google.com/file/d/1Ht0_0YGeN5je2cvPCoLv2yWWHDb-qOI7/view?usp=sharing

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

### `yarn test src`

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
