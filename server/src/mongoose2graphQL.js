import composeWithMongoose from 'graphql-compose-mongoose';
import { GQC } from 'graphql-compose';

import ActorModel from './models/ActorModel';


const customizationOptions = {}; // left it empty for simplicity, described below
const ActorTC = composeWithMongoose(ActorModel, customizationOptions);

GQC.rootQuery().addFields({
	actorById: ActorTC.getResolver('findById'),
});

const graphqlSchema = GQC.buildSchema();
export default graphqlSchema;
