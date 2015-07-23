$(document).ready(function(){
console.log('hello');

// Login Authentication
  $('#login-form').on("submit", function(event){
    event.preventDefault();
    var userData = {
      email: $("#login-user-email").val(),
      password: $("#login-user-password").val()
    };

    $.post('/login', userData, function(response){
      console.log(response);
      window.location = '/';
    });
  });

})

