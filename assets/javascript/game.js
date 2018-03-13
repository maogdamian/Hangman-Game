
// Hangman Game

var game = {
	// Game Variables
	availableWords: ["doomfist", "genji", "mccree", "pharah", "reaper", "soldier76", "sombra", 
		"tracer", "bastion", "hanzo", "junkrat", "mei", "torbjorn", "widowmaker", "dva", "orisa", 
		"reinhardt", "roadhog", "winston", "zarya", "ana", "birgitte", "lucio", "mercy", "moira", "symmetra", "zenyatta"],
	currentWord: "",
	displayWord: [],
	availableLetters: [],
	guesses: 0,
	wins: 0,
	goodLetterGuess: 0,
	isGameOver: false,
	isShown: false,

	// Display Hooks
	wordDoc: {},
	guessDoc: {},
	winDoc: {},
	guessLtrDoc: {},
	warnDoc: {},

	//Game Functions

	startGame: function(currentWordDoc, currentguessDoc, winsDoc, guessLetterDoc, warningDoc){

		//Display Objects
		this.wordDoc = currentWordDoc;
		this.guessDoc = currentguessDoc;
		this.winDoc = winsDoc;
		this.guessLtrDoc = guessLetterDoc;
		this.warnDoc = warningDoc;

		//Game Values
		this.isGameOver = false;
		this.guesses = 10;
		this.availableLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
			'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 
			'x', 'y', 'z'],
			this.currentWord = this.availableWords[Math.floor(Math.random() * this.availableWords.length)];
			this.goodLetterGuess = 0;

		//Reset Game
		this.displayGame();
		this.wordDoc.textContext = "_";
		this.guessLtrDoc.textContext = "";
		this.displayWord = [];
			for(var i=0; i<this.currentWord.length; i++){
				if(this.currentWord.charAt(i).match(/[a-z]/i)){
					this.displayWord.push("_");
				} else {
					this.displayWord.push(" ");
				}
			}
			this.wordDoc.textContext = this.displayWord.join(" ");
			this.warnDoc.textContext = "";
		},

		//Display Game

		displayGame: function(){

			this.guessDoc.textContext = this.guesses;
			this.winDoc.textContext = this.wins;
		},

		//Game Logic

		checkGuess: function(userGuess){
			//Check if user selection is available
			if(this.availableLetters.indexOf(userGuess) > -1){
				this.warnDoc.textContext = "";

			//If selection is available, check against current word
			if(this.currentWord.includes(userGuess)){

					//if match is found
					for(var i=0; i<this.currentWord.length; i++){
						if(this.currentWord.charAt(i)===userGuess){
							this.displayWord[i] = userGuess;
							this.goodLetterGuess++;
							this.wordDoc.textContext = this.displayWord.join (" ");
							this.availableLetters = this.availableLetters.filter( a => a !== userGuess);
						}
					}
				}		

			//If user reaches full length of word: WINNING!
			if(this.goodLetterGuess === this.currentWord.length){
				this.wins++;
				this.isGameOver = true;
				this.wordDoc.textContext = this.displayWord.join(" ");
				this.warnDoc.textContext = "You Win!"
				}
			}
			//Check if user still has any guesses left
			else{
				if(this.guesses > 0){
					this.badGuess.play();
					this.availableLetters = this.availableLetters.filter( a=> a !== userGuess);
					this.guesses--;
					this.guessLtrDoc.textContext += userGuess + " ";
					}
				}
			//If user runs out of guesses, GAME OVER!
				else{
					this.warnDoc.textContext = "You Lost!"
					this.wins = 0;
					this.isGameOver = true;
					}
				}

			}
			//Check User Input
				else{
					if(userGuess.match(/^[a-z]+$/)){
						// Duplicate Entry
						this.warnDoc.textContext = "You've already guessed" + userGuess;
					} else{
						// Invalid Entry
						this.warnDoc.textContext = "That is not a valid key. Please try again.";
					}
				}
			}
		}
// Display Hooks from HTML

var currentWordDoc = document.querySelector("#currentWord");
var currentguessDoc = document.querySelector("#guesses");
var winsDoc = document.querySelector("#wins");
var guessLetterDoc = document.querySelector("#guessedLetters");
var warningDoc = document.querySelector("#warning");

//Start Game
game.startGame(currentWordDoc,currentguessDoc, winsDoc, guessLetterDoc, warningDoc);

//User Input Runs the Game Loop
document.onkeyup = function(e){
	//Check if Game Over
	if(Game.isGameOver === false){
		//Check for key pressed
		game.checkGuess(e.key);
		game.displayGame();
	} else{
		//Restart the Game
		game.startGame(currentWordDoc, currentguessDoc, winsDoc, guessLetterDoc, warningDoc);
		console.log("Restarted Game")
	}
}

