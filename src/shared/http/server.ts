import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import AppError from '../errors/AppError';
import '@shared/typeorm';
import routes from './routes';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());

//Definição de rota estática para as imagens. EX: '/files/nome-da-imagem'
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server running on port 3333!');
});
