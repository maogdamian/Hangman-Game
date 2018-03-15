// Overwatch Hangman Game


// Set a variable equal to all letters

var letters = [
"a","b","c","d","e","f","g","h","i","j","k","l","m","n",
"o","p","q","r","s","t","u","v","w","x","y","z"
]

// Declare variables needed throughout the game
var incorrectGuesses = [];
var guesses = [];
var guess = "";
var guessesNotInSolution = letters;
var valid = false;
var keyPressed = false;
var solution;
var workingPuzzle;
var wins = 0;
var losses = 0;
var currentPuzzle;
var puzzleIndex = 0;

// Messages for events like winning, losing, and already guessing that display in place of the puzzle or guesses
var alreadyGuessed = "You already guessed that letter!";
var missesRow = document.querySelector(".guessed-letters");
var youWin = "Great job!";
var youLose = "LoL, you lose!"
var youWinH;
var youWinText;


// Variables for sound files -----------------------------------------------------------
var missSounds;
var loseSounds;
var loseSound;

var apocalypse
var fireAtWill
var nerfThis
var fireInTheHole
var hanzoRyuu
var highNoon
var justice
var breakDown
var meteorStrike
var dontMove
var poweredUp
var dragonBecomes
var surrenderWill
var sights
var forseeGreatThings
var cheersLove
var mySights
var justiceDone
var tranquility
var heroes
var deathWalks
var booDoo
var ceaseResistance
var needLater
var barrierActivated
var protectUs
var oohSorry
var beReasonable
var askingForIt
var nothingPersonal
var servesYouRight
var oopsSorry
var thatStings
var didntMakeCut
var shotDown
var youDone
var joking
var gg


// DOM manipulation /////////////////////////////////////////////////////
var body = document.getElementById("body");


// SOUND -----------------------------------------------------------



// Function for creating sound files
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

// This initializes all sound files
var soundInit = function() {

	// Puzzle Sounds -----------------------------------------------------------
	apocalypse = new sound("assets/sounds/apocalypse.ogg");
	fireAtWill = new sound("assets/sounds/fire_at_will.ogg");
	nerfThis = new sound("assets/sounds/nerf_this.ogg");
	//winkyFace = new sound("assets/sounds/dva_winky_face.mp3");
	fireInTheHole = new sound("assets/sounds/fire_in_the_hole.ogg");
	hanzoRyuu = new sound("assets/sounds/ryuu.ogg");
	//heroSelect = new sound("assets/sounds/hero_select.mp3");
	highNoon = new sound("assets/sounds/high_noon.ogg");
	justice = new sound("assets/sounds/justice.ogg");
	breakDown = new sound("assets/sounds/lets_break_it_down.ogg");
	//speedBoost = new sound("assets/sounds/lucio_speed_music.mp3");
	//whoaThere = new sound("assets/sounds/mcree_whoa_there.mp3");
	//hadItComing = new sound("assets/sounds/mcree_yall_had_it_coming.mp3");
	//yippie = new sound("assets/sounds/mcree_yippie.mp3");
	//meiSorry = new sound("assets/sounds/mei_sorry.mp3");
	//playOfTheGame = new sound("assets/sounds/play_of_the_game.mp3");
	meteorStrike = new sound("assets/sounds/meteor_strike.ogg")
	dontMove = new sound("assets/sounds/dont_move.ogg")
	poweredUp = new sound("assets/sounds/powered_up.wav")
	dragonBecomes = new sound("assets/sounds/dragon_becomes.ogg")
	surrenderWill = new sound("assets/sounds/surrender_will.ogg")

	sights = new sound("assets/sounds/sights.ogg");
	forseeGreatThings = new sound("assets/sounds/forsee_great_things.ogg");
	cheersLove = new sound("assets/sounds/cheers_love.ogg");
	mySights = new sound("assets/sounds/my_sights.ogg");
	justiceDone = new sound("assets/sounds/justice_done.ogg");
	tranquility = new sound("assets/sounds/tranquility.ogg");
	heroes = new sound("assets/sounds/heroes_never_die.ogg");
	deathWalks = new sound("assets/sounds/death_walks.ogg");
	//hammerJustice = new sound("assets/sounds/hammer_justice.mp3");
	//revenge = new sound("assets/sounds/revenge.mp3");
	booDoo = new sound("assets/sounds/boo_doo.mp3");
	ceaseResistance = new sound("assets/sounds/cease_resistance.mp3")
	needLater = new sound("assets/sounds/need_later.ogg")
	//freedomIllusion = new sound("assets/sounds/freedom_illusion.mp3");
	//speedBoostQuote = new sound("assets/sounds/speed_boost.mp3");
	barrierActivated = new sound("assets/sounds/barrier_activated.ogg")
	protectUs = new sound ("assets/sounds/protect_us.ogg")

	// Game Sounds - Start Game
	speedBoost = new sound("assets/sounds/matchBegin.mp3")

	// Miss sounds ------------------------------------------------------------
	oohSorry = new sound("assets/sounds/ooh_sorry.ogg");
	beReasonable = new sound("assets/sounds/be_reasonable.ogg");
	askingForIt = new sound("assets/sounds/asking_for_it.ogg");
	nothingPersonal = new sound("assets/sounds/nothing_personal.mp3");
	servesYouRight = new sound("assets/sounds/serves_you_right.mp3");
	oopsSorry = new sound("assets/sounds/oops_sorry.ogg");
	thatStings = new sound("assets/sounds/that_stings.ogg");
	//Lose sounds --------------------------------------------------------------
	didntMakeCut = new sound("assets/sounds/didnt_make_cut.ogg");
	shotDown = new sound("assets/sounds/shot_down.mp3");
	youDone = new sound("assets/sounds/you_done.mp3");
	joking = new sound("assets/sounds/joking.ogg");
	gg = new sound("assets/sounds/gg.ogg");

	missSounds = [ oohSorry, beReasonable, askingForIt, nothingPersonal, servesYouRight, oopsSorry, thatStings]
	loseSounds = [ didntMakeCut, shotDown, youDone, joking, gg ]
}

