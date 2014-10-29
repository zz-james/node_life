/**
 * constructor for conway's life game
 */
module.exports.Constructor = function () {

  var MAX_COORD = 10000; // constant used in hash funciton 

  this.living = []; // list of living cells.
  this.hashLiving = []; // list of same cells but indexed by hash(row,col)

  /**
   * constructor function for cell type
   * @param {[int]} col [column]
   * @param {[int]} row [row]
   */
  var Cell = function(row,col) {
    this.col = col;
    this.row = row;
  };

  /**
   * these 2 functions are for inseting and retrieving cells using row,col
   * as key. this maps to the same set of cells as living but living
   * just has regular sequence index for fast traversal in the update function
   */
  this.hashLiving.insert = function(cell) {
    var index = MAX_COORD * cell.row + cell.col;
    this[index] = cell;
  };

  this.hashLiving.retrieve = function(row,col) {
    var index = MAX_COORD * row + col;
    return this[index];
  };

  /**
   * pre : the cell with coordinates row and col does not belong to the life configuration
   * post: the cell has been added to the configuration both index useing sequence and (row,col) key
   * uses: the array living and the hashArray
   * 
   * @param  {[int]} row
   * @param  {[int]} col
   */
  this.insert = function(row,col) {
    if(row < 0 || col < 0) { return; } // don't store cells with nagative index - you can comment this out to see effect
    var newCell = new Cell(row,col);
    this.living.push(newCell);
    this.hashLiving.insert(newCell);  // this keeps the 2 lists in synch. one indexed for traversal, one indexed by hash(row,col)
  };

  /**
   * counts neighbours of a cell
   * @return {[int]} [number of living neighbours of the specified cell]
   */
  this.neighbourCount = function(row, col) {
    var i,j; // integer row col placeholders
    var count = 0; // integer counter
    for(i = row-1; i <= row+1; i++) {
      for(j = col-1; j <= col+1; j++) {
        // double !! cast to bool
        count += !!this.hashLiving.retrieve(i,j); // increase the count if neighbour alive
      }
    }
    count -= !!this.hashLiving.retrieve(row,col); // don't count centre, not a neighbour
    return count;

  };

  /**
   * allows a config to be entered
   * @return {[void]} [
   */
  this.initialise = function() {
    // row,col !
    this.insert(23,23);this.insert(23,24);this.insert(23,25);
    this.insert(24,23);this.insert(24,24);this.insert(24,25);
    this.insert(25,23);this.insert(25,23);this.insert(25,25);
  };

  /**
   * post: a central window onto the life object is displayed
   * uses: the auxilliary function life::retrieve
   * @return {[void]}
   */
  this.print = function() {
    var row, col;
    var output = '';
    console.log("The current Life configuration is:");
    for(row = 0; row < 50; row++) {
      for(col = 0; col < 50; col++) {

        if(this.hashLiving.retrieve(row,col)) {
          output += this.neighbourCount(row,col);
        } else {
          output +='-';
        }

      } // end col loop
      output += '\n';
    } //end row loop
    console.log(output);
    console.log('\n');
  };

  /**
   * update function
   * post: the life object contains the next generation of configuration ??
   * uses: the living and the isLiving array (as hash)
   * @return {[type]}
   */
  this.update = function() {
    var newConfig = new this.constructor();  // make another instance of this object

  	var oldCell, // this will hold the living cell we get from the living list
        row_offset, col_offset; // these loop counters

    for(var i = 0; i < this.living.length; i++) {

      oldCell = this.living[i]; // obtain living cell here we're just using an index

      for(row_offset = -1; row_offset < 2; row_offset++) {
        for(col_offset = -1; col_offset < 2; col_offset++) {

          var new_row = oldCell.row + row_offset;
          var new_col = oldCell.col + col_offset;

          // new_row_address and new_col_address is now a living cell or neighbour of a living cell

          if(!newConfig.hashLiving.retrieve(new_row,new_col))   // if we haven't already done this cell....
          {
              switch(this.neighbourCount(new_row,new_col))
              {

                case 3:   // cell becomes alive
                  newConfig.insert(new_row,new_col);
                break;

                case 2:   // cell keeps same status
                  if (this.hashLiving.retrieve(new_row,new_col)) 
                  {
                    newConfig.insert(new_row,new_col);  
                  }
                break;

                default:
                  // noop
                break;
              }
          }

        } // end column loop
      } // end row loop

    } // end itteration of living cells loop

    // exchange
    this.living = newConfig.living;
    this.hashLiving = newConfig.hashLiving;

  };

};