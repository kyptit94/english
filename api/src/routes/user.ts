import { FastifyInstance, RouteOptions } from 'fastify';
import { User } from '../config/models/user';

export default async function (fastify: FastifyInstance, opts : RouteOptions) {
    fastify.get('/user', async function (request, reply) {
        const list = await User.find();
        return list;
    });

    fastify.post('/user', async function (request, reply) {
        const userData = JSON.parse(request.body as string);
        const user = new User(userData);
        await user.save();
        return user;
    });
}