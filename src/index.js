// importing the dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from './routes/IndexRoute'

// defining the Express app
const app = express();
const port = 3001;
const router = express.Router();

// defining an array to work as the database (temporary solution)
routes(router);

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use('/', router);

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.status(200).send('Welcome to CH Employee API');
});

// starting the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
