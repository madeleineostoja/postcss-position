'use strict';

var postcss = require('postcss');

/**
 * Takes position declaration and expands it
 * @param  {Object} decl CSS declaration to handle
 * @return undefined
 */
var declExpander = function(decl) {

  var offsets = ['top', 'right', 'bottom', 'left'],
      outputVals = offsets.map(function(){
        return 0;
      }),
      inputVals = [],
      position;

  // Throw decl values into an array
  var re = /(([\+\-]?[0-9\.]+)(%|px|pt|em|in|cm|mm|ex|pc|vw)?)|(calc\(([^\)]+)\)|null|false|undefined|auto)/g,
    m = void 0;

  while ((m = re.exec(decl.value)) !== null) {
    if (m.index === re.lastIndex) {
      re.lastIndex++;
    }

   inputVals.push(m[0]);
  }

  // If there are no additional values on position, exit
  if (inputVals.length === 0) {
    return;
  }

  // Strip position from vals and store for safe keeping
  position = decl.value.match(/^static|absolute|fixed|relative|initial|inherit/).toString();

  // Transform input values into correct 4 outputs
  outputVals = (function(ins) {
    switch (ins.length) {
        case 1:
        return outputVals.map(function() {
          return ins[0];
        });
        case 2:
        return outputVals.map(function(v, k) {
          return ins[(k + 1) % 2 ? 0 : 1];
        });
        case 3:
        return outputVals.map(function(v, k) {
          return ins[k === 3 ? 1 : k];
        });
        case 4:
        return outputVals.map(function(v, k) {
          return ins[k];
        });
        default:
        return [];
    }
  })(inputVals);

  if (outputVals.length === 0) {
     outputVals = offsets.map(function() {
        return 0;
     });
  }

  // Create the position-type declaration
  decl.cloneBefore({ prop: 'position', value: position });

  // And each position offset
  offsets.forEach(function(offset, i){
    if (!/null|false|undefined/i.test(outputVals[i])) {
      decl.cloneBefore({prop: offset, value: outputVals[i] });
    }
  });

  decl.remove();

};

module.exports = postcss.plugin('postcss-position', function () {
  return function(css, result) {

    css.walkDecls(function(decl){

      if (decl.prop === 'position') {
        declExpander(decl);
      }

      if (decl.prop.match(/^(static|absolute|fixed|relative|initial|inherit)$/)) {
        result.warn('This syntax is no longer supported, use position: type [offsets]; instead', { node: decl });
      }

    });

  };
});
