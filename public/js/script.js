$(document).ready(function(){

	var $projectTemplate = _.template($('#project-template').html()),
		$mainTemplate = _.template($('#main-template').html()),
		$stickyTemplate = _.template($('#sticky-template').html());
		$loggedInTemplate = _.template($('#user-logged-in').html());


	// //	Logged in User

	// $('#user-info').html($loggedInTemplate(data));

	$.get('/api/me', function(data){
		console.log(data);
		if (data !== null){
			console.log('user logged in');
			_.each(data.projects, function(project){
				$('#projects').prepend($projectTemplate(project));
			})

		} else {
			console.log('user is not logged in');

		}
	})

	$('#projects').on('click', '.project-list-item', function(){
				console.log('click is working');
				console.log(this);
				$.get('/api/projects/' + $(this).data('project-id'), function(data){
					console.log(data);
					$('#main').html($mainTemplate(data));
				});
				$('#add-sticky').show();
			})

	// GET PROJECTS
	$.get('/api/projects', function(data){
		console.log(data);
		
	})

	//	HIDE ADD STICKY NOTE BUTTON
	$('#add-sticky').hide();

	//	ADD STICKY NOTE	
	$('#add-sticky').on('click', function(event){
		event.preventDefault();
		$('#sticky-area').append($stickyTemplate());
		console.log('sticky note button clicked');
	})

	//	ADD STICKY NOTE TO DB
	$('#save-button').on('click', function(event){
		event.preventDefault();
		$.post('/api/projects/:projects/notes', function(data){
			console.log(data);
		})
		console.log('save button clicked');
	})
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

		var notes = {
			text: $('#proj-notes').val()
		}

		$.post('/api/projects', project, function(data) {
			console.log(data);
			$('#myModal').modal('hide');
			$('#projects').prepend($projectTemplate(data));
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


