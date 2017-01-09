'use strict';

const fs = require('fs');
const R = require('ramda');

// parse and solve functions from our chosen solver
const {parse, solve} = require('./regex-solver');

// input from external file
const input = fs.readFileSync('easy.txt', {encoding: 'utf-8'});

// simple trace to see what's going on
const trace = R.curry((msg, val) => console.log(`${msg}:\n${val}\n`));

// solver composes parse and solve to generate a solution
const solver = (parse, solve) => R.pipe(
    R.tap(trace('Raw input')),
    parse,
    R.tap(trace('Parsed')),
    solve,
    R.tap(trace('Solution'))
);

// and go
solver(parse, solve)(input);
