var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var NotesSchema = new Schema({
	title: String,
	text: String
});

var Note = mongoose.model('Notes', NotesSchema);
module.exports = Note;