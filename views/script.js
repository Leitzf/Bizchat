
//retrieveActiveListsFromServer('listsJSON.html');
var user;

function init()
{   
    retrieveUserFromServerJSON('user.json');
     
}

function retrieveUserFromServer(url, document) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			user = JSON.parse(xmlhttp.responseText);
            populateUserView(user);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function populateUserView(user) {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    name.innerHTML = "Fuck you";
    email.innerHTML = "BLAH";
}