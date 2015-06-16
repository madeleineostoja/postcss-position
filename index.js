'use strict';

var postcss = require('postcss');

module.exports = postcss.plugin('postcss-position', function () {
  return function (css) {

    // build our plugin handler
    var ruleHandler = function(decl) {

      // define declarations and values
      var type = decl.prop,
          vals = [],
          pos = ['top', 'right', 'bottom', 'left'],
          types = ['relative', 'absolute', 'fixed'];

      // only process our custom declarations
      if(types.indexOf(type) === -1) {
        return false;
      }

      // put the values into an array
      vals = decl.value.split(' ');

      // if only two values decalred, assign them to top|bottom right|left
      if ( vals.length === 2 ) {
          vals[2] = vals[0];
          vals[3] = vals[1];
      }

      // create the position-type declaration
      decl.cloneBefore({ prop: 'position', value: type });

      // and each position offset
      for ( var i = 0, k = pos.length; i < k; i++) {
          decl.cloneBefore({ prop: pos[i], value: vals[i] });
      }

      // remove our custom declaration
      decl.removeSelf();

    };

    // loop through each css rule and declaration, and run our plugin through them
    css.eachRule(function(rule) {
      rule.each(ruleHandler);
    });

  };
});
