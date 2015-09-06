'use strict';

var postcss = require('postcss');

/**
 * Takes position declaration and expands it
 * @param  {Object} decl CSS declaration to handle
 * @return undefined
 */
var declExpander = function(decl) {

  var inputVals,
      outputVals,
      position,
      offsets;

  offsets = ['top', 'right', 'bottom', 'left'];

  // Throw decl values into an array
  inputVals = decl.value.split(' ');

  // If there are no additional values on position, exit
  if (inputVals.length === 1) {
    return;
  }

  // Strip position from vals and store for safe keeping
  position = inputVals.splice(0, 1).toString();
  outputVals = inputVals.slice();

  // Transform input values into correct 4 outputs
  outputVals[1] = inputVals[1] || inputVals[0];
  outputVals[2] = inputVals[2] || inputVals[0];
  outputVals[3] = inputVals[3] || inputVals[1] || inputVals[0];

  // Create the position-type declaration
  decl.cloneBefore({ prop: 'position', value: position });

  // And each position offset
  offsets.forEach(function(offset, i){
    decl.cloneBefore({prop: offset, value: outputVals[i] });
  });

  decl.remove();

};

module.exports = postcss.plugin('postcss-position', function () {
  return function(css, result) {

    css.walkDecls(function(decl){

      if (decl.prop === 'position') {
        declExpander(decl);
      }

      if (decl.prop.match(/^(relative|absolute|fixed)$/)) {
        result.warn('This syntax is no longer supported, use position: type [offsets]; instead', { node: decl });
      }

    });

  };
});
