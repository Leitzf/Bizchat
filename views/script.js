function init()
{   
    retrieveUserFromServerJSON('./user.json');
     
}
function initRoom()
{
	retrieveRoomFromServerJSON('./room1.json');
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

function retrieveRoomFromServerJSON(url) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var room = JSON.parse(xmlhttp.responseText);
            populateRoomView(room);
			
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

function populateRoomView(room) {
    var name = document.getElementById("roomName");
    var desc = document.getElementById("roomDesc");
	//console.log(user.Fname);
	//console.log(user.pic);
    name.innerHTML = "<strong>"+room.Name+"</strong>";
    desc.innerHTML = room.Description;
	pic.innerHTML = "<img  src=\"" + user.Picture + "\" alt=\"...\" class=\"img-thumbnail\">";
}
