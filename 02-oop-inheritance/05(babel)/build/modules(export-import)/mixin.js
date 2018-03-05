"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = mixinModule;