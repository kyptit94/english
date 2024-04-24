import { FastifyInstance, RouteOptions } from 'fastify';
import { User, UserAttrs } from '../config/models/user';
import { MongoError } from 'mongodb';

export default async function (fastify: FastifyInstance, opts : RouteOptions) {
    fastify.get('/user', async function (request, reply) {
        const list = await User.find();
        return list;
    });

    fastify.post('/user', async function (request, reply) {
        const userData: UserAttrs = JSON.parse(request.body as string);
        try {
            const user = await User.addOne(userData);
            return user;
        } catch (err) {
            if ((err as MongoError).code === 11000 || (err as MongoError).code === 11001) {
                // This is a duplicate key error
                reply.code(400).send({ error: 'Email already in use' });
            } else {
                throw err;
            }
        }
    });
}