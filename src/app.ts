import 'reflect-metadata';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import AuthController from './controllers/AuthController';

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

useContainer(Container);

useExpressServer(app, {
  routePrefix: 'api',
  controllers: [AuthController],
}).listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
