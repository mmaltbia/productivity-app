var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var NotesSchema = new Schema({
    name: String,
    description: String,
	text: String
});

var Notes = mongoose.model('Notes', NotesSchema);
module.exports = Notes;