import express from 'express';
import routes from './routes.js';

const app = express();

const port = process.env.PORT || 9000;
const host = process.env.NODE_ENV || 'localhost';

app.use(express.json());
app.use('/', routes);

app.listen(port, () => console.log(`Server berjalan pada ${host}:${port}`));