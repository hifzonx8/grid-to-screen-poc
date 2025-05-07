// my thinking cap
// suppose:
// 128*128px screen
// transform into 64*64 grid
// fullscreen grid with no padding no nothing

// 128/64 = 2
// each grid got 2*2px
// each member of grid hold its top left and bottom right of its own screen coordinate

// row 1 col 1: (1,1) & (2,2)
// row 2 col 1: (1,3) & (2,4)
// row 3 col 1: (1,5) & (2,6)

// row 1 col 2: (3,1) & (4,2)
// row 2 col 2: (3,3) & (4,4)
// row 3 col 2: (3,5) & (4,6)

// func an = a1 + (n - 1) * d
// where:
// an is for determining row and column position
// a1 (screen_index) will be 1 considering we're working with lua, if retrogadget screen index start at pixel 0, use 0
// n is column or row index
// d is the value from screen size / grid length (in this case 128/64)
// to rewrite:
// row or col to screen coord = screen_index + (n - 1) * (screen_size / grid_length)

// i think this model wouldnt work if width and height of the screen is not the same

// im taking a gamble that i hope will work
// for example row 2 col 3: (5,3) & (6,4)
// end point = (start point x + (d - 1), start point y) 

function n_to_screen_coordinate(n: number, screen_size = 128, grid_length = 64, start_index = 1) {
  return start_index + (n - 1) * (screen_size / grid_length)
}

function grid_to_screen_coord_range(row: number, column: number, screen_size = 128, grid_length = 64, start_index = 1) {
  const col_coord = n_to_screen_coordinate(column, screen_size, grid_length, start_index)
  const row_coord = n_to_screen_coordinate(row, screen_size, grid_length, start_index)
  const d = screen_size / grid_length
  return [
    {x: row_coord, y: col_coord},
    {x: row_coord + (d - 1), y: col_coord + (d - 1)}
  ]
}