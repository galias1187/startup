"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    //Callbacks are mapped to an event name so a map is the best option.
    this._eventList = new Map();
  }

  _createClass(EventEmitter, [{
    key: "on",
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
    key: "emit",
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
    key: "off",
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
    key: "eventList",
    get: function get() {
      return this._eventList;
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;