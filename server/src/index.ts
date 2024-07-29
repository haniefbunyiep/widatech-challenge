import express, { Express, Request, Response, NextFunction } from 'express';
import router from './router';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Express = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use(router);
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  return res.send('<h1>Welcome to Express Typescript Server</h1>');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const statusMessage = err.message || 'Error';

  res.status(statusCode).send({
    error: true,
    message: statusMessage,
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
