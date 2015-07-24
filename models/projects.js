var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Note = require('./notes');

var ProjectSchema = new Schema({
    name: String,
    description: String,
	notes: [Note.schema]
});

var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;