$(document).ready(function(){

	var $projectTemplate = _.template($('#project-template').html()),
		$mainTemplate = _.template($('#main-template').html()),
		$stickyTemplate = _.template($('#sticky-template').html());
		$loggedInTemplate = _.template($('#user-logged-in').html());


	//	CHECK FOR CURRENT USER
	$.get('/currentUser', function(data){
		console.log(data);
		$('#user-info').html($loggedInTemplate(data));
	})

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
			$('#add-sticky').show();
		})
	})

	//	HIDE ADD STICKY NOTE BUTTON
	$('#add-sticky').hide();

	//	ADD STICKY NOTE	
	$('#add-sticky').on('click', function(event){
		event.preventDefault();
		$('#sticky-area').append($stickyTemplate());
		console.log('sticky note button clicked');
	})

	// //	ADD STICKY NOTE TO DB
	// $.post('/api/notes', function(response){

	// });

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

	//	Logout
	$('#logout').on('click', function(){
		$.get('/login', function(){
			window.location = '/login';
			console.log('you have been logged out');
		})
	})

});


