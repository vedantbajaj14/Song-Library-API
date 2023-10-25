# Song Library API

The Song Library API is a RESTful service that allows you to interact with a library of songs. You can retrieve songs based on various attributes, create new song entries, update existing songs, and delete songs from the library.

## Tech Stack and Packages

Our Song Library API is built on a robust and efficient tech stack, ensuring a smooth and responsive experience for users. The application is engineered using modern technologies, a selection of which are detailed below:

### Core Technology

- **Node.js**: The backbone of our server-side operations, providing the environment for our JavaScript codebase. Its non-blocking I/O model ensures our API handles requests in a fast, scalable manner.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features to develop our web and mobile applications.

### Security and Performance

- **Helmet**: Helps secure our Express app by setting various HTTP headers to ward off known vulnerabilities.
- **cors**: Used to configure Express to add headers stating that your API accepts requests coming from other origins. This is essential for Microservices architectures and browser-based applications.
- **basic-auth**: A simple authentication scheme built into the HTTP protocol. The client sends HTTP requests with an Authorization header containing the word 'Basic' followed by a space and a base64-encoded username:password string.

### Logging and Monitoring

- **winston**: A multi-transport async logging library for Node.js, allowing us to log server operations. This is crucial for diagnosing issues and keeping track of server activity.
- **morgan**: An HTTP request logger middleware for Node.js, helping us log HTTP requests to the server, providing insights into request traffic and API usage patterns.

### Validation

- **express-validator**: A set of express.js middlewares that leverages validator.js to validate and sanitize input data. It helps ensure that we're processing clean, reliable data.

### Development

- **nodemon**: A utility that monitors for any changes in the server and automatically restarts the service, streamlining the development process.
- **loadtest**: Allows us to perform load testing on our application, assessing the app's performance under expected workload scenarios.

### Script Commands

- `npm run dev`: Launches the application in development mode, with active monitoring of file changes.
- `npm run test`: Runs the suite of automated tests defined for the application, ensuring code modifications haven't introduced new issues.

### Dependencies Management

Our application maintains a clear distinction between production and development dependencies to manage the deployment environment effectively:

- **dependencies**: These packages are essential for the application to execute. They include libraries that handle server operations, security, logging, and more.
- **devDependencies**: These are only required during development and testing. For instance, 'loadtest' is crucial for stress testing our application but isn't necessary in the production environment.

### Version Compatibility

We specify minimum versions for both our node and npm engines, ensuring compatibility and preventing unexpected breakdowns or deprecation issues.

```json
"engines": {
  "node": ">= 14.0.0",
  "npm": ">= 6.0.0"
}
```

## Authentication

Certain operations require authentication. Specifically, any requests to create, update, or delete data need to be authenticated with a username and password. For the purposes of this API, the required username is admin and the password is tim-the-goat.

These sensitive operations include the following endpoints:

POST /songs
PUT /songs/:id
DELETE /songs/:id

Authentication is performed via Basic Authentication. When making a request to the endpoints above, you must include an Authorization header with the value Basic <credentials>, where <credentials> is the Base64 encoding of username:password.

Here is an example of how to include the header using curl:

```shell
curl -X POST http://localhost:3000/songs \
     -H 'Authorization: Basic YWRtaW46dGltLXRoZS1nb2F0' \
     -H 'Content-Type: application/json' \
     -d '{"title": "New Song", "artist": "Famous Artist", "releaseDate": 2022, "genre": "Pop"}'
```

**Note:** The Base64 value YWRtaW46dGltLXRoZS1nb2F0 is an encoding of admin:tim-the-goat.


## Endpoints

The base URL for all API requests is http://localhost:3000. This leads you to Vedant's Music API 🎵!

### GET /songs
Retrieve a list of all songs or search for songs by various attributes.

**Parameters:**

- id (optional): Search for a song by its unique ID.
- title (optional): Search for songs by their title.
- artist (optional): Search for songs by the artist's name.
- album (optional): Search for songs from a specific album.
- genre (optional): Search for songs by genre.
- releaseDate (optional): Search for songs released in a specific year.

**Example request:**
GET /songs?artist=the+white+stripes


### POST /songs
Add a new song to the library.

Body parameters:

- title: The title of the song.
- artist: The name of the artist.
- releaseDate: The release year of the song.
- album (optional): The album where the song is included.
- genre (optional): The genre of the song.
- duration (optional): The duration of the song.
- lyrics (optional): The lyrics of the song.
- songReview (optional): A review of the song.

**Example request:**
POST /songs
Content-Type: application/json

{
    "title": "New Song",
    "artist": "Famous Artist",
    "releaseDate": 2022,
    "genre": "Pop"
}


