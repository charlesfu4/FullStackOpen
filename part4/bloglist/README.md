# Getting Started with node.js backend 

Before starting the backend, configure your own `.env` files as follow
```
MONGODB_URI=mongodb+srv://fullstack:${YOUR_MONGODB_PASSWORD}@${YOUR_MONGODB_URL}.mongodb.net/bloglist?retryWrites=true
PORT=3001

TEST_MONGODB_URI=mongodb+srv://fullstack:${YOUR_MONGODB_PASSWORD}@${YOUR_MONGODB_URL}.mongodb.net/bloglist-test?retryWrites=true
```

Then install the required packaged by

### `npm install`

To run the test defined under `/test/`, simply run

### `npm test`
### `npm test -- ${TEST_PATH}`
### `npm test -- -t 'TEST_NAME'`
