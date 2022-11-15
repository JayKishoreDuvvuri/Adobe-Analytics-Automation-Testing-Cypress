# Cypress-FI-HH-Adobe-Analytics:

An example test project for FI-HH adobe analytics traking

## Application Under Test

We are using https://netbank.nd.test.nordea.fi/login/ as the Application Under Test.

- URL : https://netbank.nd.test.nordea.fi/login/
- OS : macOS
- IDE : Visual Studio Code

### Installation

Install the dependencies and devDependencies to run the test.

- Clone (OR) Download this repo as zip folder on to your local machine
- Navigate to project's directory on terminal and run the following commands:

```sh
npm install
```

### Open Cypress runner on Terminal

Run the following command on Terminal to open Cypress Test Runner:

```sh
npm run cy:open  (OR) npx cypress open
```

### Execute Test

Run the following command on Terminal to execute test

```sh
npm run test:chrome - Run the test in chrome headless mode
npm run test:firefox - Run the test in firefox headless mode
```
