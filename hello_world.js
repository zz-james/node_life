// we should regard the grid for the game of life as a sparse grid
// therefore a hash table proves an attractive way to represent a grid
// fortunetly in javascript objects are hash tables.

// do includes
var Life = require('./life.js').Constructor;

// globals
var MAX_ROW = 10, MAX_COL = 20;

// -------------------------------------------------------- //
// set up the environment to do cin >> 
var keypress = require('keypress');
var tty 	 = require('tty');
keypress(process.stdin); // make 'process.stdin' begin emitting keypress events

if(typeof process.stdin.setRawMode == 'function') {
	process.stdin.setRawMode(true);
} else {
	tty.setRawMode(true);
}
// ------------------------------------------------------- //




/**
 * function to play conways game of life
 */
(function(Life) {
	// pre: the user supplies an initial configuration of living cells
	// post: the program prints a sequence of pictures showing the changes in the configuration
	// of living cells according to the rules for the game of life
	// uses: the object life and it's methods initialise(), print() and update()
	// the functions instructions() and user_says_yes()
	instructions();

	process.stdin.on('keypress',function(ch, key) {
		if(key && (key.name == 'y' || key.name == 'Y')) {
			loop();
		} else if(key && (key.name == 'n' || key.name == 'N')) {
			console.log('Bye!')
			process.exit();
		}
	});

	// inject error code into life
	var configuration = new Life();

	configuration.initialise();
	configuration.print();
	console.log("Continue viewing new generations? (y/n)");

	function loop() {
		configuration.update();
		configuration.print();
		console.log("Continue viewing new generations? (y/n)");
	}


})(Life)

function instructions() {
    /* Pre: None
     *Post: instructions for using the life program have been printed
     */
    console.log("Welcome to conway's game of life");
    console.log("this game uses a grid of size " + MAX_ROW + " by " + MAX_COL + " in which ");
    console.log("each cell can either be occupied by an organism or not.");
    console.log("The occupied cells change from generation to generation");
    console.log("according to the number of neighboring cells which are alive.");
}









