'use strict';

var postcss = require('postcss');

module.exports = postcss.plugin('postcss-position', function () {
  return function (css) {

    // build our plugin handler
    var ruleHandler = function(decl) {

      // define declarations and values
      var type = decl.prop,
          inputVals = [],
          outputVals = [],
          pos = ['top', 'right', 'bottom', 'left'];

      // put the values into an array
      inputVals = decl.value.split(' ');
      outputVals = inputVals.slice();

      // transform input values into correct 4 outputs
      outputVals[1] = inputVals[1] || inputVals[0];
      outputVals[2] = inputVals[2] || inputVals[0];
      outputVals[3] = inputVals[3] || inputVals[1] || inputVals[0];

      // create the position-type declaration
      decl.cloneBefore({ prop: 'position', value: type });

      // and each position offset
      for ( var i = 0, k = pos.length; i < k; i++) {
          decl.cloneBefore({ prop: pos[i], value: outputVals[i] });
      }

      // remove our custom declaration
      decl.removeSelf();

    };

    // loop through 'relative', 'absolute' and 'fixed' custom properties
    css.eachDecl(/^(relative|absolute|fixed)$/, ruleHandler);

  };
});