### PUT /songs/:id
Update the details of an existing song. Replace :id with the song ID.

Body parameters:

- title (optional): The title of the song.
- artist (optional): The name of the artist.
- releaseDate (optional): The release year of the song.
- album (optional): The album where the song is included.
- genre (optional): The genre of the song.
- duration (optional): The duration of the song.
- lyrics (optional): The lyrics of the song.
- songReview (optional): A review of the song.

**Example request:**
PUT /songs/3
Content-Type: application/json

{
    "title": "Updated Song Title"
}


### DELETE /songs/:id
Delete a song from the library by its ID.

**Example request:**
DELETE /songs/3


## Logging

The Song Library API utilizes advanced logging mechanisms to record activities and errors that occur during the operation of the service. This ensures that all actions, such as requests to the API and internal processes, are monitored and stored for review and debugging purposes.

The logging is implemented using the `winston` library, which is a versatile logging library for Node.js. The configuration allows for different levels of logging (error, warn, info, debug, verbose) depending on the severity and nature of the messages. 

### Logger Configuration

The logger is configured to capture logs at a level of 'info' and above. The log messages are formatted with timestamps and converted to JSON format for consistency. Furthermore, they are printed in a readable format for ease of understanding.

Logs are directed to different transports, which are essentially storage or display destinations for log messages. The API employs the following transports:

- **Console**: Log messages are displayed in the console from which the API server is running. This is useful for immediate insight into the API's operations.

- **File (app.log)**: General log messages are stored in a file named `app.log` within the 'logs' directory. This file captures all log messages of level 'info' and above.

- **File (error.log)**: A separate file named `error.log` is dedicated to capturing 'error' level log messages. This separation is crucial for directly addressing the issues affecting the API's stability or performance.

### Logging in Action

Throughout the API's codebase, the logger is used to record information at various levels. For example:

- `logger.error('An error occurred.');` logs an error message, typically used within catch blocks where errors are handled.
- `logger.info('An informative log message.');` provides general information, such as confirming that a certain process has completed.
- `logger.debug('A debugging log message.');` is used for debugging purposes and often contains detailed information useful for developers.

Not in use:
- `logger.verbose('A verbose log message.');`
- `logger.warn('A warning message.');`

## Middleware

The API also contains middleware functions that utilize the logger:

- **Error Handling**: When an error is caught, the middleware logs the error message and stack trace using `logger.error`, then responds with a status of 500 (Internal Server Error).

- **Authentication**: During the authentication process, if the user credentials do not match, the request is logged and responded to with a 401 status (Unauthorized).

- **Request and Response Logging**: Each request to the API and its corresponding response are logged. This includes the method, URL, response time, request body, query parameters, and response status. The response time is calculated in milliseconds, providing insight into the performance aspect of the API.

The logging functionality is essential for maintaining the health and reliability of the API by monitoring its activity, recognizing unauthorized access attempts, and identifying areas that require improvement.



## Error Handling

The API responds with appropriate HTTP status codes. Below are some of the typical responses:

- 200 Success Request - 
- 400 Bad Request - Your request is missing some parameters or they are invalid.
- 401 Unauthorized - Your request lacks valid authentication credentials.
- 404 Not Found - The requested resource could not be found but may be available again in the future.
- 500 Internal Server Error - Something went wrong on our end.

In case of errors, the API will also return a JSON body detailing the issue. Here's an example:
{
    "error": "Description of the error"
}



## Testing
This project includes a series of automated tests designed to validate the functionality of the API endpoints. These tests cover a range of scenarios, including fetching, creating, updating, and deleting records within the song database. They are instrumental in identifying issues early in the development cycle and ensuring data integrity and endpoint reliability.

### Running the Tests
To execute these tests, you can use the Node.js test runner integrated into the project's setup. Simply run the following command in your terminal:
```shell
npm run test
```
This command triggers a suite of tests that interact with the API endpoints, simulating CRUD (Create, Read, Update, Delete) operations and various other interactions.

Each method request has its own test.js file like test-get.js, test-post.js, test-put.js and test-delete.js. This makes it easier to change the necessary code for tests without interrupting the flow of other test requests.

One thing to note is that authorization headers are needed so username and password are encoded and then provided.

### Customizing Test Parameters
The test scripts are designed to be modified as needed. For instance, tests that involve deleting a song require an existing song ID for accurate validation similarly with the appropriate update requests. You'll need to ensure the ID used in the 'DELETE', or 'PUT' tests corresponds to a record currently in the database; otherwise, the test will not perform as expected due to the non-existence of the target record.

