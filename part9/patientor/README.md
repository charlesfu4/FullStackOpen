# Patientor - backend 

## Available Scripts

In the project directory, you can run:

### `npm install`

Install the project dependencies.

### `npm run dev`

Runs the server in the development mode.<br />
Open [http://locrlhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run tsc`

To build the backend into the folder `/build`. The typescript backend will be transpiled into javascript code.

### `npm start`

After building the project. Run the backend from the transpiled js version in `/build` folder.

## Possible API 

### Diagnosis 

Given url `/api/diagnosis`
- GET: get all diagnosis
- GET `/api/diagnosis/censored`: get all dignosis with censoring sensitive data
- GET `/api/diagnosis/id`: get diagnosis based on id

### Patients 

Given url `/api/patients`
- GET: get all patients 
- GET `/api/patients/id`: get patietns based on id
- POST: post a new patient 
- POST `/api/patients/:id/entries`: post new health record entry to a specific patient

