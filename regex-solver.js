'use strict';

const fs = require('fs');
const R = require('ramda');

// composable version of String.replace()
const replace = R.curry((patt, repl, s) => s.replace(patt, repl));

// convert an extended PCRE to JS RegExp
const pcreToRegexp = R.pipe(
    // remove internal newlines, since JS RegExp doesn't support the x flag
    replace(/\n/g, ''),

    // convert from \A anchor to ^ with optional leading whitespace
    replace(/\\A/, '^\\s*'),

    // convert from \Z anchor to $ with optional trailing whitespace
    replace(/\\s\+\\Z/, '\\s*$'),

    // instantiate the RegExp
    x => new RegExp(x)
);

const regexpFromFile = R.pipe(
    // readFileSync returns Buffer unless encoding in options object
    R.partialRight(fs.readFileSync, [{encoding: 'utf-8'}]),
    pcreToRegexp
);

// keep a count of the number of times function is called,
// and pass the current count as the first argument.
// This uses full function declaration so arguments is set.
const countCalls = (f, counter = 1) => function() {
    return f.call(null, counter++, ...arguments);
};

// generate the output solution format based on the input format.
// e.g. 2 3\n0 4\n -> $1 $2\n$3 $4\n
const solutionFormat = replace(/\d+/g, countCalls(c => `\$${c}`));

// parse function returns a two-element list (tuple):
// the solution format and the input for the solver.
// These are conveniently in proper order for the replace() function.
const parse = R.converge(
    R.unapply(R.identity),  // *... -> [*]
    [
        solutionFormat,
        R.pipe(
            replace(/0/g, '123456789'),
            replace(/\b\d\b/g, '$&        ')
        ),
    ]
);

// solve function applies the solution format and input to the replace function,
// i.e. replace(patt, input, output) where patt is the big honkin' RegExp,
// input is the parsed puzzle, and output is the result of solutionFormat.
const solve = R.apply(replace(regexpFromFile('regex.txt')));

module.exports = {parse, solve};
