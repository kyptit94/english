import { FastifyInstance, RouteOptions, FastifyRequest } from 'fastify';
import { User, UserAttrs, UserParams } from '../config/models/user';

interface UserRequest extends FastifyRequest {
    params: UserParams;
}

export default async function (fastify: FastifyInstance, opts: RouteOptions) {
    fastify.get('/user', async function (request, reply) {
        const page = (request as UserRequest).params.page || 1;
        const limit = (request as UserRequest).params.limit || 10;
        const skip = (page - 1) * limit;
        const list = await User.find().skip(skip).limit(limit).select('_id name email');
        return list;
    });

    fastify.get('/user/:id', async function (request, reply) {
        const id: string = (request as UserRequest).params.id;
        const user = await User.findById(id).select('-password');
        return user;
    });

    fastify.post('/user', async function (request, reply) {
        const userData: UserAttrs = JSON.parse(request.body as string);
        try {
            const user = new User(userData);
            await user.save();
            return user;
        } catch (err) {
            throw err;
        }
    })

    fastify.put('/user/:id', async function (request) {
        const id: string = (request as UserRequest).params.id;
        const userData: UserAttrs = JSON.parse(request.body as string);
        try {
            const user = await User.findOneAndUpdate({ _id: id }, userData, { new: true }).select('-password');
            return user;
        } catch (err) {
            throw err;
        }
    });

    fastify.delete('/user/:id', async function (request, reply) {
        const id: string = (request as UserRequest).params.id;
        try {
            await User.findByIdAndDelete(id).select('-password');
            return "User deleted";
        } catch (err) {
            throw err;
        }
    });
}