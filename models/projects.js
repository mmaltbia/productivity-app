var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	notes = require('./notes');

var ProjectSchema = new Schema({
    name: String,
    description: String,
	notes: {
		type: Schema.Types.ObjectId,
		ref: 'Notes'}
});

var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;