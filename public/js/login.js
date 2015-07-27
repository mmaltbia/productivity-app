$.backstretch("../images/laptop.jpg");

$(document).ready(function(){
	
	$('#signup-div').hide();

	//	SHOW SIGNUP FORM ON 'NEW? SIGN UP HERE' CLICK
	$('#sign-up').on('click', function(event){
		event.preventDefault();
		$('#signup-div').show();
		$('#login-form').hide();
	});

	//	SHOW LOGIN FORM ON 'ALREADY REGISTERED? LOGIN HERE' CLICK
	$('#login').on('click', function(event) {
		event.preventDefault();
		$('#login-form').show();
		$('#signup-div').hide();
	});

	//	EMAIL ADDRESS ALREADY IN USE CHECK
	$('#signup-form').on('submit', function(event){
			event.preventDefault();

	});

	console.log('Hey there! Thanks for stopping by. Quick intro about me. My name is Michelle and my motivation for building this app stemmed from the need to have one central location for me to document my progress on projects that I am working on. I had a lot of fun building this tool, and I hope you find it useful!');
	console.log('Like what you see? Im on twitter & IG @michellemaltbia as well as linkedin.com/in/michellemaltbia')
// // Login Authentication
//   $('#login-form').on("submit", function(event){
//     event.preventDefault();
//     var userData = {
//       email: $("#login-user-email").val(),
//       password: $("#login-user-password").val()
//     };

//     $.post('/login', userData, function(response){
//       console.log(response);
//     });
//   });

})

