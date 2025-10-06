  import createError from 'http-errors';
  import express from 'express';
  import path from 'path';
  import cookieParser from 'cookie-parser';
  import logger from 'morgan';
  import indexRouter from './routes/index.js';
  import tutoRouter from './routes/tuto.js';
  import dockerRouter from './routes/docker.js';
  import usersRouter from './routes/users.js';
  import contactRouter from './routes/contanct.js';
  import { fileURLToPath } from 'url';
  import { dirname } from 'path';

  const app = express();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', indexRouter);
  app.use('/tuto', tutoRouter);
  app.use('/docker', dockerRouter);
  app.use('/users', usersRouter);
  app.use('/contact', contactRouter);

  app.use(function(req, res, next) {
    next(createError(404));
  });


  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });


  export default app;