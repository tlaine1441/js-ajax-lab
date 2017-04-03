// Waits till doc is ready (i.e the dom is ready so we can select stuff)
 $("document").ready(function() {

 	// Grabs #cats to append li items too 
 	var catList = document.getElementById('cats');
 	// Makes results of current items in database 
	function makeResults(catData) {
		// Loops through and displays them newest to oldest
		for(var i = catData.length-1; i >= 0; i--) {
			let cats = document.createElement("li");
			let name = catData[i].name;
			let note = catData[i].note;
			cats.innerHTML = (name + " - " + note);
			catList.appendChild(cats);
		}

	}

	// addCat posts to database and appends new cat to top of #cats 
	function addCat(name, note) {
		// Make cat object to be parsed
		var cat = {
			"name": name,
			"note": note
		}

		// Uses jQuery.ajax to post
		// After post is .done (i.e done posting) we call a get to grab the new cat posted
		$.ajax({
			type: "POST",
			url: "https://ga-cat-rescue.herokuapp.com/api/cats",
			data: JSON.stringify(cat)
		}).done(function() {
			$.get("https://ga-cat-rescue.herokuapp.com/api/cats", function(data){
				// Gets list of cat object but this one contains the new one just posted
				// Its Parsed into json
				var newCatList = JSON.parse(data);

				// The cat just posted will be located at the last position of the array
				var newCat = newCatList[newCatList.length-1];

				// Create a new li element with the new cat information
				var name = newCat.name;
				var note = newCat.note;
				let cat = document.createElement("li");
				cat.innerHTML = (name + " - " + note);

				// Inserts before rather than appending to bottom of list
				catList.insertBefore(cat, catList.childNodes[0]);
			})
		});

	}

	// Gets all cats from cats api
	$.ajax({
		url: "https://ga-cat-rescue.herokuapp.com/api/cats"
		}).done(function(data) {
		// Parse data into a JSON object and store in catData
		var catData = JSON.parse(data);
		// Pass catData into make results
		makeResults(catData);
	});

	// Set form on submit event Listener
	$("#new-cat").on("submit", function(event) {
		// Prevent page from refreshing
		event.preventDefault();

		// Set name and node to input feild values
		var name = $("#cat-name").val();
		var note = $("#cat-note").val();

		// Pass Name and Note into addCat to post a new cat to database
		addCat(name, note);
	});

});