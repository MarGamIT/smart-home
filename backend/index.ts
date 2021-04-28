import { RethinkDBMSService } from './services/rethink-dbms.service';
import { ConsoleLoggerService } from '../library/services/console-logger.service';
import { ExpressApiService } from './services/express-api.service';
import express from 'express';

const rdbms = new RethinkDBMSService('localhost', 28015, 'pool_operation_diary', 'users', 'entries');
const logger = new ConsoleLoggerService();
const api = new ExpressApiService(3000, rdbms, logger, express());
api.initializeApi();
api.start();