var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var NotesSchema = new Schema({
	text: String
});

var Notes = mongoose.model('Notes', NotesSchema);
module.exports = Notes;