var randomMissSound = function() {
	var missSound = Math.floor((Math.random() * missSounds.length));
	return missSounds[missSound]
}


var playLoseSound = function() {
	var loseSound = Math.floor((Math.random() * loseSounds.length));
	loseSounds[loseSound].play()
}

var phraseSound = function() {
	currentPuzzle.sound.play()
}


// Variable Images

var banner = new Image();
banner.src = "assets/images/overwatch_logo.png"
banner.class = "img-responsive banner-img thumbnail"

var anaIcon = new Image();
anaIcon.src = "assets/images/ana.png";
anaIcon.class = "img-responsive";

var bastionIcon = new Image();
bastionIcon.src = "assets/images/bastion.png";
bastionIcon.class = "img-responsive";

var brigitteIcon = new Image();
brigitteIcon.src = "assets/images/brigitte.png";
brigitteIcon.class = "img-responsive";

var dvaIcon = new Image();
dvaIcon.src = "assets/images/dva.png";
dvaIcon.class = "img-responsive";

var doomIcon = new Image();
doomIcon.src = "assets/images/doomfist.png";
doomIcon.class = "img-responsive";

var genjiIcon = new Image();
genjiIcon.src = "assets/images/genji.png";
genjiIcon.class = "img-responsive";

var hanzoIcon = new Image();
hanzoIcon.src = "assets/images/hanzo.png";
hanzoIcon.class = "img-responsive";

var junkratIcon = new Image();
junkratIcon.src = "assets/images/junkrat.png";
junkratIcon.class = "img-responsive";

var lucioIcon = new Image();
lucioIcon.src = "assets/images/lucio.png";
lucioIcon.class = "img-responsive";

var mcreeIcon = new Image();
mcreeIcon.src = "assets/images/mccree.png";
mcreeIcon.class = "img-responsive";

var meiIcon = new Image();
meiIcon.src = "assets/images/mei.png";
meiIcon.class = "img-responsive";

