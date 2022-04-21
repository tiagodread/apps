![Vercel](https://vercelbadge.vercel.app/api/tiagodread/apps)
# Miscellaneous Apps

Collection of small applications built using [React](https://pt-br.reactjs.org/) and [Create React App](https://github.com/facebook/create-react-app) for study purpose. 

## Deployment

You can access the deployed project on [Vercel](https://misc-apps.vercel.app/)


## Installing

Pre requisites:
- Docker

1. Clone this repo git clone `https://github.com/tiagodread/misc-apps`
2. Go to the repo folder `cd misc-apps`
3. Build the container `docker build -t currency-converter .`
4. Run the container `docker run -p 8043:3000 currency-converter`
5. Go to `http://localhost:8043`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run serve`

Serves the static built files using [serve](https://www.npmjs.com/package/serve)

### `npm run eject`



