
 $("document").ready(function() {

 	var catList = document.getElementById('cats');

	function makeResults(catData) {

		for(var i = catData.length-1; i >= 0; i--) {
			let cats = document.createElement("li");
			let name = catData[i].name;
			let note = catData[i].note;
			cats.innerHTML = (name + " - " + note);
			catList.appendChild(cats);
		}

	}

	function addCat(name, note) {

		var cat = {
			"name": name,
			"note": note
		}

		$.ajax({
			type: "POST",
			url: "https://ga-cat-rescue.herokuapp.com/api/cats",
			data: JSON.stringify(cat)
		}).done(function() {
			$.get("https://ga-cat-rescue.herokuapp.com/api/cats", function(data){
				var newCatList = JSON.parse(data);
				var newCat = newCatList[newCatList.length-1];
				var name = newCat.name;
				var note = newCat.note;
				let cat = document.createElement("li");
				cat.innerHTML = (name + " - " + note);
				catList.insertBefore(cat, catList.childNodes[0]);
			})
		});

	}

	$.ajax({
		url: "https://ga-cat-rescue.herokuapp.com/api/cats"
		}).done(function(data) {
		var catData = JSON.parse(data);
		makeResults(catData);
	});

	$("#new-cat").on("submit", function(event) {
		event.preventDefault();
		var name = $("#cat-name").val();
		var note = $("#cat-note").val();
		addCat(name, note);
	});
	
});