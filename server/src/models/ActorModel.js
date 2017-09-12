import mongoose, { Schema } from 'mongoose';


const actorSchema = new Schema({
	name: {
		type: String,
		description: 'The name of the actor.'
	},
});

const ActorModel = mongoose.model('Actor', actorSchema);

export default ActorModel;
