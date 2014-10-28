/**
 * constructor for conway's life game
 */
module.exports.Constructor = function () {

  var MAX_COORD = 10000; // constant used in hash funciton 

  this.living = []; // list of living cells.
  this.hashLiving = []; // list of same cells but indexed by hash(row,col)

  var Cell = function(x,y) {
    this.row = x;
    this.col = y;
  };

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
   * post: the cell has been added to the configuration. 
   * uses: the array living
   * 
   * @param  {[int]} row
   * @param  {[int]} col
   */
  this.insert = function(row,col) {
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


//   int Life::neighbour_count(int row, int col) {
    

//     /* Pre: the life object contains aconfiguration and the coordinates row and col
//      define a cell living inside its hedge
//       Post: The number of living neighbours of the spcified cell is returned */
//     int i,j;
//     int count = 0;
//     for (i = row-1; i <= row + 1; i++) {
//         for (j = col-1; j <= col + 1; j++) {
//             count += grid[i][j]; // increase the count if neighbour is alive
//         }
//     }
//     count -= grid[row][col]; // do not count yourself
//     return count;
// }

  this.initialise = function() {
    this.insert(0,0);this.insert(0,1);this.insert(0,2);
    this.insert(1,0);this.insert(1,1);this.insert(1,2);
    this.insert(2,0);this.insert(2,1);this.insert(2,2);
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
    for(row = 0; row < 10; row++) {
      for(col = 0; col < 10; col++) {

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

      oldCell = this.living[i]; // obtain living cell here we're just usiing an index

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