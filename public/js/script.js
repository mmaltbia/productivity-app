$(document).ready(function(){

	var $projectTemplate = _.template($('#project-template').html()),
		$mainTemplate = _.template($('#main-template').html());

	// GET PROJECTS
	$.get('/api/projects', function(data){
		console.log(data);
		_.each(data, function(project){
			$('#projects').prepend($projectTemplate(project));
		})
		$('li.project-list-item').click(function(){
			console.log('click is working');
			console.log(this);
			$.get('/api/projects/' + $(this).data('project-id'), function(data){
				console.log(data);
				$('#main').html($mainTemplate(data));
			});
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
		});
	});

	console.log('hello there');

	//	EDIT EXISTING PROJECT DETAILS
	// $('p.project-li').mouseover(function(){
	// 		$('span').classList.add("glyphicon glyphicon-pencil");
	// });

	//	GET MAIN CONTENT TEMPLATE
	// $('body').click(function(){
	// 	console.log('blah')
	// })

	
	

});