var mercyIcon = new Image();
mercyIcon.src = "assets/images/mercy.png";
mercyIcon.class = "img-responsive";

var moiraIcon = new Image();
moiraIcon.src = "assets/images/moira.png";
moiraIcon.class = "img-responsive";

var orisaIcon = new Image();
orisaIcon.src = "assets/images/orisa.png";
mercyIcon.class = "img-responsive";

var pharahIcon = new Image();
pharahIcon.src = "assets/images/pharah.png";
pharahIcon.class = "img-responsive";

var reaperIcon = new Image();
reaperIcon.src = "assets/images/reaper.png";
reaperIcon.class = "img-responsive";

var reinhardtIcon = new Image();
reinhardtIcon.src = "assets/images/reinhardt.png";
reinhardtIcon.class = "img-responsive";

var roadhogIcon = new Image();
roadhogIcon.src = "assets/images/roadhog.png";
roadhogIcon.class = "img-responsive";

var soldierIcon = new Image();
soldierIcon.src = "assets/images/soldier.png";
soldierIcon.class = "img-responsive";

var sombraIcon = new Image();
sombraIcon.src = "assets/images/sombra.png";
soldierIcon.class = "img-responsive";

var symmetraIcon = new Image();
symmetraIcon.src = "assets/images/symmetra.png";
symmetraIcon.class = "img-responsive";

var torbIcon = new Image();
torbIcon.src = "assets/images/torb.png";
torbIcon.class = "img-responsive";

var tracerIcon = new Image();
tracerIcon.src = "assets/images/tracer.png";
tracerIcon.class = "img-responsive";

var winstonIcon = new Image();
winstonIcon.src = "assets/images/winston.png";
winstonIcon.class = "img-responsive";

var zaryaIcon = new Image();
zaryaIcon.src = "assets/images/zarya.png";
zaryaIcon.class = "img-responsive";

var zenyattaIcon = new Image();
zenyattaIcon.src = "assets/images/zenyatta.png";
zenyattaIcon.class = "img-responsive";

var widowIcon = new Image();
widowIcon.src = "assets/images/widow.png";
widowIcon.class = "img-responsive";

var overwatchLogo = new Image();
overwatchLogo.src = "assets/images/overwatch_circle.png";
overwatchLogo.class = "img-responsive";


// Variable for div holding the pictures for when a player misses a guess
var missesDivOne = document.getElementById('missesOne');
var missesDivTwo = document.getElementById('missesTwo');
var missesDivThree = document.getElementById('missesThree');
var missesDivFour = document.getElementById('missesFour');
var missesDivFive = document.getElementById('missesFive');
var missesDivSix = document.getElementById('missesSix');

// Image Files
var overwatchLogo1 = new Image();
overwatchLogo1.src = "assets/images/overwatch_circle.png";
overwatchLogo1.class = "img-responsive";

var overwatchLogo2= new Image();
overwatchLogo2.src = "assets/images/overwatch_circle.png";
overwatchLogo2.class = "img-responsive";

var overwatchLogo3 = new Image();
overwatchLogo3.src = "assets/images/overwatch_circle.png";
overwatchLogo3.class = "img-responsive";

var overwatchLogo4 = new Image();
overwatchLogo4.src = "assets/images/overwatch_circle.png";
overwatchLogo4.class = "img-responsive";

var overwatchLogo5 = new Image();
overwatchLogo5.src = "assets/images/overwatch_circle.png";
overwatchLogo5.class = "img-responsive";

var overwatchLogo6 = new Image();
overwatchLogo6.src = "assets/images/overwatch_circle.png";
overwatchLogo6.class = "img-responsive";

// Function to load images into missed guesses div

var loadMissImage = function(image1, image2, image3, image4, image5, image6) {

	//console.log("loading dva images")

	missesDivOne.appendChild(image1);
	missesDivTwo.appendChild(image2);
	missesDivThree.appendChild(image3);
	missesDivFour.appendChild(image4);
	missesDivFive.appendChild(image5);
	missesDivSix.appendChild(image6);
};