Feel free to adjust the test parameters, data payloads, and endpoint paths to meet your specific testing needs or to reflect changes made during development.


## Load Testing 
As part of our application's performance evaluation, we conducted extensive load testing using Node.js loadtest CLI to assess how our server handles a variety of requests under different conditions. The tests were run on a system with 5 cores, simulating various request loads and client concurrency levels. Below, we share insights from several specific tests with the CLI arguments.

### GET Requests
- Fetching All Songs: A test with 1000 requests at 10 RPS (requests per second) yielded a mean latency of 14.3 ms, reflecting efficient handling for fetching extensive data, though there's room for improvement, possibly with better data structures.  

`loadtest -n 1000 -c 10 --rps 10 -m GET http://localhost:3000/songs`

- Query by ID: When querying songs by ID, the server demonstrated good performance, with a mean latency of 6.5 ms. Optimizing data access through structures enabling O(1) access can further enhance this.

`loadtest -n 100 -c 10 --rps 10 -m GET "http://localhost:3000/songs?id=1"`

- Search by Title: The search functionality was more resource-intensive, with a mean latency of 15.2 ms. Despite the higher latency, the server effectively handled multi-result queries.

`loadtest -n 150 -c 10 -m GET "http://localhost:3000/songs?title=one dance"`

- Filter by Artist: Queries for songs by a specific artist had an impressive mean latency of 5.2 ms, indicating a robust filtering mechanism.

`loadtest -n 200 -c 10 --rps 20 -m GET "http://localhost:3000/songs?artist=drake"`

- Filter by Genre: Similar efficiency was observed when filtering songs by genre, with a mean latency of 7.6 ms.

`loadtest -n 150 --rps 50 -m GET "http://localhost:3000/songs?genre=pop"`

- Filter by Album: This query parameter proved highly efficient, with a remarkable 2 ms mean latency.

`loadtest -n 200 --rps 100 -m GET "http://localhost:3000/songs?album=views"`

- Filter by Release Date: Even under heavy load (200 RPS), the server responded exceptionally well, with a latency of just 1.3 ms.

`loadtest -n 200 -c 20 --rps 200 -m GET "http://localhost:3000/songs?releaseDate=2015"`

### POST, PUT, and DELETE Requests
Note: These tests were authenticated using basic authentication with the credentials encoded in base-64.

- Creating New Songs (POST): This operation was more latency-intensive (103.6 ms), likely due to the overhead of data validation and writing to the database. However, the overall time was still commendable.

`loadtest -n 100 -c 100 -H "Authorization: Basic YWRtaW46dGltLXRoZS1nb2F0" -T 'application/json' -m POST -P '{"title": "new song", "artist": "new artist", "releaseDate": "2023", "songReview": "POST loadtest working"}' "http://localhost:3000/songs"`

- Updating Song Information (PUT): With a mean latency of 88.5 ms, updating records was efficient, particularly when modifying existing data points. Notably, a high-load scenario revealed potential concurrency issues or server limitations, as evidenced by a significant error rate in one test (145 out of 200 requests failed). This finding suggests a need for further investigation into asynchronous operations or server capacity enhancements.

`loadtest -n 100 -c 100 -H "Authorization: Basic YWRtaW46dGltLXRoZS1nb2F0" -T 'application/json' -m PUT --data '{"songReview": "PUT loadtest working"}' "http://localhost:3000/songs/1"`

- Deleting Songs (DELETE): The delete operation was highly efficient, though the testing method could be improved for accuracy. The current approach resulted in a high error rate after the initial deletion, indicating the need for a looped test that creates a new record before proceeding with the deletion.

`loadtest -n 100 -c 100 -H "Authorization: Basic YWRtaW46dGltLXRoZS1nb2F0" -m DELETE "http://localhost:3000/songs/1697967809223" `

### Conclusions and Further Considerations
The load tests underscored the application's robustness under varied conditions, highlighting areas for potential optimization. The GET requests, particularly those with specific query parameters, were handled very efficiently. However, operations that write to the database, especially under high concurrency, exhibited vulnerabilities, potentially due to synchronous file writes or data structure inefficiencies.

For future development cycles, considerations include implementing advanced data structures for O(1) access, exploring asynchronous database operations, and employing looped testing mechanisms for DELETE operations. Additionally, the issues uncovered with PUT operations under high load necessitate a deeper dive into the server's handling of concurrent write requests.

This analysis serves as a stepping stone for further performance enhancements and reliability checks in subsequent versions of the application.



## License
Though the project operates under the MIT License as per our README, our package.json specifies the "AGPL-version-3.0". It's critical to reconcile these declarations, ensuring consistent licensing information.