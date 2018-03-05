"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actor = function Actor(name, age) {
  _classCallCheck(this, Actor);

  this.name = name;
  this.age = age;
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, [{
    key: "log",
    value: function log(info) {
      console.log("Log --> The " + info + " event has been emitted...");
    }
  }]);

  return Logger;
}();

var loggerModule = {
  logger: Logger
};
"use strict";

//Adds mixins objects properties to a base object extending its properties
function mixinExtendClass(base) {
  for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    mixins[_key - 1] = arguments[_key];
  }

  //Merges base object with the mixins
  Object.assign.apply(Object, [base].concat(mixins));
}

var mixinModule = {
  mixinFunction: mixinExtendClass
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    //Callbacks are mapped to an event name so a map is the best option.
    this._eventList = new Map();
  }

  _createClass(EventEmitter, [{
    key: 'on',
    value: function on(eventName, callback) {

      if (this.eventList.has(eventName)) {

        //If callback is already registered for the event, no addition is done.
        if (this.eventList.get(eventName).has(callback)) {
          return false;
        }

        //A new callback is added to the event's callback set.
        this.eventList.get(eventName).add(callback);
      } else {

        //A new set is created with the new callback and attached to the eventList.
        var set = new Set();
        set.add(callback);
        this._eventList.set(eventName, set);
      }
      return true;
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {

      //Just iterates through the current event name's array and call the callbacks
      if (this.eventList.has(eventName)) {

        //All callbacks stored for the target event are invoked.
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.eventList.get(eventName)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var callback = _step.value;

            callback(this);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }

    /*FIXME? This method is confusing, it might be better to have only one callback
    per eventName, but this is telling us that we have more than one.
    The only way I founded to compare callbacks is to compare their toString
    method.*/
    /*After asking I was told it was only one callback, so having only event's
    name will do the job to clear an event listening. */
    /*After doing exercise 03 it had more sense that it could be posible to have
    more than one listener for each event name, so method will be resetted to
    pre commit 23 state. */

  }, {
    key: 'off',
    value: function off(eventName, callback) {
      if (this.eventList.has(eventName)) {
        var listenerList = this.eventList.get(eventName);
        listenerList.delete(callback);

        //If callback was not passed as a function, it would become undeletable...
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = listenerList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var listener = _step2.value;

            if (listener.toString() === callback.toString()) {
              listenerList.delete(listener);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }, {
    key: 'eventList',
    get: function get() {
      return this._eventList;
    }
  }]);

  return EventEmitter;
}();

//Movie class declaration


var Movie = function (_EventEmitter) {
  _inherits(Movie, _EventEmitter);

  function Movie(name, year, duration) {
    _classCallCheck(this, Movie);

    var _this = _possibleConstructorReturn(this, (Movie.__proto__ || Object.getPrototypeOf(Movie)).call(this));

    _this._name = name;
    _this._year = year;
    _this._duration = duration;

    _this._status = new UnstartedMovie(_this);

    _this._cast = new Set();

    return _this;
  }

  //Getters


  _createClass(Movie, [{
    key: 'play',


    //Plays the movie (Fake!)
    value: function play() {
      this.status.play();
    }

    //Pauses movie playing

  }, {
    key: 'pause',
    value: function pause() {
      this.status.pause();
    }

    //Resumes playing when paused

  }, {
    key: 'resume',
    value: function resume() {
      this.status.resume();
    }
  }, {
    key: 'addCast',
    value: function addCast(cast) {
      var _this2 = this;

      if (!Array.isArray(cast)) {
        cast = [cast];
      }
      cast.forEach(function (actor) {
        if (!_this2.cast.has(actor) && actor) {
          _this2.cast.add(actor);
        }
      });
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'year',
    get: function get() {
      return this._year;
    },


    //Setters
    set: function set(year) {
      this._year = year;
    }
  }, {
    key: 'duration',
    get: function get() {
      return this._duration;
    },
    set: function set(duration) {
      if (duration < 1) {
        throw new Error("duration value not valid...");
      }

      this._duration = duration;
      this._status.endingTime = duration;
    }
  }, {
    key: 'status',
    get: function get() {
      return this._status;
    },
    set: function set(status) {
      this._status = status;
    }
  }, {
    key: 'cast',
    get: function get() {
      return this._cast;
    }
  }]);

  return Movie;
}(EventEmitter);

/*A state like pattern will be used to modelate how movies behave.
JS does not have interface like Java but this will be only declarated as
a template*/


var MovieStatus = function () {

  //Movie object must be passed as a param in order to be used.
  function MovieStatus(movie, playTime) {
    var endingTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var timer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    _classCallCheck(this, MovieStatus);

    this._movie = movie;
    this._playTime = playTime;
    this._endingTime = endingTime;
    this._timer = timer;
  }

  //Getters


  _createClass(MovieStatus, [{
    key: 'play',
    value: function play() {}
  }, {
    key: 'pause',
    value: function pause() {}
  }, {
    key: 'resume',
    value: function resume() {}
  }, {
    key: 'movie',
    get: function get() {
      return this._movie;
    },


    //Setters
    set: function set(movie) {
      this._movie = movie;
    }
  }, {
    key: 'playTime',
    get: function get() {
      return this._playTime;
    },
    set: function set(playTime) {
      this._playTime = playTime;
    }
  }, {
    key: 'endingTime',
    get: function get() {
      return this._endingTime;
    },
    set: function set(duration) {
      if (this._playTime) {
        this._endingTime = new Date(this._playTime.getTime());
        this._endingTime.setTime(this._playTime.getTime());

        this._endingTime.setHours(0);
        this._endingTime.setMinutes(0);
        this._endingTime.setSeconds(0);

        this._endingTime.setTime(this._endingTime.getTime() + duration * 1000);
      }
    }
  }, {
    key: 'timer',
    get: function get() {
      return this._timer;
    },
    set: function set(timer) {
      this._timer = timer;
    }
  }]);

  return MovieStatus;
}();

//Unstarted modelates behaviour when the movies hasn't started playing


var UnstartedMovie = function (_MovieStatus) {
  _inherits(UnstartedMovie, _MovieStatus);

  function UnstartedMovie(movie) {
    _classCallCheck(this, UnstartedMovie);

    //Inits play time to 00:00:00
    var _this3 = _possibleConstructorReturn(this, (UnstartedMovie.__proto__ || Object.getPrototypeOf(UnstartedMovie)).call(this, movie, new Date()));

    _this3.playTime.setHours(0);
    _this3.playTime.setMinutes(0);
    _this3.playTime.setSeconds(0);

    //Inits ending time to 00:00:00 + movie duration
    _this3.endingTime = new Date(_this3.playTime.getTime());
    _this3.endingTime.setTime(_this3.playTime.getTime() + _this3.movie.duration * 1000);
    return _this3;
  }

  //Starts playing the movie.


  _createClass(UnstartedMovie, [{
    key: 'play',
    value: function play() {
      var _this4 = this;

      //Playing started message.
      this.movie.emit('play');

      //Playing interval is started.
      this.timer = setInterval(function (movie) {

        //Comment if you don't want to see playing status per second.
        movie.emit('playTick');

        //Increments current playing time
        movie.status.playTime.setTime(movie.status.playTime.getTime() + 1000);

        //If movie duration is met, interval is cleared.
        if (movie.status.endingTime.getTime() <= movie.status.playTime.getTime() - 1000) {
          clearInterval(movie.status.timer);
          movie.status = new UnstartedMovie(_this4.movie);

          //Playing finished message.
          movie.emit('finish');
        }
      }, 1000, this.movie);

      //Movie has started playing, the state changes now so current status changes
      this.movie.status = new PlayingMovie(this.movie, this.playTime, this.endingTime, this.timer);
    }
  }, {
    key: 'pause',
    value: function pause() {
      //Pause does nothing on this state...
    }
  }, {
    key: 'resume',
    value: function resume() {
      //resume also does nothing on this state...
    }
  }]);

  return UnstartedMovie;
}(MovieStatus);

//Playing movie modeletas how a movie behaves when it is playing.


var PlayingMovie = function (_MovieStatus2) {
  _inherits(PlayingMovie, _MovieStatus2);

  function PlayingMovie(movie, playTime, endingTime, timer) {
    _classCallCheck(this, PlayingMovie);

    return _possibleConstructorReturn(this, (PlayingMovie.__proto__ || Object.getPrototypeOf(PlayingMovie)).call(this, movie, playTime, endingTime, timer));
  }

  _createClass(PlayingMovie, [{
    key: 'play',
    value: function play() {
      /*Play does nothing on this state (it could be discussed if it should
      restart the movie, but this is a design matter */
    }
  }, {
    key: 'pause',
    value: function pause() {

      //Now movie must be paused
      clearInterval(this.timer);

      //Playing has been paused
      this.movie.emit('pause');

      //Status changes to paused so...
      this.movie.status = new PausedMovie(this.movie, this.playTime, this.endingTime, this.timer);
    }
  }, {
    key: 'resume',
    value: function resume() {
      //Resume does nothing on this state
    }
  }]);

  return PlayingMovie;
}(MovieStatus);

//Paused modelates how the movie beheaves when it is not playing.


var PausedMovie = function (_MovieStatus3) {
  _inherits(PausedMovie, _MovieStatus3);

  function PausedMovie(movie, playTime, endingTime, timer) {
    _classCallCheck(this, PausedMovie);

    return _possibleConstructorReturn(this, (PausedMovie.__proto__ || Object.getPrototypeOf(PausedMovie)).call(this, movie, playTime, endingTime, timer));
  }

  _createClass(PausedMovie, [{
    key: 'play',
    value: function play() {
      //Again play does nothing (or should start from the beginning? --> design!)
    }
  }, {
    key: 'pause',
    value: function pause() {
      //Pause does nothing
    }
  }, {
    key: 'resume',
    value: function resume() {
      var _this7 = this;

      //Movie playing has resumed
      this.movie.emit('resume');

      //Playing interval is restarted.
      this.timer = setInterval(function (movie) {

        //Comment if you don't want to see playing status per second.
        movie.emit('playTick');

        //Increments current playing time
        movie.status.playTime.setTime(movie.status.playTime.getTime() + 1000);

        //If movie duration is met, interval is cleared.
        if (movie.status.endingTime.getTime() <= movie.status.playTime.getTime() - 1000) {
          clearInterval(movie.status.timer);
          movie.status = new UnstartedMovie(_this7.movie);

          //Playing finished message.
          movie.emit('finish');
        }
      }, 1000, this.movie);

      //Movie has started playing again, the state changes...
      this.movie.status = new PlayingMovie(this.movie, this.playTime, this.endingTime, this.timer);
    }
  }]);

  return PausedMovie;
}(MovieStatus);
"use strict";

//Requested social object with methos share and like.
var Social = {
  share: function share(friendName) {
    console.log(friendName + " share " + this.name);
  },
  like: function like(friendName) {
    console.log(friendName + " likes " + this.name);
  }
};
