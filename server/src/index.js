import Koa from 'koa';
import KoaRouter from 'koa-router';
import Promise from 'bluebird';
import graphqlHTTP from 'koa-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';

import './models';
import schema from './mongoose2graphQL';


mongoose.Promise = Promise;

// const schema = buildSchema(`
// 	type Query {
// 		actor: Actor
// 	}

// 	type Actor {
// 		name: String
// 	}
// `);

const rootValue = {
	actor: async () => {
		const actor = await mongoose.model('Actor').findOne();

		return actor;
	},
};


const app = new Koa();

const router = new KoaRouter();

router.all('/graphql', graphqlHTTP({
	schema,
	// rootValue,
	graphiql: true,
}));

app.use(router.routes())
	.use(router.allowedMethods());


async function main() {
	mongoose.connect('mongodb://localhost/graphql', {
		useMongoClient: true,
	});

	await new Promise(resolve => app.listen(8080, resolve));

	console.log('Listening on port 8080');
}

Promise.resolve(main()).done();
