# sudoku-fp

A simple Sudoku solver to play with functional programming.

This currently uses the regex solver from
https://github.com/agriffis/sudoku-pcre but the supporting code is composable
functions, especially using [Ramda](http://ramdajs.com/).
Hoping to write an algorithmic functional solver next to replace the regex.

Install deps with:

```
yarn
```

then run the solver with:

```
node ./index.js
```

## Author

Written by Aron Griffis <aron@scampersand.com> in 2017, and
[released into the public domain](./LICENSE).
