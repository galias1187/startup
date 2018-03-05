'use strict';

var _movie = require('./movie.js');

var _movie2 = _interopRequireDefault(_movie);

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _mixin = require('./mixin.js');

var _mixin2 = _interopRequireDefault(_mixin);

var _social = require('./social.js');

var _social2 = _interopRequireDefault(_social);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Movie = _movie2.default.movie;
var Actor = _movie2.default.actor;
var EventEmitter = _movie2.default.eventEmitter;
var Logger = _logger2.default.logger;
var mixinExtendClass = _mixin2.default.mixinFunction;
var Social = _social2.default.social;

//** Insert testing code here (for node) **

let lordOfTheRings = new Movie("The lord of the rings", 2000, 15);

let log = new Logger();

lordOfTheRings.on('play', (movie) => {
log.log(`${movie.name} - play`);
});

lordOfTheRings.on('pause', (movie) => {
log.log(`${movie.name} - pause`);
});

lordOfTheRings.on('resume', (movie) => {
log.log(`${movie.name} - resume`);
});

lordOfTheRings.on('finish', (movie) => {
log.log(`${movie.name} - finish`);
});

lordOfTheRings.on('playTick', (movie) => {
log.log(`${movie.name} - playing(${movie.status.playTime.toTimeString().substring(0, 8)})`);
});

lordOfTheRings.play();
