// index.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes/routes.js';
import { errorHandler } from './modules/middlewares.js';
import { logRequestsResponse } from './modules/middlewares.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.use(logRequestsResponse);

app.use('/', routes);
app.use(errorHandler);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});