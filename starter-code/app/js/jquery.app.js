 function makeResults(catData) {
 	var catList = document.getElementById('cats');
	for(var i = 0; i < catData.length; i++) {
		var cats = document.createElement("li");
		let name = catData[i].name;
		let note = catData[i].note;
		console.log(name + " - " + note);
		cats.innerHTML = (name + " - " + note);
		catList.appendChild(cats);
   	}
}

 $.ajax({
    url: "https://ga-cat-rescue.herokuapp.com/api/cats"
  }).done(function(data) {
    console.log(data);
   	var catData = JSON.parse(data);
   	console.log(catData);
   	makeResults(catData);
  });
