//	Text Editor

// Allow for vendor prefixes.
window.requestFileSystem = window.requestFileSystem ||
                           window.webkitRequestFileSystem;


// Create a variable that will store a reference to the FileSystem.
var filesystem = null;

// Get references to the page elements.
var form = document.getElementById('file-form');
var filenameInput = document.getElementById('filename');
var contentTextArea = document.getElementById('content');

var fileList = document.getElementById('file-list');

var messageBox = document.getElementById('messages');


// A simple error handler to be used throughout this demo.
function errorHandler(error) {
  var message = '';

  switch (error.code) {
    case FileError.SECURITY_ERR:
      message = 'Security Error';
      break;
    case FileError.NOT_FOUND_ERR:
      message = 'Not Found Error';
      break;
    case FileError.QUOTA_EXCEEDED_ERR:
      message = 'Quota Exceeded Error';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      message = 'Invalid Modification Error';
      break;
    case FileError.INVALID_STATE_ERR:
      message = 'Invalid State Error';
      break;
    default:
      message = 'Unknown Error';
      break;
  }

  console.log(message);
}


// Request a FileSystem and set the filesystem variable.
function initFileSystem() {
  navigator.webkitPersistentStorage.requestQuota(1024 * 1024 * 5,
    function(grantedSize) {

      // Request a file system with the new size.
      window.requestFileSystem(window.PERSISTENT, grantedSize, function(fs) {

        // Set the filesystem variable.
        filesystem = fs;

        // Setup event listeners on the form.
        setupFormEventListener();

        // Update the file browser.
        listFiles();

      }, errorHandler);

    }, errorHandler);
}


function loadFile(filename) {
  filesystem.root.getFile(filename, {}, function(fileEntry) {

    fileEntry.file(function(file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        // Update the form fields.
        filenameInput.value = filename;
        contentTextArea.value = this.result;
      };

      reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);
}


function displayEntries(entries) {
  // Clear out the current file browser entries.
  fileList.innerHTML = '';

  entries.forEach(function(entry, i) {
    var li = document.createElement('li');

    var link = document.createElement('a');
    link.innerHTML = entry.name;
    link.className = 'edit-file';
    li.appendChild(link);

    var delLink = document.createElement('a');
    delLink.innerHTML = '[x]';
    delLink.className = 'delete-file';
    li.appendChild(delLink);

    fileList.appendChild(li);

    // Setup an event listener that will load the file when the link
    // is clicked.
    link.addEventListener('click', function(e) {
      e.preventDefault();
      loadFile(entry.name);
    });

    // Setup an event listener that will delete the file when the delete link
    // is clicked.
    delLink.addEventListener('click', function(e) {
      e.preventDefault();
      deleteFile(entry.name);
    });
  });
}


function listFiles() {
  var dirReader = filesystem.root.createReader();
  var entries = [];

  var fetchEntries = function() {
    dirReader.readEntries(function(results) {
      if (!results.length) {
        displayEntries(entries.sort().reverse());
      } else {
        entries = entries.concat(results);
        fetchEntries();
      }
    }, errorHandler);
  };

  fetchEntries();
}


// Save a file in the FileSystem.
function saveFile(filename, content) {
  filesystem.root.getFile(filename, {create: true}, function(fileEntry) {

    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        // Update the file browser.
        listFiles();

        // Clean out the form field.
        filenameInput.value = '';
        contentTextArea.value = '';

        // Show a saved message.
        messageBox.innerHTML = 'File saved!';
      };

      fileWriter.onerror = function(e) {
        console.log('Write error: ' + e.toString());
        alert('An error occurred and your file could not be saved!');
      };

      var contentBlob = new Blob([content], {type: 'text/plain'});

      fileWriter.write(contentBlob);

    }, errorHandler);

  }, errorHandler);
}

// Simple class example

function SimpleSquareParticle(posX, posY) {
		this.x = posX;
		this.y = posY;
		this.velX = 0;
		this.velY = 0;
		this.accelX = 0;
		this.accelY = 0;
		this.color = "#FF0000";
		this.radius = 10;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
SimpleSquareParticle.prototype.hitTest = function(hitX,hitY) {
	return((hitX > this.x - this.radius)&&(hitX < this.x + this.radius)&&(hitY > this.y - this.radius)&&(hitY < this.y + this.radius));
}

//A function for drawing the particle.
SimpleSquareParticle.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = this.color;
	theContext.fillRect(this.x - this.radius, this.y - this.radius, 2*this.radius, 2*this.radius);
}

function deleteFile(filename) {
  filesystem.root.getFile(filename, {create: false}, function(fileEntry) {

    fileEntry.remove(function(e) {
      // Update the file browser.
      listFiles();

      // Show a deleted message.
      messageBox.innerHTML = 'File deleted!';
    }, errorHandler);

  }, errorHandler);
}


// Add event listeners on the form.
function setupFormEventListener() {

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the form data.
    var filename = filenameInput.value;
    var content = contentTextArea.value;

    // Save the file.
    saveFile(filename, content);
  });

}

// Start the app by requesting a FileSystem (if the browser supports the API)
if (window.requestFileSystem) {
  initFileSystem();
} else {
  alert('Sorry! Your browser doesn\'t support the FileSystem API :(');
}
console.log('hello');

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

var project = new Project();

//	Click Event that Saves Project to probjectObj
$('#add-project').on('click', function(){
	project.save();
	console.log(projectObj);
})

//	Click event for when new project button is clicked show new project form


//	Click Event that adds another task input field for #add-task button