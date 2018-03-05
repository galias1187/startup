"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

//Requested social object with methos share and like.
var Social = {
  share: function share(friendName) {
    console.log(friendName + " share " + this.name);
  },
  like: function like(friendName) {
    console.log(friendName + " likes " + this.name);
  }
};

var socialModule = {
  social: Social
};

exports.default = socialModule;