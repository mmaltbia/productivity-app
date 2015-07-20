//	Project Constructor

function Project(name, description, tasks) {
	this.name = $('#proj-name').val(); 
	this.description = $('#proj-description').val(); 
	this.tasks = $('#proj-tasks').val();
}

var projectObj = {};

Project.prototype.save = function(){
	projectObj.push(this.name); 
	projectObj.push(this.description); 
	projectObj.push(this.tasks);  
}

var project = new Project()

//	Click Event that Saves Project to probjectObj
$('#add-project').on('click', function(){
	project.save();
	console.log(projectObj);
})

//	Click event for when new project button is clicked show new project form


//	Click Event that adds another task input field for #add-task button