var removeMissImage = function(div) {
	div.removeChild(div.childNodes[0])
	//console.log("image removed")
};




// Modals -----------------------------------------------------------

var loadModalImage = function() {
	// the div the image goes in
	var modalDiv = document.getElementById('modal');
	// the image associated with the puzzle to be loaded
	var modalImage = currentPuzzle.image;
	// Check if there was an image loaded previously
	while (modal.firstChild) {
	//	console.log("removing previous image from modal")
		modal.removeChild(modal.firstChild);
	}
	// append the image to the div
	modalDiv.appendChild(modalImage);
};

var loadIntroModalImage = function() {
	// the div the image goes in
	var introModalDiv = document.getElementById('intro-modal');
	// the image associated with the puzzle to be loaded
	var modalImage = banner;
	// append the image to the div
	introModalDiv.insertBefore(modalImage, introModalDiv.firstChild)
}

var closeIntroModal = function() {
	introModal.style.display = "none";
	body.className = "";
	matchBegin.pause();
	matchBegin.currentTime = 0;
	// if (introModal.firstChild) {
	//	console.log("removing previous image from modal")
		// introModal.removeChild(modal.firstChild);
}

// Puzzles -----------------------------------------------------------

// Puzzle object that holds phrases and sounds
function puzzle(phrase, sound, image) {

	this.phrase = phrase;
	this.sound = sound;
	this.image = image;
};

// Creating puzzle objects for use in game
var puzzleInit = function() {
	var meteorStrikePuz = new puzzle("Meteor Strike", meteorStrike, doomIcon);
	var nerfThisPuz = new puzzle("Nerf this", nerfThis,dvaIcon);
	var highNoonPuz = new puzzle("It's high noon", highNoon, mcreeIcon);
	var barrierActivatedPuz = new puzzle("Barrier Activated", barrierActivated, winstonIcon);
	var cheersLovePuz = new puzzle("Cheers love, the cavalry's here", cheersLove, tracerIcon);
	var fireInTheHolePuz = new puzzle("Fire in the hole", fireInTheHole, junkratIcon);
	var apocalypsePuz = new puzzle("I'm a one man apocalypse", apocalypse, roadhogIcon);
	var justicePuz = new puzzle("Justice Rains from above", justice, pharahIcon);
	var fireAtWillPuz = new puzzle("Fire at will", fireAtWill, zaryaIcon);
	var hanzoRyuuPuz = new puzzle("ryuu ga waga teki wo kurau", hanzoRyuu, hanzoIcon);
	var freezeDontMovePuz = new puzzle("Freeze, don't move", dontMove, meiIcon);
	//var winkyFacePuz = new puzzle("Winky face", winkyFace, dvaIcon);
	var sightsPuz = new puzzle("I've got you in my sights", sights, soldierIcon);
	var forseeGreatThingsPuz = new puzzle("I forsee great things", forseeGreatThings, torbIcon);
	var mySightsPuz = new puzzle("No one can hide from my sights", mySights, widowIcon);
	var heroesNeverDiePuz = new puzzle("Heroes never die", heroes, mercyIcon);
	var tranquilityPuz = new puzzle("Experience tranquility", tranquility, zenyattaIcon);
	var deathWalksPuz = new puzzle("Death walks among you", deathWalks, reaperIcon);
	var justiceDonePuz = new puzzle ("Justice will be done", justiceDone, reinhardtIcon);
	var dragonBecomesPuz = new puzzle("The dragon becomes me", dragonBecomes, genjiIcon);
	var booDooPuz = new puzzle("Boo doo boo doo", booDoo, bastionIcon);
	//var freedomIllusionPuz = new puzzle("Freedom is a convenient illusion", freedomIllusion, symmetraIcon);
	var breakDownPuz = new puzzle("Oh, let's break it down", breakDown, lucioIcon);
	var poweredUpPuz = new puzzle("You're powered up get in there", poweredUp, anaIcon);
	var surrenderWillPuz = new puzzle ("Surrender to my will", surrenderWill, moiraIcon);
	var needLaterPuz = new puzzle ("I might need this later", needLater, sombraIcon);
	var ceaseResistancePuz = new puzzle ("Cease your resistance", ceaseResistance, orisaIcon);
	var protectUsPuz = new puzzle ("This will protect us", protectUs, symmetraIcon)

	puzzles = [meteorStrikePuz, nerfThisPuz, highNoonPuz, barrierActivatedPuz, cheersLovePuz, fireInTheHolePuz, apocalypsePuz,
		justicePuz, fireAtWillPuz, hanzoRyuuPuz, freezeDontMovePuz, sightsPuz, forseeGreatThingsPuz, mySightsPuz, heroesNeverDiePuz,
		tranquilityPuz, deathWalksPuz, justiceDonePuz, dragonBecomesPuz, booDooPuz, breakDownPuz, poweredUpPuz,
		poweredUpPuz, surrenderWillPuz, needLaterPuz, ceaseResistancePuz, protectUsPuz]
};

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// INIT -----------------------------------------------------------

