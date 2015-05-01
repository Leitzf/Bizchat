
//retrieveActiveListsFromServer('listsJSON.html');

function init()
{   
	//var name = document.getElementById("name");
	//name.innerHTML = "HAHAHAHA";
    retrieveUserFromServerJSON('./user.json');
     
}

function retrieveUserFromServerJSON(url) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var user = JSON.parse(xmlhttp.responseText);
            populateUserView(user);
			
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function populateUserView(user) {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
	var pic = document.getElementById("userPic");
	//console.log(user.Fname);
	//console.log(user.pic);
    name.innerHTML = "<strong>"+user.Fname + " " + user.Lname+"</strong>";
    email.innerHTML = user.EmailAddr;
	pic.innerHTML = "<img  src=\"" + user.Picture + "\" alt=\"...\" class=\"img-thumbnail\">";
}
//*/