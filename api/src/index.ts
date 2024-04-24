import 'module-alias/register';
import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import fastifyMultipart from '@fastify/multipart';
import autoload from '@fastify/autoload'
import { join } from 'path'
import pino from 'pino';
import db from './config/index';
// import fastifyFormbody from '@fastify/formbody';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/english';

const createApp = (
  opts?: FastifyServerOptions,
): FastifyInstance => {
  const defaultOptions = {
    logger: pino({ level: 'info' })
  }

  const app = fastify({ ...defaultOptions, ...opts })

  app.register(db, { uri });
  app.register(fastifyMultipart);

  app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
  })



  app.listen({ "port": 3000 }, (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    console.log(`server listening on ${address}`)
  })

  return app
}

createApp()