// This begins a new game
var startGame = function() {
	closeIntroModal();
	soundInit(); // Initialize sound files
	puzzleInit(); // Initialize puzzle objects
	shuffleArray(puzzles) // Randomize puzzle list so there are no duplicates in a game 
						  // session until player goes through entire list
	newPuzzle(); // Create a new puzzle

	wins = 0; // reset wins and losses
	losses = 0;

	displayPuzzle();
};

var newPuzzle = function() {
	// load images that represent misses
	loadMissImage(overwatchLogo1, overwatchLogo2, overwatchLogo3, overwatchLogo4, overwatchLogo5, overwatchLogo6);

	// variables for new puzzle
	currentPuzzle = puzzles[puzzleIndex]
	//console.log("Current Puzzle: " + currentPuzzle)
	solution = stringToArray(currentPuzzle.phrase.toLowerCase());
	//console.log("Solution: " + solution)
	blanks = getBlanks(solution);
	blanksWithSpaces = extraSpaces(blanks);
	workingPuzzle = blanks;
	//console.log(currentPuzzle.image)
	speedBoost.play()
};

var nextPuzzle = function() {
	// if player reaches the last puzzle in the list, shuffle all of the puzzles and start the index 
	// from zero again
	//removeYouWin()
	body.className = ""; // make the body scrollable again
	if (puzzleIndex == puzzles.length - 1) { 
		puzzleIndex = 0;	
		shuffleArray(puzzles)
	}
	// Reset Variables
	incorrectGuesses = [];
	guesses = [];
	guessesNotInSolution = [];
	gameOver= false;

	guessesNotInSolution = [
		"a","b","c","d","e","f","g","h","i","j","k","l","m","n",
		"o","p","q","r","s","t","u","v","w","x","y","z"
		]
	newPuzzle();
	displayPuzzle();
};

// Get the modal
var modal = document.getElementById('modal');

var introModal = document.getElementById('intro-modal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
displayModal = function() {
	body.className = "modal-open"; //disable scrolling when modal is up
    modal.style.display = "block";
    setTimeout(function(){
    	modal.style.display = "none";}, 4000);

	}

// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
    }
}

displayIntroModal = function() {
	body.className = "modal-open";
	introModal.style.display = "block";
}
	
// FUNCTIONS -----------------------------------------------------------

// DISPLAY -----------------------------------------------------------

// function to update the display with new data
displayPuzzle = function(message = workingPuzzle) {
	console.trace()
	console.log("Message: " + message)
	document.querySelector(".puzzle").innerHTML = extraSpaces(message);
	document.querySelector(".wins").innerHTML = "Wins: " + wins +"\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + " Losses: " + losses; 
	document.querySelector(".guessed-letters").innerHTML = extraSpaces(arrayToString(guessesNotInSolution));
}

displaySolution = function() {
	console.log("displaying solution: " + solution)
	document.querySelector(".puzzle").innerHTML = extraSpaces(arrayToString(solution));
}

