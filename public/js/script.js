$(document).ready(function(){

	var $projectTemplate = _.template($('#project-template').html());
	// var $mainTemplate = _.template($('#main-template').html());

	// GET PROJECTS
	$.get('/api/projects', function(data){
		console.log(data);
		_.each(data, function(project){
			$('#projects').prepend($projectTemplate(project));
		})
	})

	// SUBMIT NEW PROJECT
	$('#add-project').on('click', function(event){
		// event.preventDefault();
		// DEFINE THE OBJECT
		var project = {
			name: $('#proj-name').val(),
    		description: $('#proj-description').val()
		}

		$.post('/api/projects', project, function(data) {
			console.log(data);
			$('#myModal').modal('hide');
		})
	});

	// //	GET MAIN CONTENT TEMPLATE
	// $.post('/api/projects/:id', project, function(data){
	// 	console.log(data)
	// })

})