//adds extra characters to all letters in a word's display for HTML
var extraSpaces = function(word) { 
		var wordWithSpaces = ""
		for (letter in word) {
			wordWithSpaces += word[letter] + "\xa0"
		}
		return wordWithSpaces
};

// These functions check if the guess is in the solution and rewrite the workingPuzzle to account 
// for correct answers

var checkArray = function(array, guess) {
	//console.log("array: " + array)
	if (array.indexOf(guess) > -1) {
		return true
	}else{
		return false
	}
};

var stringToArray = function(string) {
	array = []
	for (char in string) {
		if (char == " "){
			array.push('\xa0')
		}
		else{ array.push(string[char]) }
	}
	return array
};

var replaceInArray = function(array, guess, puzzleSolution) {
	for (i in puzzleSolution) {
		if (guess == puzzleSolution[i]) {
			array[i] = guess;
		}else{
			continue
		}
	}return array
};

var arrayToString = function(array) {
	var string = ""
	for (i in array) {
		string += array[i];
	}
	return string
};

// Creates a list of all guesses that are also not in the solution for keep track of misses
var usedLettersNotInSolution = function(guesses, workingPuzzle){
	for (var i = 0; i < guesses.length; i++){
		if (workingPuzzle.indexOf(guesses[i]) == -1 && guessesNotInSolution.indexOf(guesses[i]) == -1){
				guessesNotInSolution.pop(guesses[i])
		};
	};
	//console.log("Not in solution: " + guessesNotInSolution)
};

// Removes letters guessed but not in the solution from the display of remaining letters
var blackOutLetters = function(){
	for (var i = 0; i < guessesNotInSolution.length; i++){
		// console.log("I'm looping through the array at: " + i)
		if (guesses.indexOf(guessesNotInSolution[i]) > -1 ){
				// console.log("Getting rid of: " + guessesNotInSolution[i])
				//guessesNotInSolution[i] = "\xa0" // replace the letter with a space if it has been guessed
				guessesNotInSolution[i] = "\xa0"
		}; 
		// console.log("Not in solution: " + guessesNotInSolution)
	}
};

// Chooses a puzzle from the list of puzzles a random

// var getPuz = function (puzzles) {
// 	var puzzle = Math.floor((Math.random() * puzzles.length));
// 	return puzzles[puzzle]
// };


// Creates a blank puzzle with the solution generated by getWord
var getBlanks = function(phrase) {
	var blanks = ""
	for (letter in phrase) {
		//console.log(letter)
		if (phrase[letter] == ' ') {
			//console.log(letter)
			blanks += '\xa0'
			//console.log("BLANK SPACE")
		}else if (phrase[letter] == '.'){
			blanks +=".";
		}else if (phrase[letter] == ',') {
			blanks += ',';
		}else if (phrase[letter] == "'") {
			blanks += "'";
		}else {
			blanks += "_";
		}
	}
	return stringToArray(blanks) // convert the string into an array for easy comparison
};

// Check if a player's guess is valid
var guessValid = function (guess, playerGuesses) {
	
	var regex=/[^a-zA-Z]+$/;
	//console.log("Player Guesses at validation: " + playerGuesses)	


	if (guess == null) {
			("You must input a letter.");
		return false

	}else if (guess.match(regex)) {

		displayPuzzle("Guess must be a letter")
		window.setTimeout(displayPuzzle, 1200)
		return false

	} else if (guess.length > 1) {

		displayPuzzle("Only guess one letter at a time")
		window.setTimeout(displayPuzzle, 1200)
		return false

	} else if (playerGuesses.indexOf(guess) > -1) {

		displayPuzzle(alreadyGuessed)
		window.setTimeout(displayPuzzle, 1200)
		
		return false

	}else if (guess.length < 1) {
		displayPuzzle("You must input a letter")
		window.setTimeout(displayPuzzle, 1200)
		return false

	}else{
		return true
	}
};


// Check if the player's guess is in the puzzle
var guessCheck = function (guess, guesses, incorrectGuesses, workingPuzzle, solution) {

	if (checkArray(solution, guess) == true) {

		workingPuzzle = replaceInArray(workingPuzzle, guess, solution)
		//console.log("In the puzzle and adding " + guess + " to guesses")
		guesses.push(guess);


	}else if (checkArray(solution, guess) == false){
		//console.log("NOT in the puzzle and adding " + guess + " to guesses")
		guesses.push(guess);
		incorrectGuesses.push(guess);

		// Remove images for misses
		if (incorrectGuesses.length == 1) {
			removeMissImage(missesDivOne);

		}else if (incorrectGuesses.length == 2 ) {
		
			removeMissImage(missesDivSix);

		}else if (incorrectGuesses.length == 3) {

			removeMissImage(missesDivTwo);

		}else if (incorrectGuesses.length == 4) {

			removeMissImage(missesDivFive);

		}else if (incorrectGuesses.length == 5) {

			removeMissImage(missesDivThree);}

		else if (incorrectGuesses.length == 6) {

			removeMissImage(missesDivFour);}

		
		// get miss sound from list of miss sounds and play it
		missSound = randomMissSound()
		missSound.play()
		

	}else{
		// console.log("guess is invalid")
	}

	displayPuzzle();	
	return [workingPuzzle, guesses, incorrectGuesses]	
};


// Figure out if the game should end
winCheck = function(workingPuzzle, incorrectGuesses, puzzleSolution) {
	// console.log("working puzzle, puzzle solution: " + workingPuzzle + " "
	// + solution)		
	//console.log(workingPuzzle.localeCompare(puzzleSolution))
	// console.log("Working array: " + stringToArray(workingPuzzle))
	// console.log("solution array: " + stringToArray(puzzleSolution))

	if (workingPuzzle.indexOf('_') == -1) {
		displayPuzzle();
		gameOver = true;
		wins += 1; // update the win counter
		// play sound byte of puzzle after 2 seconds
		window.setTimeout(phraseSound, 600)

		// load modal
		loadModalImage()
		window.setTimeout(displayModal, 500)



	}else if (incorrectGuesses.length == 6) {
		
		gameOver = true;
		losses += 1;
		console.log("You lose")
		displayPuzzle("LoL. Noob.")

		window.setTimeout(playLoseSound, 1350)

	}else if (incorrectGuesses.length > 6){

	}else {
		gameOver = false;
	}
	return gameOver
}	





// Handle Key Presses -----------------------------------------------------------
keyPress = function(event){

	if (keyPressed)
        return;

    else{
	    keyPressed = true;
	    setTimeout(function () { keyPressed = false; }, 120); //Mange keypress input

		if (incorrectGuesses.length >= 6 || workingPuzzle.indexOf('_') == -1) {return false}

		else{

			// accept input
			guess = String.fromCharCode(event.keyCode).toLowerCase()
			console.log("Guess: " + guess)
			
			if(guessValid(guess, guesses)) {
				// update guess variables based on guess
				returnArray = guessCheck(guess, guesses, incorrectGuesses, 
				workingPuzzle, solution);

				//window.setTimeout(displayPuzzle, 2000); //display puzzle before changing workingPuzzle variable

				workingPuzzle = returnArray[0];
				guesses = returnArray[1];
				incorrectGuesses = returnArray[2];
				// remove used letters from the list of letters
				blackOutLetters();
				displayPuzzle();
			}
		
		
		// checking if the puzzle has been solved
			
			if (winCheck(workingPuzzle, incorrectGuesses, solution)) {
				//window.setTimeout(displayPuzzle, 4000)
				
				// add 1 to puzzle index so that next puzzle in sequence is chosen
				puzzleIndex += 1; 
				
				// start the next puzzle after 4.5 seconds
				window.setTimeout(nextPuzzle, 4500) 
			}
		}
	}
}



// Event Handler

window.onload = function() {
	matchBegin = document.getElementById("match-begin");
	var introVideo = document.getElementById("intro-video")
	loadIntroModalImage()
	displayIntroModal();
	welcome.play()
}
window.addEventListener("keyup", keyPress.bind(event));